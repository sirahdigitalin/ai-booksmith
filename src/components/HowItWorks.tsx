import { motion } from "framer-motion";
import { PenLine, Wand2, BookOpen, Truck } from "lucide-react";

const steps = [
  { icon: PenLine, title: "Enter Details", desc: "Add a name, age, and pick a theme for your story.", color: "primary" as const },
  { icon: Wand2, title: "AI Creates Story", desc: "Our AI writes a unique story with custom illustrations.", color: "accent" as const },
  { icon: BookOpen, title: "Preview Your Book", desc: "Flip through a live preview of your personalized book.", color: "secondary" as const },
  { icon: Truck, title: "Print & Deliver", desc: "Order the printed book — we handle everything!", color: "primary" as const },
];

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", line: "bg-primary" },
  accent: { bg: "bg-accent/10", text: "text-accent", line: "bg-accent" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", line: "bg-secondary" },
};

const HowItWorks = () => (
  <section id="how-it-works" className="py-28 bg-background relative overflow-hidden">
    {/* Decorative */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">Simple Process</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          From idea to printed book in four simple steps.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Dynamic curved connecting line */}
        <svg
          className="hidden lg:block absolute top-12 left-[10%] right-[10%] w-[80%] h-24 -translate-y-4 z-0"
          viewBox="0 0 800 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,40 C 100,0 150,80 270,40 C 390,0 440,80 530,40 C 620,0 700,80 800,40"
            stroke="url(#flowGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Animated dots along the path */}
          <motion.circle
            r="4"
            fill="hsl(var(--primary))"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 0,40 C 100,0 150,80 270,40 C 390,0 440,80 530,40 C 620,0 700,80 800,40"
            />
          </motion.circle>
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>

        {steps.map((s, i) => {
          const c = colorMap[s.color];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center group"
            >
              <div className={`w-20 h-20 mx-auto rounded-2xl ${c.bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 relative z-10`}>
                <s.icon size={32} className={c.text} />
              </div>
              <span className="absolute top-1 right-1/2 translate-x-14 text-7xl font-display font-bold text-muted/20 select-none">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
