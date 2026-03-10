import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Rocket, Crown, Trees, Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const themes = [
  { id: "space", label: "Space Adventure", icon: Rocket },
  { id: "fairy", label: "Fairy Tale", icon: Crown },
  { id: "jungle", label: "Jungle Explorer", icon: Trees },
  { id: "birthday", label: "Birthday Special", icon: Gift },
  { id: "love", label: "Love Story", icon: Heart },
];

const occasions = ["Birthday", "Christmas", "Graduation", "Just Because", "Wedding", "Anniversary"];

const StoryCreator = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", age: "", theme: "", occasion: "" });

  const canNext =
    (step === 0 && form.name && form.age) ||
    (step === 1 && form.theme) ||
    (step === 2 && form.occasion);

  return (
    <section id="create-your-book" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Create Your Book
          </h2>
          <p className="text-muted-foreground">Just 3 quick steps to your personalized story.</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s + 1}
              </div>
              {s < 2 && <div className={`w-12 h-0.5 ${step > s ? "bg-secondary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-card p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Who is this book for?</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Child's Name</Label>
                    <Input id="name" placeholder="e.g. Rahaa" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="e.g. 5" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="mt-1" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Pick a Theme</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm({ ...form, theme: t.id })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        form.theme === t.id
                          ? "border-secondary bg-secondary/10"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      <t.icon size={28} className={form.theme === t.id ? "text-secondary" : "text-muted-foreground"} />
                      <span className="text-sm font-medium text-foreground">{t.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">What's the Occasion?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {occasions.map((o) => (
                    <button
                      key={o}
                      onClick={() => setForm({ ...form, occasion: o })}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        form.occasion === o
                          ? "border-secondary bg-secondary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-secondary/50"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              Back
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext} className="bg-gradient-navy text-primary-foreground">
                Next
              </Button>
            ) : (
              <Button disabled={!canNext} className="bg-secondary text-secondary-foreground font-semibold">
                <Sparkles size={16} className="mr-2" /> Generate My Book
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryCreator;
