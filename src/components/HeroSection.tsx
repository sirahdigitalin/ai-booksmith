import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBook from "@/assets/hero-book.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-warm">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--navy)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary mb-6"
          >
            <Sparkles size={16} />
            <span className="text-sm font-semibold">AI-Powered Personalization</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Create Your{" "}
            <span className="text-gradient-gold">Personalized Book</span>{" "}
            in 30 Seconds
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
            Enter a name, pick a theme, and our AI crafts a unique storybook with
            custom illustrations — ready to print and deliver to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-gradient-navy text-primary-foreground font-semibold px-8 py-6 text-base shadow-elevated hover:opacity-90 transition-opacity"
              asChild
            >
              <a href="#create-your-book">
                Create Your Book <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary font-semibold px-8 py-6 text-base hover:bg-secondary/10"
              asChild
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
            <span>✨ 10,000+ books created</span>
            <span>📦 Free delivery</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/20 rounded-3xl blur-3xl" />
            <img
              src={heroBook}
              alt="Magical personalized storybook"
              className="relative w-full max-w-md lg:max-w-lg rounded-2xl shadow-elevated"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
