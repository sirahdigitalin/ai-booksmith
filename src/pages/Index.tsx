import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BookTypes from "@/components/BookTypes";
import StoryCreator from "@/components/StoryCreator";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <BookTypes />
    <StoryCreator />
    <PricingSection />
    <Footer />
  </div>
);

export default Index;
