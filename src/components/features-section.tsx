"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

export function FeaturesSection() {
  const features = [
    {
      number: "01",
      title: "Kết nối nhiều điểm cầu",
      description:
        "Hỗ trợ lên đến 1000 điểm cầu tương tác 2 chiều và hỗ trợ hội thảo Webinar lên đến 10.000 điểm cầu",
      bgColor: "bg-orange-400",
    },
    {
      number: "02",
      title: "Tích hợp",
      description: "Dễ dàng tích hợp với các hệ thống Polycom, Cisco...",
      bgColor: "bg-orange-400",
    },
    {
      number: "03",
      title: "Đa nền tảng",
      description: "Được phát triển trên đa nền tảng : Web Application , Mobile App, Tablet App",
      bgColor: "bg-blue-400",
    },
    {
      number: "04",
      title: "Tính năng nâng cao",
      description:
        "Xây dựng tính năng như tích hợp AI, Kết luận cuộc họp, Dịch thuật trực tuyến, gọi di động để vào cuộc họp",
      bgColor: "bg-teal-500",
    },
  ];

  // Container cho stagger animation
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

  // Item cho từng feature card
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.6 },
    },
  };

  // ref + hook để kiểm tra inView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Tiêu đề */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
          Ưu điểm vượt trội của Meet
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto text-pretty">
          Cùng nhau gặt hái nhiều hơn – mọi lúc, mọi nơi – bằng phần mềm họp trực tuyến Meet
        </p>
      </motion.div>

      {/* Danh sách features */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="text-center p-6 rounded-lg transition-colors duration-300 hover:bg-blue-500 group cursor-pointer"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            {/* Vòng tròn icon */}
            <motion.div
              className="mb-6 flex justify-center"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                <div
                  className={`w-16 h-16 rounded-full ${feature.bgColor} group-hover:bg-white flex items-center justify-center transition-colors duration-300 shadow-inner`}
                >
                  <span className="text-white group-hover:text-blue-500 font-bold text-lg transition-colors duration-300">
                    {feature.number}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tiêu đề */}
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
              {feature.title}
            </h3>

            {/* Mô tả */}
            <p className="text-gray-600 group-hover:text-white leading-relaxed text-pretty transition-colors duration-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
