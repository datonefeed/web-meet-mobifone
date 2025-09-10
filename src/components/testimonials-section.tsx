"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShuffleCards } from "./shuffle-cards";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="feedback" ref={ref} className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left block: title + description */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Khách hàng đã nói gì về <br />
              <span className="text-6xl font-extrabold text-blue-400">Meet?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Lắng nghe phản hồi từ những khách hàng đã tin tưởng sử dụng Meet
            </p>
          </motion.div>

          {/* Right block: ShuffleCards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            <ShuffleCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
