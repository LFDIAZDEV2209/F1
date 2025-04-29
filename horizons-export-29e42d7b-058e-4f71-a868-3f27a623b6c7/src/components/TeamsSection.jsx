
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { equipos, pilotos } from "@/data/f1Data";

const TeamsSection = () => {
  const getDriverNameById = (id) => {
    const driver = pilotos.find(p => p.id === id);
    return driver ? driver.nombre : 'Piloto Desconocido';
  };

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
    <section id="teams" className="py-16 bg-white dark:bg-gray-800">
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
            Equipos de Fórmula 1
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Descubre los equipos que compiten por el campeonato mundial de
            constructores.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <Tabs defaultValue={equipos[0]?.id || 'redbull'} className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center mb-8 bg-transparent">
              {equipos.map((team) => (
                <TabsTrigger
                  key={team.id}
                  value={team.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 m-1"
                >
                  {team.nombre}
                </TabsTrigger>
              ))}
            </TabsList>

            {equipos.map((team) => (
              <TabsContent key={team.id} value={team.id}>
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  variants={itemVariants}
                >
                  <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden">
                    <img 
                      className="w-full h-full object-cover"
                      alt={`${team.nombre} Formula 1 car`}
                      src={team.carImage || "https://images.unsplash.com/photo-1615123817063-2649bcb6949a"} />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{team.nombre}</h3>
                      <div className="h-1 w-16 bg-primary mb-4"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">
                          Pilotos
                        </h4>
                        <ul className="mt-1 space-y-1">
                          {team.pilotos.map((driverId, index) => (
                            <li key={index} className="font-medium">
                              {getDriverNameById(driverId)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">
                          Campeonatos
                        </h4>
                        <p className="mt-1 font-bold text-xl">
                          {team.championships}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">
                          Monoplaza
                        </h4>
                        <p className="mt-1 font-medium">{team.car}</p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">
                          Motor
                        </h4>
                        <p className="mt-1 font-medium">{team.motor}</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="#"
                        className="text-primary font-medium hover:underline"
                      >
                        Ver perfil completo del equipo →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {equipos.map((team) => (
            <motion.div
              key={team.id}
              className="flex items-center justify-center"
              variants={itemVariants}
            >
              <img 
                className="team-logo h-12 object-contain"
                alt={`${team.nombre} logo`}
                src={team.imagen} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamsSection;
