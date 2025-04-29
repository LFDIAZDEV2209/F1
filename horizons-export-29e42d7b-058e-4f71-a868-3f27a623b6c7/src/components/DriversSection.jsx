
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { pilotos } from "@/data/f1Data";

const DriversSection = () => {
  const driversToShow = pilotos.slice(0, 6);

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
    <section id="drivers" className="py-16 bg-white dark:bg-gray-800">
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
            Pilotos Destacados
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Conoce a los mejores pilotos del mundo que compiten por la gloria en
            cada carrera.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {driversToShow.map((driver) => (
            <motion.div
              key={driver.id}
              className="driver-card rounded-xl overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <div className="relative h-80">
                <img 
                  className="w-full h-full object-cover"
                  alt={`${driver.nombre} Formula 1 driver`}
                 src="https://images.unsplash.com/photo-1553874652-07b3788e19bd" />
                <div className="driver-overlay absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-12 w-12 mr-3 border-2 border-primary">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${driver.nombre.replace(' ', '+')}&background=random`} alt={driver.nombre} />
                      <AvatarFallback>{driver.nombre.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {driver.nombre}
                      </h3>
                      <p className="text-white/80">{driver.rol}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Equipo
                    </p>
                    <p className="font-medium">{driver.equipo}</p>
                  </div>
                  {/* Placeholder for points if needed in future */}
                  {/* <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Puntos
                    </p>
                    <p className="font-bold text-primary">N/A</p>
                  </div> */}
                </div>
              </div>
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
            Ver todos los pilotos →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DriversSection;
