import { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, ShoppingCart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoryPage } from "./StoryCreator";

interface FlipbookPreviewProps {
  title: string;
  pages: StoryPage[];
  characterName: string;
  photo?: string | null;
}

const illustrationBgs = [
  "from-[hsl(var(--primary)/0.08)] via-[hsl(var(--accent)/0.05)] to-[hsl(var(--secondary)/0.08)]",
  "from-[hsl(var(--secondary)/0.08)] via-[hsl(var(--primary)/0.05)] to-[hsl(var(--accent)/0.08)]",
  "from-[hsl(var(--accent)/0.08)] via-[hsl(var(--secondary)/0.05)] to-[hsl(var(--primary)/0.08)]",
  "from-[hsl(var(--primary)/0.06)] via-transparent to-[hsl(var(--secondary)/0.06)]",
  "from-[hsl(var(--accent)/0.06)] via-transparent to-[hsl(var(--primary)/0.06)]",
];

const decorativePatterns = [
  "✦ ✧ ✦",
  "⋆ ⊹ ⋆",
  "❋ ❊ ❋",
  "✿ ❀ ✿",
  "★ ☆ ★",
];

// Pages where the photo appears (1st, middle, last content pages)
const getPhotoPages = (totalPages: number): Set<number> => {
  const pages = new Set<number>();
  pages.add(0); // first page
  pages.add(Math.floor(totalPages / 2)); // middle page
  if (totalPages > 2) pages.add(totalPages - 1); // last page
  return pages;
};

const FlipbookPreview = ({ title, pages, characterName, photo }: FlipbookPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(-1);
  const [direction, setDirection] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const totalPages = pages.length;
  const isOnCover = currentPage === -1;
  const isOnBack = currentPage === totalPages;
  const photoPages = getPhotoPages(totalPages);

  const goNext = useCallback(() => {
    if (currentPage < totalPages && !isFlipping) {
      setIsFlipping(true);
      setDirection(1);
      setCurrentPage((p) => p + 1);
      setTimeout(() => setIsFlipping(false), 700);
    }
  }, [currentPage, totalPages, isFlipping]);

  const goPrev = useCallback(() => {
    if (currentPage > -1 && !isFlipping) {
      setIsFlipping(true);
      setDirection(-1);
      setCurrentPage((p) => p - 1);
      setTimeout(() => setIsFlipping(false), 700);
    }
  }, [currentPage, isFlipping]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -50) goNext();
    else if (info.offset.x > 50) goPrev();
  };

  const flipVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.85,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      rotateY: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.85,
      x: dir < 0 ? 60 : -60,
    }),
  };

  const progressPercent = ((currentPage + 1) / (totalPages + 1)) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20 text-primary font-accent font-semibold text-sm mb-4"
        >
          <BookOpen size={16} />
          <span>Live Book Preview</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </motion.div>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm font-accent mt-2">Swipe or use arrows to turn pages</p>
      </div>

      {/* Book Container - everything inside */}
      <div className="relative mx-auto" style={{ perspective: "1800px" }}>
        {/* Ambient glow behind book */}
        <div className="absolute -inset-8 bg-gradient-radial from-primary/8 via-transparent to-transparent blur-3xl pointer-events-none" />

        {/* Book shadow */}
        <motion.div
          animate={{ scale: isFlipping ? 0.95 : 1, opacity: isFlipping ? 0.3 : 0.15 }}
          className="absolute -bottom-6 left-[8%] right-[8%] h-10 bg-charcoal blur-2xl rounded-full"
        />

        {/* The Book */}
        <motion.div
          className="relative rounded-xl overflow-hidden aspect-[3/2] min-h-[380px] sm:min-h-[440px]"
          style={{ transformStyle: "preserve-3d" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {/* Book edge / spine */}
          <div className="absolute left-0 top-0 bottom-0 w-4 z-20 bg-gradient-to-r from-charcoal/40 via-charcoal/20 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20 bg-gradient-to-b from-primary via-accent to-secondary" />
          
          {/* Top & bottom book edges */}
          <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-gradient-to-r from-primary/40 via-accent/20 to-secondary/40" />
          <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-gradient-to-r from-primary/30 via-accent/15 to-secondary/30" />

          {/* Paper texture overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            {isOnCover ? (
              <motion.div
                key="cover"
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-10 pl-12 cursor-grab active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              >
                {/* Cover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-charcoal to-secondary" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_60%)]" />

                {/* Decorative frame */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-accent/60 text-xs tracking-[0.5em] font-accent mb-4"
                  >
                    ✦ ✦ ✦
                  </motion.div>

                  <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mb-6" />

                  {/* Photo on cover */}
                  {photo && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-5"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-accent/50 shadow-lg mx-auto">
                        <img src={photo} alt={characterName} className="w-full h-full object-cover" />
                      </div>
                    </motion.div>
                  )}

                  <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-secondary-foreground leading-tight mb-3">
                    {title}
                  </h2>

                  <p className="text-secondary-foreground/60 font-accent text-sm mb-6 tracking-wide">
                    A personalized story for {characterName}
                  </p>

                  <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mb-6" />

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-accent/40" />
                    <p className="text-secondary-foreground/40 text-xs font-accent tracking-widest uppercase">
                      The Printing House
                    </p>
                    <div className="w-8 h-px bg-accent/40" />
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-8 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-sm" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-sm" />
                <div className="absolute bottom-4 left-8 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-sm" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-sm" />
              </motion.div>
            ) : isOnBack ? (
              <motion.div
                key="back"
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-10 pl-12 cursor-grab active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_70%)]" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-5xl mb-6"
                  >
                    📖
                  </motion.div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-3">The End</h2>
                  <p className="text-primary-foreground/70 font-accent text-sm mb-8">
                    Made with ❤️ for {characterName}
                  </p>

                  <div className="w-20 h-0.5 bg-accent/50 rounded-full mb-8" />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-accent font-semibold shadow-lg"
                      size="lg"
                      asChild
                    >
                      <a href="#pricing">
                        <ShoppingCart size={16} className="mr-2" />
                        Order Printed Copy
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-accent"
                      size="lg"
                      asChild
                    >
                      <a href="#pricing">
                        <Download size={16} className="mr-2" />
                        Get Digital PDF
                      </a>
                    </Button>
                  </div>

                  <p className="text-xs text-primary-foreground/40 font-accent mt-6 tracking-widest uppercase">
                    Printed by The Printing House
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentPage}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              >
                {/* Page background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${illustrationBgs[currentPage % illustrationBgs.length]}`} />
                <div className="absolute inset-0 bg-card/80" />

                {/* Page content */}
                <div className="relative h-full flex flex-col sm:flex-row items-center justify-center p-8 pl-10 sm:p-12 sm:pl-14 gap-6">
                  {/* Illustration or Photo area */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center">
                    {photo && photoPages.has(currentPage) ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="relative"
                      >
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-elevated">
                          <img src={photo} alt={characterName} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 text-3xl">
                          {pages[currentPage].illustration}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="relative"
                      >
                        <div className="text-7xl sm:text-8xl relative z-10">
                          {pages[currentPage].illustration}
                        </div>
                        <div className="absolute inset-0 blur-2xl opacity-30 text-7xl sm:text-8xl flex items-center justify-center">
                          {pages[currentPage].illustration}
                        </div>
                      </motion.div>
                    )}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-muted-foreground/40 text-xs font-accent mt-3 tracking-widest"
                    >
                      {decorativePatterns[currentPage % decorativePatterns.length]}
                    </motion.p>
                  </div>

                  {/* Text area */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center sm:items-start justify-center max-w-md"
                  >
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary/30 to-transparent mb-4 hidden sm:block" />
                    <p className="text-foreground text-center sm:text-left text-base sm:text-lg leading-relaxed font-body">
                      {pages[currentPage].text}
                    </p>
                  </motion.div>
                </div>

                {/* Page number */}
                <div className="absolute bottom-4 right-6 flex items-center gap-2">
                  <div className="w-6 h-px bg-muted-foreground/20" />
                  <span className="text-xs text-muted-foreground/50 font-accent tracking-wider">
                    {pages[currentPage].pageNumber}
                  </span>
                </div>

                {/* Top-right page fold */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-muted/40 to-transparent transform rotate-0 origin-top-right" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== Navigation INSIDE the book ===== */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* Left arrow */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goPrev}
                  disabled={isOnCover || isFlipping}
                  className="rounded-full w-10 h-10 bg-background/70 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/90 shadow-md disabled:opacity-0 transition-opacity"
                >
                  <ChevronLeft size={18} />
                </Button>
              </motion.div>
            </div>

            {/* Right arrow */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goNext}
                  disabled={isOnBack || isFlipping}
                  className="rounded-full w-10 h-10 bg-background/70 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/90 shadow-md disabled:opacity-0 transition-opacity"
                >
                  <ChevronRight size={18} />
                </Button>
              </motion.div>
            </div>

            {/* Bottom bar: progress + dots + page counter */}
            <div className="absolute bottom-3 left-6 right-6 pointer-events-auto">
              {/* Progress bar */}
              <div className="h-0.5 bg-muted/40 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                  animate={{ width: `${Math.max(progressPercent, 2)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center justify-between">
                {/* Page dots */}
                <div className="flex items-center gap-1 flex-wrap justify-center flex-1">
                  {/* Cover dot */}
                  <button
                    onClick={() => { if (!isFlipping) { setDirection(-1); setCurrentPage(-1); }}}
                    className={`transition-all duration-300 rounded-full ${
                      currentPage === -1
                        ? "w-5 h-2 bg-gradient-to-r from-primary to-secondary"
                        : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label="Cover"
                  />
                  {pages.length <= 12 ? (
                    pages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { if (!isFlipping) { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i); }}}
                        className={`transition-all duration-300 rounded-full ${
                          i === currentPage
                            ? "w-5 h-2 bg-gradient-to-r from-primary to-accent"
                            : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                        }`}
                        aria-label={`Page ${i + 1}`}
                      />
                    ))
                  ) : (
                    <>
                      {Array.from({ length: totalPages }, (_, i) => {
                        const showDot = i < 3 || i >= totalPages - 3 ||
                          (i >= currentPage - 1 && i <= currentPage + 1);
                        const showEllipsis = (i === 3 && currentPage > 4) ||
                          (i === totalPages - 4 && currentPage < totalPages - 5);

                        if (showEllipsis) {
                          return <span key={i} className="text-foreground/20 text-[8px] px-0.5">•••</span>;
                        }
                        if (!showDot) return null;

                        return (
                          <button
                            key={i}
                            onClick={() => { if (!isFlipping) { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i); }}}
                            className={`transition-all duration-300 rounded-full ${
                              i === currentPage
                                ? "w-5 h-2 bg-gradient-to-r from-primary to-accent"
                                : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                            }`}
                            aria-label={`Page ${i + 1}`}
                          />
                        );
                      })}
                    </>
                  )}
                  {/* Back cover dot */}
                  <button
                    onClick={() => { if (!isFlipping) { setDirection(1); setCurrentPage(totalPages); }}}
                    className={`transition-all duration-300 rounded-full ${
                      currentPage === totalPages
                        ? "w-5 h-2 bg-gradient-to-r from-secondary to-primary"
                        : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label="Back cover"
                  />
                </div>

                {/* Page counter */}
                <span className="text-[10px] text-foreground/40 font-accent tracking-wide ml-3 whitespace-nowrap">
                  {isOnCover ? "Cover" : isOnBack ? "Back" : `${currentPage + 1}/${totalPages}`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlipbookPreview;
