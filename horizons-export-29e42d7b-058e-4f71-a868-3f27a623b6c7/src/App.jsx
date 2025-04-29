
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NextRaceSection from "@/components/NextRaceSection";
import DriversSection from "@/components/DriversSection";
import TeamsSection from "@/components/TeamsSection";
import VehiclesSection from "@/components/VehiclesSection";
import CircuitsSection from "@/components/CircuitsSection";
import RacesSection from "@/components/RacesSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <NextRaceSection />
      <DriversSection />
      <TeamsSection />
      <VehiclesSection />
      <CircuitsSection />
      <RacesSection />
      <NewsSection />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
