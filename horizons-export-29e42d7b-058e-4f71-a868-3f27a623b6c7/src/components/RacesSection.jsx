
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

const RacesSection = () => {
  // Datos simulados de próximas carreras
  const upcomingRaces = [
    {
      id: 1,
      name: "Gran Premio de España",
      date: "15 Mayo, 2025",
      time: "15:00 CEST",
      location: "Circuit de Barcelona-Catalunya",
      country: "España",
    },
    {
      id: 2,
      name: "Gran Premio de Mónaco",
      date: "29 Mayo, 2025",
      time: "15:00 CEST",
      location: "Circuit de Monaco",
      country: "Mónaco",
    },
    {
      id: 3,
      name: "Gran Premio de Canadá",
      date: "12 Junio, 2025",
      time: "20:00 CEST",
      location: "Circuit Gilles Villeneuve",
      country: "Canadá",
    },
    {
      id: 4,
      name: "Gran Premio de Austria",
      date: "26 Junio, 2025",
      time: "15:00 CEST",
      location: "Red Bull Ring",
      country: "Austria",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="races" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Próximas Carreras
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            No te pierdas ninguna de las emocionantes carreras de la temporada.
            Marca en tu calendario y prepárate para la acción.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {upcomingRaces.map((race) => (
            <motion.div key={race.id} variants={itemVariants}>
              <Card className="race-card h-full border-none shadow-lg overflow-hidden">
                <div className="relative h-40">
                  <img 
                    className="w-full h-full object-cover"
                    alt={`${race.name} circuit`}
                   src="https://images.unsplash.com/photo-1669289904056-b597173e2d8b" />
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-medium">
                    {race.country}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-3">{race.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>{race.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{race.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{race.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#"
            className="inline-block text-primary font-medium hover:underline"
          >
            Ver calendario completo →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default RacesSection;
