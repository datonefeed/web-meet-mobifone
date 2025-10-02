"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";

interface LanguageTabsProps {
  activeLanguage: "vi" | "en";
  onChange: (lang: "vi" | "en") => void;
}

export default function LanguageTabs({ activeLanguage, onChange }: LanguageTabsProps) {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Chọn ngôn ngữ chỉnh sửa
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant={activeLanguage === "vi" ? "default" : "outline"}
            onClick={() => onChange("vi")}
            className="flex items-center gap-2"
            size="sm"
          >
            🇻🇳 Tiếng Việt
          </Button>
          <Button
            variant={activeLanguage === "en" ? "default" : "outline"}
            onClick={() => onChange("en")}
            className="flex items-center gap-2"
            size="sm"
          >
            🇺🇸 English
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
