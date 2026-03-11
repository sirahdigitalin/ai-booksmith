import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the personalization work?",
    answer:
      "Simply enter the child's name, age, and pick a theme. Our AI generates a unique story featuring your child as the main character, complete with custom illustrations tailored to the adventure you choose.",
  },
  {
    question: "What age group are the books suitable for?",
    answer:
      "Our storybooks are designed for children aged 2–10. Each template indicates a recommended age range, and the AI adjusts vocabulary and story complexity accordingly.",
  },
  {
    question: "How long does it take to create a book?",
    answer:
      "The digital preview is generated in under 2 minutes. Once you place an order, printing and delivery typically takes 5–7 business days.",
  },
  {
    question: "Can I preview the book before ordering?",
    answer:
      "Absolutely! After the AI generates your story, you'll see a full flipbook preview with every page. You can make adjustments before placing your order.",
  },
  {
    question: "What is the print quality like?",
    answer:
      "We use premium 170gsm pages with a hardcover binding and glossy laminate finish. The illustrations are printed in vivid full-color at 300 DPI for sharp, vibrant results.",
  },
  {
    question: "Is it really free to create a book?",
    answer:
      "Yes — creating and previewing your personalized storybook is completely free. You only pay when you decide to order a printed copy delivered to your door.",
  },
  {
    question: "Can I create a book in a different language?",
    answer:
      "Currently we support English, with more languages coming soon. If you'd like to request a specific language, let us know through our contact form.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/8 border border-secondary/15 text-secondary mb-6">
            <HelpCircle size={16} />
            <span className="text-sm font-semibold font-accent">Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient-blue">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to know about creating your personalized storybook.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 shadow-card data-[state=open]:shadow-elevated transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
