
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Gauge, Zap, Droplet, Cog, Users, CloudRain, Sun, AlertTriangle } from "lucide-react";
import { vehiculos, pilotos } from "@/data/f1Data";

const PerformanceDetail = ({ label, value, unit, max, Icon }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative mb-2">
      <Icon size={24} className="text-primary mb-1" />
    </div>
    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
    <span className="font-bold text-lg">{value}{unit}</span>
    {max && (
       <Slider
        defaultValue={[value]}
        max={max}
        step={max/10}
        className="w-20 mt-2 [&>span:first-child]:h-1 [&>span>span]:h-1 [&>a]:h-3 [&>a]:w-3 [&>a]:border-primary/50"
        disabled={true}
      />
    )}
  </div>
);

const ConditionsTabs = ({ data, type }) => (
  <Tabs defaultValue="seco" className="w-full mt-4">
    <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700">
      <TabsTrigger value="seco" className="text-xs data-[state=active]:bg-blue-200 data-[state=active]:text-blue-800"><Sun size={14} className="mr-1 inline" />Seco</TabsTrigger>
      <TabsTrigger value="lluvioso" className="text-xs data-[state=active]:bg-cyan-200 data-[state=active]:text-cyan-800"><CloudRain size={14} className="mr-1 inline"/>Lluvioso</TabsTrigger>
      <TabsTrigger value="extremo" className="text-xs data-[state=active]:bg-red-200 data-[state=active]:text-red-800"><AlertTriangle size={14} className="mr-1 inline"/>Extremo</TabsTrigger>
    </TabsList>
    <TabsContent value="seco" className="mt-4">
      {type === 'fuel' ?
        <PerformanceDetail label="Combustible" value={data.seco} unit=" kg/v" Icon={Droplet} max={5}/> :
        <PerformanceDetail label="Neumáticos" value={data.seco} unit=" /v" Icon={Cog} max={5}/>
      }
    </TabsContent>
    <TabsContent value="lluvioso" className="mt-4">
     {type === 'fuel' ?
        <PerformanceDetail label="Combustible" value={data.lluvioso} unit=" kg/v" Icon={Droplet} max={5}/> :
        <PerformanceDetail label="Neumáticos" value={data.lluvioso} unit=" /v" Icon={Cog} max={5}/>
      }
    </TabsContent>
    <TabsContent value="extremo" className="mt-4">
      {type === 'fuel' ?
        <PerformanceDetail label="Combustible" value={data.extremo} unit=" kg/v" Icon={Droplet} max={5}/> :
        <PerformanceDetail label="Neumáticos" value={data.extremo} unit=" /v" Icon={Cog} max={5}/>
      }
    </TabsContent>
  </Tabs>
);


const VehiclesSection = () => {
  const getDriverNameById = (id) => {
    const driver = pilotos.find(p => p.id === id);
    return driver ? driver.nombre : 'Piloto Desconocido';
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="vehicles" className="py-16 bg-gray-100 dark:bg-gray-900">
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
            Monoplazas de F1
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Descubre las máquinas de ingeniería que llevan a los pilotos a la victoria.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {vehiculos.map((vehicle) => (
            <motion.div key={vehicle.id} variants={itemVariants}>
              <Card className="h-full border-none shadow-xl overflow-hidden bg-white dark:bg-gray-800 flex flex-col">
                 <div className="relative h-56 w-full">
                   <img 
                    src={vehicle.imagen}
                    alt={`Coche ${vehicle.modelo}`}
                    className="w-full h-full object-cover"
                  />
                   <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">{vehicle.modelo}</div>
                </div>
                <CardHeader className="pt-4 pb-2">
                  <CardTitle className="text-xl mb-1">{vehicle.equipo}</CardTitle>
                   <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                     <Users size={14} className="mr-2" />
                     {vehicle.pilotos.map(id => getDriverNameById(id)).join(' / ')}
                   </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                     <PerformanceDetail label="Vel. Máx" value={vehicle.velocidad_maxima_kmh} unit=" km/h" Icon={Gauge} max={400}/>
                     <PerformanceDetail label="0-100 km/h" value={vehicle.aceleracion_0_100} unit=" s" Icon={Zap} max={5}/>
                  </div>

                  <Tabs defaultValue="normal" className="w-full flex-grow flex flex-col">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="normal">Normal</TabsTrigger>
                      <TabsTrigger value="agresiva">Agresiva</TabsTrigger>
                      <TabsTrigger value="ahorro">Ahorro</TabsTrigger>
                    </TabsList>

                    {['normal', 'agresiva', 'ahorro'].map((mode) => {
                      const modeKey = mode === 'normal' ? 'conduccion_normal' : (mode === 'agresiva' ? 'conduccion_agresiva' : 'ahorro_combustible');
                      const performance = vehicle.rendimiento[modeKey];
                      return (
                        <TabsContent key={mode} value={mode} className="flex-grow">
                          <Card className="bg-gray-50 dark:bg-gray-700 p-4 h-full">
                            <div className="grid grid-cols-3 gap-2 text-center mb-4">
                               <PerformanceDetail label="Vel. Prom." value={performance.velocidad_promedio_kmh} unit=" km/h" Icon={Gauge} max={350}/>
                               <div className="col-span-1">
                                <ConditionsTabs data={performance.consumo_combustible} type="fuel"/>
                               </div>
                               <div className="col-span-1">
                                 <ConditionsTabs data={performance.desgaste_neumaticos} type="tyre"/>
                               </div>
                            </div>
                          </Card>
                        </TabsContent>
                      );
                    })}
                  </Tabs>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VehiclesSection;
