"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { PictureTiltCard } from "./picture-tilt-card";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundImage: "url('/images/landing_page_header_background.png')" }}
    >
      <div className="relative container mx-auto px-4 pt-32 pb-20 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-4xl lg:text-4xl font-bold mb-6 text-balance">
              {t("title")}{" "}
              <span className="text-primary bg-clip-text bg-gradient-to-r">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-base text-gray-300 mb-8 text-pretty">{t("description")}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-primary hover:text-white text-base px-4 py-3 bg-white/10 rounded-full"
              >
                <Play className="mr-2 h-5 w-5" />
                {t("buttons.trial")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-primary hover:text-white text-base px-4 py-3 bg-white/10 rounded-full"
              >
                {t("buttons.pricing")}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Google Play */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-8 py-6 rounded-lg"
              >
                <img
                  src="./images/google_play-icon.png"
                  className="h-8 w-8 mr-3"
                  alt={t("images.googlePlay.alt")}
                />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">{t("download.googlePlay.text")}</span>
                  <span className="text-lg font-semibold">{t("download.googlePlay.label")}</span>
                </div>
              </Button>

              {/* App Store */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-8 py-6 rounded-lg"
              >
                <img
                  src="./images/apple-icon.png"
                  className="h-9 w-8 mr-3"
                  alt={t("images.appStore.alt")}
                />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">{t("download.appStore.text")}</span>
                  <span className="text-lg font-semibold">{t("download.appStore.label")}</span>
                </div>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Windows */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-14 py-6 rounded-lg"
              >
                <img
                  src="./images/window-icon.png"
                  className="h-8 w-8 mr-3"
                  alt={t("images.windows.alt")}
                />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">{t("download.windows.text")}</span>
                  <span className="text-lg font-semibold">{t("download.windows.label")}</span>
                </div>
              </Button>

              {/* MacOs */}
              <Button
                variant="secondary"
                className="flex items-center bg-white hover:bg-white/80 text-black border-0 pr-8 py-6 rounded-lg"
              >
                <img
                  src="./images/apple-icon.png"
                  className="h-9 w-8 mr-3"
                  alt={t("images.macOs.alt")}
                />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs">{t("download.macOs.text")}</span>
                  <span className="text-lg font-semibold">{t("download.macOs.label")}</span>
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
              alt={t("images.heroImage.alt")}
              className="mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
