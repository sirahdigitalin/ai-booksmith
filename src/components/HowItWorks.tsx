import { motion } from "framer-motion";
import { PenLine, Wand2, BookOpen, Truck } from "lucide-react";

const steps = [
  { icon: PenLine, title: "Enter Details", desc: "Add the child's name, age, and pick a fun theme." },
  { icon: Wand2, title: "AI Creates Story", desc: "Our AI writes a unique story with custom illustrations." },
  { icon: BookOpen, title: "Preview Your Book", desc: "Flip through a live preview of your personalized book." },
  { icon: Truck, title: "Print & Deliver", desc: "Order the printed book — we handle the rest!" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          From idea to printed book in four simple steps.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/15 flex items-center justify-center mb-5">
              <s.icon size={28} className="text-secondary" />
            </div>
            <span className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 text-6xl font-display font-bold text-muted/40">
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
