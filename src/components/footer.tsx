"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Links {
  url: string;
  label: string;
}
interface App {
  icon: string;
  name: string;
  subtitle: string;
}
export default function Footer() {
  const t = useTranslations("Footer");

  const contact = t.raw("contact"); // lấy object contact
  const apps = t.raw("apps"); // lấy array apps
  const bottom = t.raw("bottom"); // lấy object bottom

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={t("logo")} alt="logo" className="mx-auto" />
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">{contact.title}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="text-gray-400 text-xs mb-1">{contact.addressLabel}</p>
                  {contact.address.map((line: string, idx: number) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="text-gray-400 text-xs mb-1">{contact.hotlineLabel}</p>
                  <p>{contact.hotline}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="text-gray-400 text-xs mb-1">{contact.emailLabel}</p>
                  <p>{contact.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* App Download */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">{t("downloadTitle")}</h3>
            <div className="space-y-3 lg:flex">
              {apps.map((app: App, idx: number) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="mt-3 mr-2 lg:w-full w-56 bg-black border-gray-600 text-white hover:bg-black/30 hover:text-white justify-start p-3 h-12"
                >
                  <div className="flex items-center space-x-3">
                    <img src={app.icon} alt={app.name} className="mx-auto h-8" />
                    <div className="text-left">
                      <p className="text-xs text-gray-400">{app.subtitle}</p>
                      <p className="text-sm font-semibold">{app.name}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">{bottom.copyright}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {bottom.links.map((link: Links, idx: number) => (
                <a key={idx} href={link.url} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
