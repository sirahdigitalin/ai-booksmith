import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BookTypes from "@/components/BookTypes";
import StoryCreator from "@/components/StoryCreator";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <BookTypes onSelectTheme={setSelectedTheme} />
      <StoryCreator preselectedTheme={selectedTheme} />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
