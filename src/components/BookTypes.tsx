import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";
import { bookTemplates, BookTemplate } from "@/data/bookTemplates";

interface BookTypesProps {
  onSelectTheme?: (theme: string) => void;
  onSelectTemplate?: (template: BookTemplate) => void;
}

const tagColors: Record<string, string> = {
  Adventure: "bg-secondary text-secondary-foreground",
  Kids: "bg-primary text-primary-foreground",
  Fantasy: "bg-primary text-primary-foreground",
  Nature: "bg-green-600 text-primary-foreground",
  Birthday: "bg-accent text-accent-foreground",
  Gifts: "bg-accent text-accent-foreground",
  Wedding: "bg-primary text-primary-foreground",
  Romance: "bg-primary text-primary-foreground",
  Inspiration: "bg-secondary text-secondary-foreground",
  Education: "bg-secondary text-secondary-foreground",
};

const BookTypes = ({ onSelectTheme, onSelectTemplate }: BookTypesProps) => {
  const handleTemplateClick = (template: BookTemplate) => {
    onSelectTemplate?.(template);
    const el = document.getElementById("create-your-book");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCustomClick = () => {
    onSelectTheme?.("custom");
    const el = document.getElementById("create-your-book");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="book-types" className="py-28 bg-gradient-warm relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">Our Collection</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Story
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Pick a beautifully crafted template for instant personalization, or create a fully custom AI story.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {bookTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
              onClick={() => handleTemplateClick(template)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card mb-4 aspect-[2/3] book-card bg-card">
                <img
                  src={template.coverImage}
                  alt={template.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tags */}
                <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-accent shadow-sm ${tagColors[tag] || "bg-muted text-muted-foreground"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Age badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 text-foreground text-[10px] font-bold font-accent shadow-sm backdrop-blur-sm">
                  Ages {template.ageRange}
                </div>

                {/* Hover content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary-foreground/80 text-xs mb-2 line-clamp-2">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-foreground font-display font-bold text-sm">Personalize &rarr;</span>
                    <span className="text-primary-foreground/60 text-[10px] font-accent flex items-center gap-1">
                      <BookOpen size={10} /> {template.pageCount} pages
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-foreground text-center group-hover:text-primary transition-colors">
                {template.title}
              </h3>
            </motion.div>
          ))}

          {/* Custom AI Story card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: bookTemplates.length * 0.08 }}
            className="group cursor-pointer"
            onClick={handleCustomClick}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card mb-4 aspect-[2/3] book-card border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex flex-col items-center justify-center gap-4 hover:border-primary/60 transition-colors duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-crimson flex items-center justify-center shadow-glow-red group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={28} className="text-primary-foreground" />
              </div>
              <div className="text-center px-4">
                <p className="font-display font-bold text-foreground text-sm mb-1">Create Custom Story</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  AI generates a unique story just for you — any theme, any occasion
                </p>
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-crimson text-primary-foreground text-[10px] font-bold font-accent shadow-sm">
                AI ✨
              </div>
            </div>
            <h3 className="font-display text-sm font-bold text-foreground text-center group-hover:text-primary transition-colors">
              Custom AI Story
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookTypes;
