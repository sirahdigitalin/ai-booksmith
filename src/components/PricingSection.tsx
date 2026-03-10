import { motion } from "framer-motion";
import { Check, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Digital PDF",
    price: "₹299",
    icon: Download,
    features: ["AI-generated story", "Custom illustrations", "High-res PDF download", "Instant delivery"],
    popular: false,
  },
  {
    name: "Printed Book",
    price: "₹899",
    icon: BookOpen,
    features: ["Everything in Digital", "Premium print quality", "Hard/soft cover options", "Free doorstep delivery", "Gift wrapping available"],
    popular: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-gradient-warm">
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Simple Pricing
        </h2>
        <p className="text-muted-foreground">Download digitally or get it printed and delivered.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-8">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl p-8 ${
              p.popular
                ? "bg-primary text-primary-foreground shadow-elevated"
                : "bg-card text-card-foreground shadow-card"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                Most Popular
              </span>
            )}
            <p.icon size={32} className={p.popular ? "text-secondary" : "text-secondary"} />
            <h3 className="font-display text-2xl font-bold mt-4">{p.name}</h3>
            <p className="text-3xl font-bold mt-2">{p.price}</p>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check size={16} className={p.popular ? "text-secondary" : "text-secondary"} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full mt-8 ${
                p.popular
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  : "bg-gradient-navy text-primary-foreground"
              }`}
              size="lg"
            >
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
