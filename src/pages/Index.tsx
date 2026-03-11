import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BookTypes from "@/components/BookTypes";
import StoryCreator from "@/components/StoryCreator";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { BookTemplate } from "@/data/bookTemplates";

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>();
  const [selectedTemplate, setSelectedTemplate] = useState<BookTemplate | undefined>();

  const handleSelectTemplate = (template: BookTemplate) => {
    setSelectedTemplate(template);
    setSelectedTheme(undefined);
  };

  const handleSelectTheme = (theme: string) => {
    setSelectedTheme(theme === "custom" ? undefined : theme);
    setSelectedTemplate(undefined);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <BookTypes onSelectTheme={handleSelectTheme} onSelectTemplate={handleSelectTemplate} />
      <StoryCreator preselectedTheme={selectedTheme} selectedTemplate={selectedTemplate} />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
