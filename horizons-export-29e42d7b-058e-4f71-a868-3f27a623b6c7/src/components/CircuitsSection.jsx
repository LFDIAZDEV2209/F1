
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Maximize, Repeat, Trophy, Clock } from "lucide-react";
import { circuitos, pilotos } from "@/data/f1Data";

const CircuitsSection = () => {
  const getDriverNameById = (id) => {
    const driver = pilotos.find(p => p.id === id);
    return driver ? driver.nombre : 'Piloto Desconocido';
  };

  const circuitsToShow = circuitos.slice(0, 4); // Mostrar solo los primeros 4 por defecto

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
    <section id="circuits" className="py-16 bg-gray-50 dark:bg-gray-900">
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
            Circuitos Emblemáticos
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explora algunos de los circuitos más icónicos y desafiantes del
            campeonato mundial de Fórmula 1.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {circuitsToShow.map((circuit) => (
            <motion.div key={circuit.id} variants={itemVariants}>
              <Card className="h-full border-none shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-auto flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-4">
                   <img 
                    src={circuit.imagen}
                    alt={`Mapa del ${circuit.nombre}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{circuit.nombre}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{circuit.pais}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {circuit.descripcion}
                    </p>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center">
                      <Maximize size={16} className="mr-2 text-primary" />
                      <span>Longitud: {circuit.longitud_km} km</span>
                    </div>
                    <div className="flex items-center">
                      <Repeat size={16} className="mr-2 text-primary" />
                      <span>Vueltas: {circuit.vueltas}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-primary" />
                      <span>Récord: {circuit.record_vuelta.tiempo} ({circuit.record_vuelta.piloto}, {circuit.record_vuelta.año})</span>
                    </div>
                     <div className="flex items-start pt-2">
                      <Trophy size={16} className="mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Últimos ganadores:</span>
                        <ul className="list-disc list-inside ml-1">
                          {circuit.ganadores.slice(-3).map(winner => (
                             <li key={winner.temporada}>
                              {winner.temporada}: {getDriverNameById(winner.piloto)}
                            </li>
                          ))}
                        </ul>
                      </div>
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
            Ver todos los circuitos →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CircuitsSection;
