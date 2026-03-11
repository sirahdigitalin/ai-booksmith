import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoryPage } from "./StoryCreator";

interface FlipbookPreviewProps {
  title: string;
  pages: StoryPage[];
  characterName: string;
}

const pageColors = [
  "from-primary/5 to-accent/5",
  "from-secondary/5 to-primary/5",
  "from-accent/5 to-secondary/5",
  "from-primary/5 to-secondary/5",
  "from-accent/5 to-primary/5",
];

const FlipbookPreview = ({ title, pages, characterName }: FlipbookPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(-1); // -1 = cover
  const [direction, setDirection] = useState(0);

  const totalPages = pages.length;
  const isOnCover = currentPage === -1;
  const isOnBack = currentPage === totalPages;

  const goNext = () => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > -1) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-primary font-accent font-semibold text-sm mb-2">
          <BookOpen size={16} /> Live Preview
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{title}</h3>
      </div>

      {/* Book container */}
      <div className="relative mx-auto" style={{ perspective: "1200px" }}>
        {/* Book shadow */}
        <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 bg-charcoal/10 blur-2xl rounded-full" />

        <div className="relative bg-card rounded-2xl border border-border/50 shadow-elevated overflow-hidden aspect-[4/3] min-h-[320px]">
          {/* Book spine decoration */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-primary via-secondary to-primary opacity-80 z-10" />

          <AnimatePresence mode="wait" custom={direction}>
            {isOnCover ? (
              <motion.div
                key="cover"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 pl-10 bg-gradient-to-br from-secondary via-secondary to-charcoal text-secondary-foreground"
              >
                <div className="w-20 h-1 bg-accent rounded-full mb-6" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">{title}</h2>
                <p className="text-sm opacity-70 font-accent mb-6">A personalized story for {characterName}</p>
                <div className="w-20 h-1 bg-accent rounded-full" />
                <p className="text-xs opacity-50 font-accent mt-8">The Printing House</p>
              </motion.div>
            ) : isOnBack ? (
              <motion.div
                key="back"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 pl-10 bg-gradient-to-br from-primary via-primary to-crimson-dark text-primary-foreground"
              >
                <h2 className="font-display text-2xl font-bold mb-4">The End</h2>
                <p className="text-sm opacity-80 font-accent mb-6">Made with ❤️ for {characterName}</p>
                <div className="w-16 h-0.5 bg-accent rounded-full mb-6" />
                <p className="text-xs opacity-60 font-accent">Printed by The Printing House</p>
                <Button
                  className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-accent font-semibold"
                  size="lg"
                  asChild
                >
                  <a href="#pricing">Order Printed Copy</a>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 pl-10 sm:pl-14 bg-gradient-to-br ${pageColors[currentPage % pageColors.length]}`}
              >
                <div className="text-6xl mb-6">{pages[currentPage].illustration}</div>
                <p className="text-foreground text-center text-base sm:text-lg leading-relaxed max-w-md font-body">
                  {pages[currentPage].text}
                </p>
                <span className="absolute bottom-4 right-6 text-xs text-muted-foreground font-accent">
                  Page {pages[currentPage].pageNumber}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={isOnCover}
          className="rounded-full w-12 h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
        >
          <ChevronLeft size={20} />
        </Button>

        <div className="flex items-center gap-2">
          {[-1, ...pages.map((_, i) => i), totalPages].map((p) => (
            <button
              key={p}
              onClick={() => { setDirection(p > currentPage ? 1 : -1); setCurrentPage(p); }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                p === currentPage ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={isOnBack}
          className="rounded-full w-12 h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default FlipbookPreview;
