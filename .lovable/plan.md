

## Plan: Hybrid Book System — Templates + AI Custom Stories

### Approach
Add a **template-based flow** alongside the existing AI generation. Users choose between curated story templates (like Diffrun) or a fully custom AI-generated story.

### Changes

#### 1. Create `src/data/bookTemplates.ts`
Define 8-10 curated story templates with:
- `id`, `title`, `coverImage`, `description`, `ageRange`, `tags` (Adventure, Inspiration, etc.), `pageCount`, `theme`
- `storyTemplate`: array of page objects with text containing `{name}` and `{age}` placeholders
- These are pre-written stories where the child's name/details get substituted in — no AI call needed

#### 2. Redesign `BookTypes.tsx` → Template Gallery
Transform the current basic book grid into a Diffrun-style template gallery:
- Show templates as rich cards with cover images, age range badges, tag chips, page count
- Hover reveals description and "Personalize" CTA
- Add a special **"Create Custom Story"** card with an AI sparkle icon that routes to the fully dynamic AI flow
- Clicking a template card → sets the template ID and scrolls to StoryCreator

#### 3. Update `StoryCreator.tsx` — Dual Flow
- Accept an optional `selectedTemplate` prop
- **Template flow**: Skip theme/occasion steps. Go straight from personal details → instant preview (substitute `{name}`, `{age}` into template text). No AI call, instant result.
- **Custom AI flow**: Existing steps (details → theme → occasion → AI generation → preview)
- Show a toggle/indicator at the top: "Using template: Space Adventure" or "Custom AI Story"

#### 4. Update `generate-story/index.ts`
- Accept `pageCount` parameter (currently hardcoded to 5 pages)
- Generate the requested number of pages (10/20/30)

#### 5. Update `Index.tsx`
- Add `selectedTemplate` state alongside `selectedTheme`
- Pass both to `StoryCreator`

### What stays the same
- FlipbookPreview, pricing, order flow, admin dashboard — all unchanged
- Photo upload works for both flows

### Result
Users get two clear paths:
1. **Pick a template** → enter name → instant personalized preview (fast, reliable)
2. **Create custom** → full AI wizard → unique story (differentiator)

