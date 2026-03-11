import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Rocket, Crown, Trees, Gift, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import FlipbookPreview from "./FlipbookPreview";

const themes = [
  { id: "space", label: "Space Adventure", icon: Rocket, color: "border-secondary text-secondary bg-secondary/5" },
  { id: "fairy", label: "Fairy Tale", icon: Crown, color: "border-primary text-primary bg-primary/5" },
  { id: "jungle", label: "Jungle Explorer", icon: Trees, color: "border-green-600 text-green-600 bg-green-50" },
  { id: "birthday", label: "Birthday Special", icon: Gift, color: "border-accent text-accent bg-accent/5" },
  { id: "love", label: "Love Story", icon: Heart, color: "border-primary text-primary bg-primary/5" },
];

const occasions = ["Birthday", "Christmas", "Graduation", "Just Because", "Wedding", "Anniversary"];

export interface StoryPage {
  pageNumber: number;
  text: string;
  illustration: string;
}

const StoryCreator = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", age: "", theme: "", occasion: "" });
  const [generating, setGenerating] = useState(false);
  const [story, setStory] = useState<StoryPage[] | null>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const { toast } = useToast();

  const canNext =
    (step === 0 && form.name && form.age) ||
    (step === 1 && form.theme) ||
    (step === 2 && form.occasion);

  const generateStory = async () => {
    setGenerating(true);
    try {
      const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
      const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        // Demo fallback
        await new Promise((r) => setTimeout(r, 2000));
        const themeName = themes.find((t) => t.id === form.theme)?.label || form.theme;
        setStoryTitle(`${form.name}'s ${themeName}`);
        setStory([
          { pageNumber: 1, text: `Once upon a time, a brave child named ${form.name} discovered a magical portal in their backyard. The air shimmered with golden light, and an adventure was about to begin!`, illustration: "🌟" },
          { pageNumber: 2, text: `${form.name} stepped through the portal and found themselves in a ${themeName.toLowerCase()} world. Everything was more colorful and magical than they had ever imagined.`, illustration: "🎨" },
          { pageNumber: 3, text: `Along the way, ${form.name} met a friendly companion who said, "I've been waiting for someone brave like you! Will you help me on a quest?"`, illustration: "🤝" },
          { pageNumber: 4, text: `Together, they traveled through enchanted forests and sparkling rivers. ${form.name} felt braver with every step, knowing that kindness and courage could overcome anything.`, illustration: "🏔️" },
          { pageNumber: 5, text: `At the end of their journey, ${form.name} returned home with a heart full of memories and a smile that lit up the entire room. "That was the best ${form.occasion.toLowerCase()} adventure ever!" ${form.name} exclaimed.`, illustration: "🎉" },
        ]);
        setStep(3);
        return;
      }

      const resp = await fetch(`${supabaseUrl}/functions/v1/generate-story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify(form),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed to generate story" }));
        throw new Error(err.error || "Failed to generate story");
      }

      const data = await resp.json();
      setStoryTitle(data.title);
      setStory(data.pages);
      setStep(3);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  if (step === 3 && story) {
    return (
      <section id="create-your-book" className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <FlipbookPreview title={storyTitle} pages={story} characterName={form.name} />
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => { setStep(0); setStory(null); setStoryTitle(""); }}
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              Create Another Book
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="create-your-book" className="py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">Story Creator</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Create Your Book
          </h2>
          <p className="text-muted-foreground text-lg">Just 3 quick steps to your personalized story.</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-accent transition-all duration-300 ${
                  step >= s
                    ? "bg-gradient-crimson text-primary-foreground shadow-glow-red scale-110"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s + 1}
              </div>
              {s < 2 && (
                <div className={`w-16 h-1 rounded-full transition-colors duration-300 ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          layout
          className="bg-card rounded-2xl shadow-card p-8 border border-border/50"
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-6 text-foreground">Who is this book for?</h3>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="font-accent font-semibold">Child's Name</Label>
                    <Input id="name" placeholder="e.g. Rahaa" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-12" />
                  </div>
                  <div>
                    <Label htmlFor="age" className="font-accent font-semibold">Age</Label>
                    <Input id="age" type="number" placeholder="e.g. 5" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="mt-2 h-12" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-6 text-foreground">Pick a Theme</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm({ ...form, theme: t.id })}
                      className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 ${
                        form.theme === t.id
                          ? `${t.color} border-current scale-[1.03] shadow-card`
                          : "border-border hover:border-muted-foreground/30 hover:shadow-warm"
                      }`}
                    >
                      <t.icon size={32} className={form.theme === t.id ? "text-current" : "text-muted-foreground"} />
                      <span className="text-sm font-semibold font-accent text-foreground">{t.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-6 text-foreground">What's the Occasion?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {occasions.map((o) => (
                    <button
                      key={o}
                      onClick={() => setForm({ ...form, occasion: o })}
                      className={`p-4 rounded-xl border-2 text-sm font-semibold font-accent transition-all duration-300 ${
                        form.occasion === o
                          ? "border-primary bg-primary/8 text-primary scale-[1.03] shadow-card"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:shadow-warm"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-10">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="font-accent"
            >
              Back
            </Button>
            {step < 2 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
                className="bg-gradient-royal text-secondary-foreground font-semibold font-accent px-6"
              >
                Next →
              </Button>
            ) : (
              <Button
                disabled={!canNext || generating}
                onClick={generateStory}
                className="bg-gradient-crimson text-primary-foreground font-semibold font-accent px-6 shadow-glow-red hover:shadow-elevated transition-all"
              >
                {generating ? (
                  <><Loader2 size={16} className="mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles size={16} className="mr-2" /> Generate My Book</>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryCreator;
