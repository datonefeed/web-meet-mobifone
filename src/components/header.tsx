"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
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
           rounded-lg z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Logo />
          <DesktopNav />
          <AuthButtons />
          <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        {isMenuOpen && <MobileMenu />}
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
          <div className="container mx-auto px-2 py-3 flex items-center justify-between">
            <Logo />
            <DesktopNav />
            <AuthButtons />
            <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
          {isMenuOpen && <MobileMenu />}
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

function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {[
        { label: "Trang chủ", href: "#home" },
        { label: "Tính năng", href: "#features" },
        { label: "Đánh giá", href: "#feedback" },
        { label: "Bảng giá", href: "#pricing" },
        { label: "FAQs", href: "#faqs" },
      ].map((item) => (
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

function AuthButtons() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button className="bg-primary hover:bg-primary/65 justify-start rounded-full">
        Đăng nhập
      </Button>
    </div>
  );
}

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

function MobileMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
    >
      <nav className="flex flex-col space-y-4">
        {[
          { label: "Trang chủ", href: "#home" },
          { label: "Tính năng", href: "#features" },
          { label: "Đánh giá", href: "#feedback" },
          { label: "Bảng giá", href: "#pricing" },
          { label: "FAQs", href: "#faqs" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {item.label}
          </a>
        ))}

        <div className="flex flex-col space-y-2 pt-4">
          <Button className="bg-primary hover:bg-primary/65 justify-start rounded-full">
            Đăng nhập
          </Button>
        </div>
      </nav>
    </motion.div>
  );
}
