"use client";

import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import landingData from "@/mocks/landing-data.json";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export default function PerformanceSection() {
  const { awards, partners } = landingData.performanceSection;
  const t = useTranslations("PerformanceSection");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-50 bg-cover"
      style={{
        backgroundImage: "url('/images/landing_page_partner_background.png')",
      }}
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Statistics and Awards Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Statistics Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative lg:col-span-1"
          >
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="bg-primary p-8 text-white shadow-2xl rounded-tr-[80px] rounded-bl-[80px] h-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 w-auto"
              >
                99%
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5 }}
                className="text-base lg:text-lg leading-relaxed"
              >
                {t("stats.description")}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Awards Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-3 gap-4 lg:col-span-2">
            {awards.map((award, index) => (
              <motion.div key={index} variants={itemVariants} className="h-full p-4 text-center">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="mb-3"
                >
                  <Image
                    src={award.badge || "/placeholder.svg"}
                    alt={`${award.title} award`}
                    width={60}
                    height={60}
                    className="mx-auto"
                  />
                </motion.div>
                <h3 className="font-semibold text-sm text-gray-800 mb-1">{award.title}</h3>
                <p className="text-xs text-gray-600">{award.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div variants={itemVariants} className="rounded-2xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {t("partners.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">{t("partners.description")}</p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-lg p-4 flex items-center justify-center transition-colors duration-300"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={150}
                    height={40}
                    className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
