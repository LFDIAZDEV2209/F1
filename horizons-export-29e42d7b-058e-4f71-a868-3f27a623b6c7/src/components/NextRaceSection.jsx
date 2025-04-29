
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Calendar } from "lucide-react";

const NextRaceSection = () => {
  // Simulación de datos para la próxima carrera
  const nextRace = {
    name: "Gran Premio de España",
    date: "15 Mayo, 2025",
    time: "15:00 CEST",
    location: "Circuit de Barcelona-Catalunya",
    daysLeft: 16,
    hoursLeft: 8,
    minutesLeft: 45,
    secondsLeft: 30,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="content" className="py-16 bg-gray-50 dark:bg-gray-900">
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
            Próxima Carrera
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Prepárate para la emoción del próximo Gran Premio. Marca en tu
            calendario y no te pierdas ni un segundo de acción.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-xl">
              <div className="relative h-64">
                <img 
                  className="w-full h-full object-cover"
                  alt="Circuit de Barcelona-Catalunya aerial view"
                 src="https://images.unsplash.com/photo-1699542107805-373bea1fe92f" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {nextRace.name}
                  </h3>
                  <div className="flex items-center text-white/90 mt-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{nextRace.location}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fecha
                      </p>
                      <p className="font-medium">{nextRace.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Hora de Inicio
                      </p>
                      <p className="font-medium">{nextRace.time}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center">
              Cuenta Regresiva
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="countdown-item">
                <span className="text-3xl font-bold text-primary">
                  {nextRace.daysLeft}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Días
                </span>
              </div>
              <div className="countdown-item">
                <span className="text-3xl font-bold text-primary">
                  {nextRace.hoursLeft}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Horas
                </span>
              </div>
              <div className="countdown-item">
                <span className="text-3xl font-bold text-primary">
                  {nextRace.minutesLeft}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Minutos
                </span>
              </div>
              <div className="countdown-item">
                <span className="text-3xl font-bold text-primary">
                  {nextRace.secondsLeft}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Segundos
                </span>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold mb-2">Datos del Circuito</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-32 text-gray-500 dark:text-gray-400">
                    Longitud:
                  </span>
                  <span className="font-medium">4.675 km</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 text-gray-500 dark:text-gray-400">
                    Vueltas:
                  </span>
                  <span className="font-medium">66</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 text-gray-500 dark:text-gray-400">
                    Distancia:
                  </span>
                  <span className="font-medium">308.424 km</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 text-gray-500 dark:text-gray-400">
                    Curvas:
                  </span>
                  <span className="font-medium">16 (9 derechas, 7 izquierdas)</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NextRaceSection;
