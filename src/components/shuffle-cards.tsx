"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import landingData from "@/mocks/landing-data.json";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
}

export function ShuffleCards() {
  const [cards, setCards] = useState<Testimonial[]>(landingData.testimonials);

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

  const getCardPosition = (index: number) => {
    if (index < 3) {
      return {
        y: index * 8,
        x: (index - 1) * 20,
        rotate: (index - 1) * 4,
        scale: 1,
      };
    } else {
      return {
        y: index * 8,
        x: index * 10,
        rotate: (index - 1) * 3,
        scale: 1 - (index - 2) * 0.08,
      };
    }
  };

  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <AnimatePresence>
        {cards.slice(0, Math.min(6, cards.length)).map((testimonial, index) => {
          const position = getCardPosition(index);

          return (
            <motion.div
              key={testimonial.id}
              className="absolute w-60 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 cursor-grab active:cursor-grabbing"
              drag={index === 0}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragEnd={index === 0 ? handleDragEnd : undefined}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{
                opacity: index < 4 ? 1 : 0.7 - (index - 4) * 0.15,
                ...position,
              }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ zIndex: cards.length - index }}
            >
              {/* Glass Card */}
              <div className="w-full h-full bg-slate-900/60 backdrop-blur-md border border-slate-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xs sm:text-sm drop-shadow-sm">
                      {testimonial.name}
                    </h3>
                    <p className="text-blue-200 text-[10px] sm:text-xs drop-shadow-sm">
                      {testimonial.title} @ {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Nội dung */}
                <p className="text-white text-xs sm:text-sm italic leading-relaxed line-clamp-6 sm:line-clamp-none">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Decor */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 bg-blue-400 rounded-full opacity-80 shadow-sm"></div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1 h-1 bg-purple-400 rounded-full opacity-60 shadow-sm"></div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
