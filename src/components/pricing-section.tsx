"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const plans = [
    {
      name: "Cơ bản",
      price: "Gói miễn phí",
      period: "",
      features: [
        "100 người tham gia mỗi cuộc họp",
        "Giới hạn thời gian 60 phút",
        "Chat và tương tác",
        "Chia sẻ tài liệu",
        "Phòng họp hội thảo",
      ],
      popular: false,
      color: "from-gray-600 to-gray-700",
    },
    {
      name: "Nâng cao",
      price: "120.000",
      period: "đ/tháng",
      features: [
        "200 người tham gia mỗi cuộc họp",
        "Giới hạn thời gian 24 giờ",
        "Chat và tương tác",
        "Chia sẻ tài liệu",
        "Ghi âm",
        "Bảng trắng",
        "Thăm dò ý kiến và hỏi đáp",
        "Giám sát cuộc họp",
      ],
      popular: true,
      color: "from-blue-600 to-purple-600",
    },
    {
      name: "Chuyên nghiệp",
      price: "150.000",
      period: "đ/tháng",
      features: [
        "300 người tham gia mỗi cuộc họp",
        "Giới hạn thời gian 24 giờ",
        "Chat và tương tác",
        "Chia sẻ tài liệu",
        "Ghi âm",
        "Bảng trắng",
        "Thăm dò ý kiến và hỏi đáp",
        "Giám sát cuộc họp",
        "Phòng họp hội thảo",
      ],
      popular: false,
      color: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bảng giá và gói dịch vụ</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col ${
                plan.popular ? "ring-2 bg-primary scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Phổ biến nhất
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full mt-auto ${
                  plan.popular
                    ? "bg-gradient-to-r bg-primary  hover:bg-primary/90 text-white border-0"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
                size="lg"
              >
                Chọn gói này
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
