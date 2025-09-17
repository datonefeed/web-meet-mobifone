"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-2 left-4 right-4 md:left-12 md:right-12 lg:left-36 lg:right-36 
           rounded-lg z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 max-w-6xl mx-auto "
      >
        <div className="mx-auto px-4 py-2 flex items-center justify-between">
          <Logo />
          <DesktopNav language={language} />
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <DesktopAuthButton language={language} />
          </div>
          <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        {isMenuOpen && <MobileMenu language={language} setLanguage={setLanguage} />}
      </motion.header>

      {/* Header sticky */}
      {showSticky && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200"
        >
          <div className="px-2 py-3 flex items-center justify-between max-w-6xl mx-auto">
            <Logo />
            <DesktopNav language={language} />
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher language={language} setLanguage={setLanguage} />
              <DesktopAuthButton language={language} />
            </div>
            <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
          {isMenuOpen && <MobileMenu language={language} setLanguage={setLanguage} />}
        </motion.header>
      )}
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img src="/images/Meet.png" alt="Logo" className="h-16" />
    </div>
  );
}

/* ======= NAVIGATION ======= */
function DesktopNav({ language }: { language: "vi" | "en" }) {
  const navItems =
    language === "vi"
      ? [
          { label: "Trang chủ", href: "#home" },
          { label: "Tính năng", href: "#features" },
          { label: "Đánh giá", href: "#feedback" },
          { label: "Bảng giá", href: "#pricing" },
          { label: "FAQs", href: "#faqs" },
        ]
      : [
          { label: "Home", href: "#home" },
          { label: "Features", href: "#features" },
          { label: "Testimonials", href: "#feedback" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQs", href: "#faqs" },
        ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-gray-600 hover:text-primary transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

/* ======= LANGUAGE SWITCHER ======= */
function LanguageSwitcher({
  language,
  setLanguage,
}: {
  language: "vi" | "en";
  setLanguage: (l: "vi" | "en") => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3">
          {language === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("vi")}>🇻🇳 Tiếng Việt</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ======= AUTH BUTTONS ======= */
function DesktopAuthButton({ language }: { language: "vi" | "en" }) {
  return (
    <Button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition">
      {language === "vi" ? "Đăng nhập" : "Login"}
    </Button>
  );
}

function MobileAuthButton({ language }: { language: "vi" | "en" }) {
  return (
    <Button className="bg-primary text-white w-full py-3 rounded-full hover:bg-primary/80 transition">
      {language === "vi" ? "Đăng nhập" : "Login"}
    </Button>
  );
}
/* ============================= */

/* ======= MOBILE ======= */
function MobileMenuButton({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}) {
  return (
    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}

function MobileMenu({
  language,
  setLanguage,
}: {
  language: "vi" | "en";
  setLanguage: (l: "vi" | "en") => void;
}) {
  const navItems =
    language === "vi"
      ? [
          { label: "Trang chủ", href: "#home" },
          { label: "Tính năng", href: "#features" },
          { label: "Đánh giá", href: "#feedback" },
          { label: "Bảng giá", href: "#pricing" },
          { label: "FAQs", href: "#faqs" },
        ]
      : [
          { label: "Home", href: "#home" },
          { label: "Features", href: "#features" },
          { label: "Testimonials", href: "#feedback" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQs", href: "#faqs" },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 px-4"
    >
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {item.label}
          </a>
        ))}

        <div className="flex flex-col space-y-2 pt-4">
          <MobileAuthButton language={language} />
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </nav>
    </motion.div>
  );
}
