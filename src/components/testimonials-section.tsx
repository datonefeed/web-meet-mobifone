"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShuffleCards } from "./shuffle-cards";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("TestimonialsSection");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="feedback"
      ref={ref}
      className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-blue-900"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mx-auto max-w-6xl">
          {/* Left block: title + description */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-4"
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl md:text-4xl font-bold text-white leading-snug">
              {t("title")} <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl md:text-6xl font-extrabold text-primary">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              {t("description")}
            </p>
          </motion.div>

          {/* Right block: ShuffleCards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center lg:justify-end"
          >
            <ShuffleCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
