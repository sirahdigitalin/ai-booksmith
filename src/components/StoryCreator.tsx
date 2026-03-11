import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Rocket, Crown, Trees, Gift, Heart, Loader2, Camera, X, ImageIcon, MapPin, Phone, Mail, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FlipbookPreview from "./FlipbookPreview";
import { BookTemplate } from "@/data/bookTemplates";

const themes = [
  { id: "space", label: "Space Adventure", icon: Rocket, color: "border-secondary text-secondary bg-secondary/5" },
  { id: "fairy", label: "Fairy Tale", icon: Crown, color: "border-primary text-primary bg-primary/5" },
  { id: "jungle", label: "Jungle Explorer", icon: Trees, color: "border-green-600 text-green-600 bg-green-50" },
  { id: "birthday", label: "Birthday Special", icon: Gift, color: "border-accent text-accent bg-accent/5" },
  { id: "love", label: "Love Story", icon: Heart, color: "border-primary text-primary bg-primary/5" },
];

const occasions = ["Birthday", "Christmas", "Graduation", "Just Because", "Wedding", "Anniversary"];

const pageOptions = [
  { pages: 10, label: "10 Pages", pdfPrice: "₹199", printPrice: "₹699" },
  { pages: 15, label: "15 Pages", pdfPrice: "₹249", printPrice: "₹799" },
  { pages: 20, label: "20 Pages", pdfPrice: "₹299", printPrice: "₹899" },
];

export interface StoryPage {
  pageNumber: number;
  text: string;
  illustration: string;
}

interface StoryCreatorProps {
  preselectedTheme?: string;
  selectedTemplate?: BookTemplate;
}

const StoryCreator = ({ preselectedTheme, selectedTemplate }: StoryCreatorProps) => {
  // Template flow: step 0 (details) → step 3 (preview) → step 4 (order)
  // Custom AI flow: step 0 (details) → step 1 (theme) → step 2 (occasion+pages) → step 3 (preview) → step 4 (order)
  const [step, setStep] = useState(0);
  const [isTemplateFlow, setIsTemplateFlow] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<BookTemplate | null>(null);
  const [form, setForm] = useState({
    name: "", age: "", phone: "", email: "", theme: "", occasion: "", pageCount: 20,
    address: "", city: "", state: "", pincode: "",
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [story, setStory] = useState<StoryPage[] | null>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [orderType, setOrderType] = useState<"pdf" | "print" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedTemplate) {
      setIsTemplateFlow(true);
      setActiveTemplate(selectedTemplate);
      setStep(0);
      setStory(null);
      setStoryTitle("");
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (preselectedTheme && preselectedTheme !== form.theme) {
      setIsTemplateFlow(false);
      setActiveTemplate(null);
      setForm((prev) => ({ ...prev, theme: preselectedTheme }));
    }
  }, [preselectedTheme]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload a photo under 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));

  const canNextStep0 = form.name.trim() && form.age && form.phone && isValidPhone(form.phone) && form.email && isValidEmail(form.email);
  const canNext =
    (step === 0 && canNextStep0) ||
    (step === 1 && form.theme) ||
    (step === 2 && form.occasion && form.pageCount);

  const canOrder =
    orderType === "pdf" ||
    (orderType === "print" && form.address.trim() && form.city.trim() && form.state.trim() && form.pincode.trim().length >= 5);

  const personalizeTemplate = () => {
    if (!activeTemplate) return;
    const pages: StoryPage[] = activeTemplate.storyTemplate.map((p) => ({
      pageNumber: p.pageNumber,
      text: p.text.replace(/{name}/g, form.name).replace(/{age}/g, form.age),
      illustration: p.illustration,
    }));
    setStoryTitle(`${form.name}'s ${activeTemplate.title}`);
    setStory(pages);
    setForm((prev) => ({ ...prev, pageCount: activeTemplate.pageCount }));
    setStep(3);
  };

  const generateStory = async () => {
    setGenerating(true);
    try {
      const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
      const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        await new Promise((r) => setTimeout(r, 2000));
        const themeName = themes.find((t) => t.id === form.theme)?.label || form.theme;
        setStoryTitle(`${form.name}'s ${themeName}`);
        const pages: StoryPage[] = [];
        for (let i = 1; i <= form.pageCount; i++) {
          pages.push({
            pageNumber: i,
            text: i === 1
              ? `Once upon a time, a brave child named ${form.name} discovered a magical portal in their backyard.`
              : i === form.pageCount
              ? `And so ${form.name} returned home, heart full of wonder. The End.`
              : `Page ${i}: ${form.name} continued the incredible ${themeName.toLowerCase()} adventure, discovering new wonders at every turn.`,
            illustration: ["🌟", "🎨", "🤝", "🏔️", "🎉", "🦁", "🚀", "👑", "🌈", "💫"][i % 10],
          });
        }
        setStory(pages);
        setStep(3);
        return;
      }

      const resp = await fetch(`${supabaseUrl}/functions/v1/generate-story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          name: form.name, age: form.age, theme: form.theme,
          occasion: form.occasion, pageCount: form.pageCount,
          photo: photo ? "included" : undefined,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed to generate story" }));
        throw new Error(err.error || "Failed to generate story");
      }

      const data = await resp.json();
      setStoryTitle(data.title);
      setStory(data.pages);
      setStep(3);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handlePlaceOrder = () => {
    toast({
      title: "🎉 Order Placed!",
      description: orderType === "print"
        ? `Your ${form.pageCount}-page book will be printed and delivered to ${form.city}.`
        : `Your ${form.pageCount}-page PDF will be sent to ${form.email}.`,
    });
  };

  const resetAll = () => {
    setStep(0);
    setStory(null);
    setStoryTitle("");
    setPhoto(null);
    setOrderType(null);
    setIsTemplateFlow(false);
    setActiveTemplate(null);
    setForm({ name: "", age: "", phone: "", email: "", theme: "", occasion: "", pageCount: 20, address: "", city: "", state: "", pincode: "" });
  };

  const handleNextFromDetails = () => {
    if (isTemplateFlow && activeTemplate) {
      personalizeTemplate();
    } else {
      setStep(1);
    }
  };

  // Step 3: Book preview
  if (step === 3 && story) {
    return (
      <section id="create-your-book" className="py-28 bg-background">
        <div className="container mx-auto px-4">
          {/* Flow indicator */}
          <div className="text-center mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-accent font-semibold ${
              isTemplateFlow
                ? "bg-secondary/10 text-secondary border border-secondary/20"
                : "bg-primary/10 text-primary border border-primary/20"
            }`}>
              {isTemplateFlow ? (
                <><BookOpen size={12} /> Template: {activeTemplate?.title}</>
              ) : (
                <><Sparkles size={12} /> Custom AI Story</>
              )}
            </span>
          </div>

          <FlipbookPreview title={storyTitle} pages={story} characterName={form.name} />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button
              onClick={() => { setOrderType("pdf"); setStep(4); }}
              className="bg-gradient-royal text-secondary-foreground font-semibold font-accent px-8"
              size="lg"
            >
              Download PDF — {pageOptions.find(o => o.pages === form.pageCount)?.pdfPrice || "₹199"}
            </Button>
            <Button
              onClick={() => { setOrderType("print"); setStep(4); }}
              className="bg-gradient-crimson text-primary-foreground font-semibold font-accent px-8 shadow-glow-red"
              size="lg"
            >
              Order Printed Book — {pageOptions.find(o => o.pages === form.pageCount)?.printPrice || "₹699"}
            </Button>
          </div>
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={resetAll} className="text-muted-foreground font-accent text-sm">
              ← Create Another Book
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Step 4: Order & Address
  if (step === 4 && story) {
    const selectedPlan = pageOptions.find(o => o.pages === form.pageCount) || pageOptions[0];
    return (
      <section id="create-your-book" className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">
              {orderType === "print" ? "Delivery Details" : "Confirm Order"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {orderType === "print" ? "Where should we deliver?" : "Get Your Digital Copy"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {storyTitle} · {form.pageCount} pages · {orderType === "print" ? selectedPlan.printPrice : selectedPlan.pdfPrice}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl shadow-card p-8 border border-border/50"
          >
            {orderType === "print" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="font-accent font-semibold flex items-center gap-2">
                    <MapPin size={14} className="text-primary" /> Delivery Address
                  </Label>
                  <Textarea
                    id="address" placeholder="House/Flat No, Street, Landmark"
                    value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="mt-2" rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="font-accent font-semibold">City</Label>
                    <Input id="city" placeholder="e.g. Chennai" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="font-accent font-semibold">State</Label>
                    <Input id="state" placeholder="e.g. Tamil Nadu" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-2 h-11" />
                  </div>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="pincode" className="font-accent font-semibold">PIN Code</Label>
                  <Input id="pincode" placeholder="e.g. 600001" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} className="mt-2 h-11" />
                </div>
                <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <p className="text-sm font-accent font-semibold text-foreground mb-2">Order Summary</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{storyTitle} ({form.pageCount} pages)</span>
                    <span className="font-bold text-foreground">{selectedPlan.printPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Delivery</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">📄</div>
                <p className="text-foreground font-accent font-semibold mb-1">Digital PDF Download</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Your {form.pageCount}-page book will be sent to <strong>{form.email}</strong>
                </p>
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50 inline-block">
                  <span className="text-2xl font-bold font-accent text-foreground">{selectedPlan.pdfPrice}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep(3)} className="font-accent">
                ← Back to Preview
              </Button>
              <Button
                disabled={!canOrder}
                onClick={handlePlaceOrder}
                className="bg-gradient-crimson text-primary-foreground font-semibold font-accent px-8 shadow-glow-red hover:shadow-elevated transition-all"
                size="lg"
              >
                Place Order
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Steps 0-2: Form wizard
  const isCustomFlow = !isTemplateFlow;
  const totalSteps = isTemplateFlow ? 1 : 3;
  const stepLabels = isTemplateFlow ? ["Details"] : ["Details", "Theme", "Occasion"];

  return (
    <section id="create-your-book" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">Story Creator</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Create Your Book
          </h2>
          <p className="text-muted-foreground text-lg">
            {isTemplateFlow
              ? `Personalizing "${activeTemplate?.title}" — just enter your details!`
              : "Just 3 quick steps to your personalized story."}
          </p>
        </motion.div>

        {/* Flow indicator */}
        <div className="text-center mb-8">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-accent font-semibold ${
            isTemplateFlow
              ? "bg-secondary/10 text-secondary border border-secondary/20"
              : "bg-primary/10 text-primary border border-primary/20"
          }`}>
            {isTemplateFlow ? (
              <><BookOpen size={12} /> Template: {activeTemplate?.title}</>
            ) : (
              <><Sparkles size={12} /> Custom AI Story</>
            )}
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-accent transition-all duration-300 ${
                    step >= s
                      ? "bg-gradient-crimson text-primary-foreground shadow-glow-red scale-110"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s + 1}
                </div>
                <span className="text-xs text-muted-foreground font-accent hidden sm:block">{stepLabels[s]}</span>
              </div>
              {s < totalSteps - 1 && (
                <div className={`w-12 sm:w-16 h-1 rounded-full transition-colors duration-300 mb-4 sm:mb-5 ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div layout className="bg-card rounded-2xl shadow-card p-8 border border-border/50">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-6 text-foreground">Who is this book for?</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-accent font-semibold flex items-center gap-1.5">
                        <User size={13} className="text-primary" /> Character Name
                      </Label>
                      <Input id="name" placeholder="e.g. Rahaa" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-12" />
                    </div>
                    <div>
                      <Label htmlFor="age" className="font-accent font-semibold">Age</Label>
                      <Input id="age" type="number" placeholder="e.g. 5" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="mt-2 h-12" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="font-accent font-semibold flex items-center gap-1.5">
                        <Phone size={13} className="text-primary" /> Phone Number
                      </Label>
                      <Input
                        id="phone" type="tel" placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        className="mt-2 h-12"
                      />
                      {form.phone && !isValidPhone(form.phone) && (
                        <p className="text-xs text-destructive mt-1">Enter a valid 10-digit mobile number</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-accent font-semibold flex items-center gap-1.5">
                        <Mail size={13} className="text-primary" /> Email
                      </Label>
                      <Input
                        id="email" type="email" placeholder="e.g. name@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-2 h-12"
                      />
                      {form.email && !isValidEmail(form.email) && (
                        <p className="text-xs text-destructive mt-1">Enter a valid email address</p>
                      )}
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <Label className="font-accent font-semibold flex items-center gap-1.5">
                      <Camera size={13} className="text-primary" /> Upload Photo <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">Add a photo to personalize the story character's look.</p>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    {photo ? (
                      <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-primary shadow-card">
                          <img src={photo} alt="Uploaded" className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={() => { setPhoto(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all w-full"
                      >
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Camera size={20} className="text-muted-foreground" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-foreground">Add a photo</p>
                          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && isCustomFlow && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-6 text-foreground">Pick a Theme</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm({ ...form, theme: t.id })}
                      className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 ${
                        form.theme === t.id
                          ? `${t.color} border-current scale-[1.03] shadow-card`
                          : "border-border hover:border-muted-foreground/30 hover:shadow-warm"
                      }`}
                    >
                      <t.icon size={32} className={form.theme === t.id ? "text-current" : "text-muted-foreground"} />
                      <span className="text-sm font-semibold font-accent text-foreground">{t.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && isCustomFlow && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-6 text-foreground">What's the Occasion?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {occasions.map((o) => (
                    <button
                      key={o}
                      onClick={() => setForm({ ...form, occasion: o })}
                      className={`p-4 rounded-xl border-2 text-sm font-semibold font-accent transition-all duration-300 ${
                        form.occasion === o
                          ? "border-primary bg-primary/8 text-primary scale-[1.03] shadow-card"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:shadow-warm"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>

                <h3 className="font-display text-xl font-bold mt-10 mb-2 text-foreground">How many pages?</h3>
                <p className="text-xs text-muted-foreground mb-4">More pages = richer story with more illustrations.</p>
                <div className="grid grid-cols-3 gap-4">
                  {pageOptions.map((opt) => (
                    <button
                      key={opt.pages}
                      onClick={() => setForm({ ...form, pageCount: opt.pages })}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                        form.pageCount === opt.pages
                          ? "border-secondary bg-secondary/10 scale-[1.03] shadow-card"
                          : "border-border hover:border-secondary/30 hover:shadow-warm"
                      }`}
                    >
                      <ImageIcon size={20} className={`mx-auto mb-2 ${form.pageCount === opt.pages ? "text-secondary" : "text-muted-foreground"}`} />
                      <span className={`block text-sm font-bold font-accent ${form.pageCount === opt.pages ? "text-secondary" : "text-foreground"}`}>
                        {opt.label}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">PDF {opt.pdfPrice}</span>
                      <span className="block text-xs text-muted-foreground">Print {opt.printPrice}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-10">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="font-accent"
            >
              Back
            </Button>

            {step === 0 ? (
              <Button
                onClick={handleNextFromDetails}
                disabled={!canNextStep0}
                className={isTemplateFlow
                  ? "bg-gradient-crimson text-primary-foreground font-semibold font-accent px-6 shadow-glow-red hover:shadow-elevated transition-all"
                  : "bg-gradient-royal text-secondary-foreground font-semibold font-accent px-6"
                }
              >
                {isTemplateFlow ? (
                  <><Sparkles size={16} className="mr-2" /> Generate Preview</>
                ) : (
                  <>Next →</>
                )}
              </Button>
            ) : step < 2 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
                className="bg-gradient-royal text-secondary-foreground font-semibold font-accent px-6"
              >
                Next →
              </Button>
            ) : (
              <Button
                disabled={!canNext || generating}
                onClick={generateStory}
                className="bg-gradient-crimson text-primary-foreground font-semibold font-accent px-6 shadow-glow-red hover:shadow-elevated transition-all"
              >
                {generating ? (
                  <><Loader2 size={16} className="mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles size={16} className="mr-2" /> Generate My Book</>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryCreator;
