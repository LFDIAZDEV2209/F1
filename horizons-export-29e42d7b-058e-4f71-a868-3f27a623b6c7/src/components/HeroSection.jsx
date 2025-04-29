
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover"
          alt="Formula 1 racing car on track"
         src="https://images.unsplash.com/photo-1672658803533-651ffc69212e" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-start container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="max-w-2xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
            variants={itemVariants}
          >
            VELOCIDAD. PASIÓN.{" "}
            <span className="text-primary">ADRENALINA.</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8"
            variants={itemVariants}
          >
            Experimenta la emoción de las carreras más rápidas del mundo. Siente la velocidad, vive la pasión.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Ver Próxima Carrera
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Calendario Completo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator"
          onClick={scrollToContent}
          variants={itemVariants}
        >
          <ChevronDown className="text-white h-10 w-10" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
