import { motion } from "framer-motion";
import { Check, Download, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Digital PDF",
    price: "₹299",
    icon: Download,
    features: ["AI-generated story", "Custom illustrations", "High-res PDF download", "Instant delivery"],
    popular: false,
    gradient: "bg-card",
    btnClass: "bg-gradient-royal text-secondary-foreground hover:opacity-90",
    checkColor: "text-secondary",
  },
  {
    name: "Printed Book",
    price: "₹899",
    icon: BookOpen,
    features: ["Everything in Digital", "Premium print quality", "Hard/soft cover options", "Free doorstep delivery", "Gift wrapping available"],
    popular: true,
    gradient: "bg-gradient-royal",
    btnClass: "bg-primary text-primary-foreground hover:bg-primary/90",
    checkColor: "text-accent",
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-28 bg-gradient-warm relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-3xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">Pricing</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground text-lg">Download digitally or get it printed and delivered.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-8">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl p-8 ${p.gradient} ${
              p.popular ? "text-secondary-foreground shadow-glow-blue" : "text-card-foreground shadow-card"
            } transition-transform duration-300 hover:scale-[1.02]`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold font-accent shadow-glow-red">
                <Zap size={12} className="fill-current" />
                Most Popular
              </div>
            )}
            <p.icon size={36} className={p.popular ? "text-accent" : "text-primary"} />
            <h3 className="font-display text-2xl font-bold mt-4">{p.name}</h3>
            <p className="text-4xl font-bold mt-2 font-accent">{p.price}</p>
            <ul className="mt-8 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check size={16} className={p.checkColor} />
                  {f}
                </li>
              ))}
            </ul>
            <Button className={`w-full mt-8 font-semibold ${p.btnClass}`} size="lg">
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
