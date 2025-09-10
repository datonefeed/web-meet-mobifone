"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

export function PerformanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const metrics = [
    "Chất lượng âm thanh",
    "Độ ổn định kết nối",
    "Bảo mật thông tin",
    "Tốc độ xử lý",
    "Trải nghiệm người dùng",
    "Hỗ trợ đa thiết bị",
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block bg-primary p-12 mb-8  rounded-tr-[80px] rounded-bl-[80px] max-h-64 w-full">
              <div className="text-8xl font-bold text-white">99%</div>
              <p className="text-white text-xl">
                Khách hàng của Meet cảm thấy rất tự tin rằng các cuộc họp của họ được an toàn và bảo
                mật.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-medium text-gray-900">{metric}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
