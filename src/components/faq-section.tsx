"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Meet có miễn phí không?",
      answer:
        "Có, Meet cung cấp gói miễn phí với các tính năng cơ bản cho cuộc họp tối đa 40 phút và 100 người tham gia.",
    },
    {
      question: "Tôi có thể ghi âm cuộc họp không?",
      answer:
        "Có, bạn có thể ghi âm cuộc họp với gói Pro và Enterprise. Các file ghi âm sẽ được lưu trữ an toàn trên cloud.",
    },
    {
      question: "Meet có hỗ trợ trên điện thoại không?",
      answer: "Có, Meet hỗ trợ đầy đủ trên cả iOS và Android với ứng dụng di động được tối ưu hóa.",
    },
    {
      question: "Làm thế nào để mời người khác tham gia cuộc họp?",
      answer:
        "Bạn có thể chia sẻ link cuộc họp hoặc gửi lời mời qua email trực tiếp từ ứng dụng Meet.",
    },
  ];

  return (
    <section id="faqs" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tìm câu trả lời cho những thắc mắc phổ biến về Meet
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-lg p-6 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </div>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
