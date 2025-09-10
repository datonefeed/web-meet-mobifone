"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dư Tú Anh",
    title: "CEO",
    company: "Chân Trời Mới",
    content:
      "MEET đã thực sự giúp công việc của chúng tôi trở nên dễ dàng hơn. Giao diện đơn giản và tính ổn định tuyệt vời đã tạo nên những cuộc họp tuyệt vời mà không cần lo lắng về kết nối.",
    avatar: "/images/professional-woman-avatar.png",
  },
  {
    id: 2,
    name: "Adrian Y.",
    title: "Product Marketing",
    company: "Meta",
    content:
      "Chúng tôi đã sử dụng MEET cho việc đào tạo và hỗ trợ khách hàng. Khả năng tùy chỉnh và tính bảo mật cao đã khiến chúng tôi cảm thấy an tâm khi sử dụng nền tảng này.",
    avatar: "/images/gia_cat_luong.jpg",
  },
  {
    id: 3,
    name: "Devin R.",
    title: "Growth Marketing Lead",
    company: "OpenAI",
    content:
      "Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X.",
    avatar: "/images/professional-man-avatar.png",
  },
  {
    id: 4,
    name: "Devin R.",
    title: "Growth Marketing Lead",
    company: "OpenAI",
    content:
      "Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X.",
    avatar: "/images/professional-man-avatar.png",
  },
];

export function ShuffleCards() {
  const [cards, setCards] = useState(testimonials);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    if (distance > 120) {
      setCards((prev) => {
        const newCards = [...prev];
        const firstCard = newCards.shift();
        if (firstCard) {
          newCards.push(firstCard);
        }
        return newCards;
      });
    }
  };

  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <AnimatePresence>
        {cards.slice(0, 4).map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="absolute w-80 h-96"
            drag={index === 0 ? true : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={index === 0 ? handleDragEnd : undefined}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: index * 10,
              x: (index - 1) * 40,
              rotate: (index - 1) * 6,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ zIndex: 3 - index }}
          >
            {/* Glass Card */}
            <div className="w-full h-full bg-slate-900/60 backdrop-blur-md border border-slate-400/30 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm drop-shadow-sm">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-200 text-xs drop-shadow-sm">
                    {testimonial.title} @ {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Nội dung */}
              <p className="text-white text-sm italic leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Decor */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-80 shadow-sm"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-60 shadow-sm"></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
