"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";
import landingData from "@/mocks/landing-data.json";

export function FeaturesSection() {
  const features = landingData.features;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.6 },
    },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Ưu điểm vượt trội của Meet
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-pretty">
            Cùng nhau gặt hái nhiều hơn – mọi lúc, mọi nơi – bằng phần mềm họp trực tuyến Meet
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-lg transition-colors duration-300 hover:bg-blue-500 group bg-white shadow-md"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <motion.div
                className="mb-6 flex justify-center"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                  <div
                    className={`w-14 h-14 rounded-full ${feature.bgColor} group-hover:bg-white flex items-center justify-center transition-colors duration-300 shadow-inner`}
                  >
                    <span className="text-white group-hover:text-blue-500 font-bold text-lg transition-colors duration-300">
                      {feature.number}
                    </span>
                  </div>
                </div>
              </motion.div>

              <h3 className="text-lg font-bold text-black group-hover:text-white mb-4 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-600 group-hover:text-white leading-relaxed text-pretty transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="hidden">bg-orange-400 bg-blue-400 bg-teal-500</div>
    </section>
  );
}
