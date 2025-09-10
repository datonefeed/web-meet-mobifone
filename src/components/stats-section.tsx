"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-6 bg-gray-50"
      style={{ backgroundImage: "url('/images/landing_page_header_meeting.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">1.500.000+</div>
              <div className="text-gray-600 text-lg">Người dùng tin tưởng</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">3.579+</div>
              <div className="text-gray-600 text-lg">Cuộc họp mỗi ngày</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
