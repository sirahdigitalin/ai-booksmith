import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, age, theme, occasion, pageCount = 5 } = await req.json();
    const pages = Math.min(Math.max(Number(pageCount) || 5, 5), 30);

    if (!name || !age || !theme || !occasion) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, age, theme, occasion" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a creative children's story writer for The Printing House, a premium printing company. 
You create magical, personalized storybooks for children. Your stories are warm, imaginative, age-appropriate, and full of wonder.
Each story should have exactly ${pages} pages with vivid descriptions that would make beautiful illustrations.
Return ONLY valid JSON with no markdown formatting.`;

    const userPrompt = `Create a personalized ${theme} themed storybook for a ${age}-year-old child named ${name}. 
The occasion is: ${occasion}.

Return a JSON object with this exact structure:
{
  "title": "Story title including the child's name",
  "pages": [
    {
      "pageNumber": 1,
      "text": "Story text for this page (2-3 sentences, vivid and engaging)",
      "illustration": "A single emoji that represents this scene"
    }
  ]
}

Create exactly ${pages} pages. Make the story magical, personal, and age-appropriate. 
Include the child's name naturally throughout the story. 
End with a warm, happy conclusion tied to the occasion.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_story",
              description: "Create a personalized children's storybook",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "The story title" },
                  pages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        pageNumber: { type: "number" },
                        text: { type: "string" },
                        illustration: { type: "string" },
                      },
                      required: ["pageNumber", "text", "illustration"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["title", "pages"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_story" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate story");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      // Fallback: try parsing content directly
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        return new Response(JSON.stringify(parsed), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("No story generated");
    }

    const story = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(story), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-story error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
