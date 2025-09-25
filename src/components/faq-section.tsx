"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
interface FAQ {
  question: string;
  answer: string;
  category: string;
}
export function FaqSection() {
  const t = useTranslations("FaqSection");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("faqCategories.0"));

  const faqs = t.raw("faqs");
  const faqCategories = t.raw("faqCategories");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq: FAQ) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === faqCategories[0] || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, faqs, faqCategories]);

  return (
    <section
      id="faqs"
      ref={ref}
      className="py-12 md:py-20 bg-gray-50"
      style={{ backgroundImage: "url('/images/landing_page_question_background.png')" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-4 max-w-6xl">
        {/* Left side */}
        <div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-start mb-10 lg:mb-16"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl md:text-3xl font-bold text-gray-900 mb-6">
              {t("title")}
            </h1>

            {/* Search box */}
            <div className="mb-6 md:mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-2 md:py-3 text-base md:text-lg bg-white border-gray-200 rounded-full focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6 md:mb-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {faqCategories.map((category: string) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 md:px-6 py-2 ${
                    selectedCategory === category
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right side */}
        <div className="max-w-3xl w-full mx-auto lg:mx-0">
          <div className="space-y-4">
            {filteredFaqs.map((faq: FAQ, index: number) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                      {`${index + 1}. ${faq.question}`}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base md:text-lg">{t("noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
