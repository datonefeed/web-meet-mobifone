"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import landingData from "@/mocks/landing-data.json";

const PlayIcon = () => (
  <div className="w-12 h-12 group-hover:bg-white bg-blue-500/15 rounded-xl flex items-center justify-center transition-all duration-300">
    <img
      src="/images/icon_service-pack.png"
      alt="Service pack icon"
      className="w-8 h-8 object-contain"
    />
  </div>
);

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { plans } = landingData.pricingSection;

  return (
    <section id="pricing" ref={ref} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bảng giá và gói dịch vụ</h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col group hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <PlayIcon />
                <div className="group-hover:hidden">
                  <div className="text-sm text-gray-600">{plan.name}</div>
                  <div className="text-xl font-bold text-gray-900">{plan.title}</div>
                </div>
                <div className="hidden group-hover:block">
                  <div className="text-sm text-white/80">{plan.name}</div>
                  <div className="text-xl font-bold text-white">{plan.title}</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline justify-center text-3xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                  <p className="text-5xl ">
                    {plan.price}
                    {plan.period && (
                      <span className="ml-1 text-xl font-normal text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                        {plan.period}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">
                  Bao gồm những gì
                </h4>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-500 group-hover:bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 transition-colors duration-300">
                      <Check className="h-3 w-3 text-white group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 group-hover:text-white text-sm transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-auto bg-blue-500 hover:bg-blue-600 group-hover:bg-white group-hover:text-blue-500 group-hover:hover:bg-gray-100 text-white rounded-full py-3 transition-all duration-300"
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
