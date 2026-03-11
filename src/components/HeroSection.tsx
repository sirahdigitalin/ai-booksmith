import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBook from "@/assets/hero-book-personalized.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(hsl(var(--charcoal)) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 border border-primary/15 text-primary mb-8">
            
            <Sparkles size={16} />
            <span className="text-sm font-semibold font-accent">AI-Powered Personalization</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-foreground leading-[1.1] mb-4 tracking-tight">
            More than a{" "}
            <span className="text-gradient-crimson">Gift!</span>
          </h1>

          <p className="text-xl sm:text-2xl font-display text-muted-foreground mb-6 leading-relaxed">
            A keepsake they'll treasure for years to come
          </p>

          <p className="text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Enter a name, pick a theme, and our AI crafts a unique storybook with
            custom illustrations — ready to print and deliver to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="bg-gradient-crimson text-primary-foreground font-semibold px-8 py-6 text-base shadow-glow-red hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]"
                asChild>
                
                <a href="#create-your-book">
                  Create Your Book <ArrowRight size={18} className="ml-2" />
                </a>
              </Button>
              

              
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary font-semibold px-8 py-6 text-base hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              asChild>
              
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4 text-center lg:text-left">
            ⏱️ Takes only 2 minutes — no account needed
          </p>

          <div className="flex items-center gap-8 mt-8 justify-center lg:justify-start">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) =>
                <Star key={i} size={14} className="fill-accent text-accent" />
                )}
              </div>
              <span className="font-semibold">10,000+ books</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">📦 Free delivery</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center perspective-1000">
          
          <div className="relative group">
            {/* Glow behind the book */}
            <div className="absolute -inset-8 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 rounded-[2rem] blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            
            {/* Rotating border effect */}
            <div className="absolute -inset-1 rounded-2xl animate-gradient-border opacity-30 blur-sm" />
            
            <img
              src={heroBook}
              alt="Personalized children's storybook - Max's Space Adventure"
              className="relative w-full max-w-md lg:max-w-lg rounded-2xl shadow-elevated transform group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-700" />
            

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-card font-accent font-bold text-sm">
              
              ✨ AI-Generated
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;