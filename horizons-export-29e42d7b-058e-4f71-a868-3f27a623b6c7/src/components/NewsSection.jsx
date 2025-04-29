
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const NewsSection = () => {
  // Datos simulados de noticias
  const news = [
    {
      id: 1,
      title: "Verstappen domina en el Gran Premio de Bahrein",
      excerpt:
        "El piloto neerlandés consigue su primera victoria de la temporada con una actuación impecable.",
      date: "28 Abril, 2025",
      category: "Carreras",
    },
    {
      id: 2,
      title: "Ferrari presenta mejoras aerodinámicas para Barcelona",
      excerpt:
        "El equipo italiano busca recortar distancias con un nuevo paquete de actualizaciones.",
      date: "26 Abril, 2025",
      category: "Equipos",
    },
    {
      id: 3,
      title: "Hamilton anuncia su renovación con Mercedes",
      excerpt:
        "El siete veces campeón del mundo continuará con el equipo alemán por dos temporadas más.",
      date: "25 Abril, 2025",
      category: "Pilotos",
    },
    {
      id: 4,
      title: "La F1 confirma un nuevo Gran Premio en Madrid para 2026",
      excerpt:
        "La capital española se incorporará al calendario con un circuito urbano innovador.",
      date: "23 Abril, 2025",
      category: "Calendario",
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
    <section id="news" className="py-16 bg-gray-50 dark:bg-gray-900">
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
            Últimas Noticias
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Mantente al día con las últimas novedades del mundo de la Fórmula 1.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {news.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="news-card h-full border-none shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover"
                    alt={`${item.title} news image`}
                   src="https://images.unsplash.com/photo-1605465145897-0a8140fc44aa" />
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{item.date}</span>
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
            Ver todas las noticias →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
