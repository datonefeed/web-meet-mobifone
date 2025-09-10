"use client";

import { Button } from "@/components/ui/button";
import { Play, Download, Apple } from "lucide-react";
import { motion } from "framer-motion";
import { PictureTiltCard } from "./picture-tilt-card";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden"
      style={{ backgroundImage: "url('/images/landing_page_header_background.png')" }}
    >
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-5xl lg:text-4xl font-bold mb-6 text-balance">
              Nền tảng{" "}
              <span className="text-primary bg-clip-text bg-gradient-to-r">họp trực tuyến</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 text-pretty">
              MEET mang lại trải nghiệm dễ dàng, bảo mật và không giới hạn
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-primary hover:text-white text-base px-4 py-3 bg-white/10 rounded-full"
              >
                <Play className="mr-2 h-5 w-5" />
                Đăng ký dùng thử
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-primary hover:text-white text-base px-4 py-3 bg-white/10 rounded-full"
              >
                Chính sách và bảng giá
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-2  ">
              {/* Google Play */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-8 py-6 rounded-lg"
              >
                <img
                  src="./images/google_play-icon.png"
                  className="h-8 w-8 mr-3"
                  alt="Google Play"
                />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">GET IT ON</span>
                  <span className="text-lg font-semibold">Google Play</span>
                </div>
              </Button>

              {/* App Store */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-8 py-6 rounded-lg"
              >
                <img src="./images/apple-icon.png" className="h-9 w-8 mr-3" alt="App Store" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">Download on the</span>
                  <span className="text-lg font-semibold">App Store</span>
                </div>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Microsoft */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-14 py-6 rounded-lg"
              >
                <img src="./images/window-icon.png" className="h-8 w-8 mr-3" alt="Google Play" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">GET IT ON</span>
                  <span className="text-lg font-semibold">Windows</span>
                </div>
              </Button>

              {/* MacOs */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-8 py-6 rounded-lg"
              >
                <img src="./images/apple-icon.png" className="h-9 w-8 mr-3" alt="App Store" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">Download on the</span>
                  <span className="text-lg font-semibold">MacOs</span>
                </div>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <PictureTiltCard
              src="/images/landing_page_header_right.png"
              alt="Forest path"
              className="mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
