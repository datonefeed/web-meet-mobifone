"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function DashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="features" ref={ref} className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Bảng điều khiển</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Giao diện trực quan, dễ sử dụng với đầy đủ tính năng quản lý cuộc họp
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  <div>
                    <div className="text-white font-semibold">Cuộc họp nhóm Marketing</div>
                    <div className="text-gray-400 text-sm">15 người tham gia</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Đang diễn ra</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center"
                  >
                    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Kết thúc cuộc họp
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Chia sẻ màn hình
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Ghi âm
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
