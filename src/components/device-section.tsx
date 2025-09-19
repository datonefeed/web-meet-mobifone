"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function DeviceSection() {
  const t = useTranslations("DeviceSection");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="device-section" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-6xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <span className="text-base max-w-3xl">{t("description")}</span>
        </motion.div>

        {/* Image */}
        <div className="items-center">
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-center"
          >
            <img
              src="/images/landing_page_optimal_device_bottom.png"
              alt={t("images.optimalDevice.alt")}
              className="mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
