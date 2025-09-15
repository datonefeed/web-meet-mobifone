"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import landingData from "@/mocks/landing-data.json";

const { features } = landingData.dashboard;

export function DashboardSection() {
  const [activeFeature, setActiveFeature] = useState("screen-share");
  const currentFeature = features.find((f) => f.id === activeFeature) || features[1];

  return (
    <section className="py-20 bg-slate-900">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left side - Demo image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative rounded-2xl shadow-2xl">
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-video bg-white rounded-lg overflow-hidden"
            >
              <Image
                src={currentFeature.image || "/placeholder.svg"}
                alt={`Demo of ${currentFeature.label}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <motion.div
            key={currentFeature.id + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6 text-balance">
              {currentFeature.title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">{currentFeature.description}</p>
          </motion.div>

          {/* Feature buttons */}
          <div className="space-y-4">
            {[0, 1, 2].map((rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap gap-3">
                {features.slice(rowIndex * 3, rowIndex * 3 + 3).map((feature) => (
                  <Button
                    key={feature.id}
                    variant={activeFeature === feature.id ? "default" : "secondary"}
                    className={`rounded-full px-6 py-3 transition-all duration-200 border ${
                      activeFeature === feature.id
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    {feature.label}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
