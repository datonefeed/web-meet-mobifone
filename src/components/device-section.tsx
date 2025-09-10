"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

export function DeviceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="device-section" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tối ưu trên mọi thiết bị</h2>
          <span className="text-lg text-gray-600 max-w-3xl mx-auto text-nowrap">
            Nền tảng Meet hỗ trợ hầu hết các thiết bị đầu cuối từ di động, máy tính bảng, laptop,
            PC,… trên các hệ điều hành phổ biến như Windows/ iOS/ Android.
          </span>
        </motion.div>

        <div className="items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <img src="/images/landing_page_optimal_device_bottom.png" alt="optimal device" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
