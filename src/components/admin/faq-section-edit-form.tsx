"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Languages, HelpCircle } from "lucide-react";
import type { MultilingualData, FaqItem } from "@/types/content";

interface FaqSectionEditFormProps {
  data: MultilingualData;
  onDataChange: (newData: MultilingualData) => void;
  onSave: () => void;
  saving: boolean;
}

export default function FaqSectionEditForm({
  data,
  onDataChange,
  onSave,
  saving,
}: FaqSectionEditFormProps) {
  const [activeLanguage, setActiveLanguage] = useState<"vi" | "en">("vi");

  const currentFaqs = data[activeLanguage].FaqSection.faqs || [];
  const currentCategories = data[activeLanguage].FaqSection.faqCategories || [];

  const updateMeta = <K extends "title" | "searchPlaceholder" | "noResults">(
    field: K,
    value: string,
    language: "vi" | "en"
  ) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData[language].FaqSection[field] = value;
    onDataChange(newData);
  };

  const updateCategory = (index: number, value: string, language: "vi" | "en") => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData[language].FaqSection.faqCategories[index] = value;
    onDataChange(newData);
  };

  const addCategory = () => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.FaqSection.faqCategories.push("Danh mục mới");
    newData.en.FaqSection.faqCategories.push("New category");
    onDataChange(newData);
  };

  const removeCategory = (index: number) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.FaqSection.faqCategories.splice(index, 1);
    newData.en.FaqSection.faqCategories.splice(index, 1);
    onDataChange(newData);
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string, language: "vi" | "en") => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData[language].FaqSection.faqs[index] = {
      ...newData[language].FaqSection.faqs[index],
      [field]: value,
    } as FaqItem;
    onDataChange(newData);
  };

  const addFaq = () => {
    const viItem: FaqItem = {
      question: "Câu hỏi?",
      answer: "Trả lời",
      category: currentCategories[1] || "Tất cả",
    };
    const enCats = data.en.FaqSection?.faqCategories || [];
    const enItem: FaqItem = {
      question: "Question?",
      answer: "Answer",
      category: enCats[1] || "All",
    };
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.FaqSection.faqs.push(viItem);
    newData.en.FaqSection.faqs.push(enItem);
    onDataChange(newData);
  };

  const removeFaq = (index: number) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.FaqSection.faqs.splice(index, 1);
    newData.en.FaqSection.faqs.splice(index, 1);
    onDataChange(newData);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Languages className="h-5 w-5" /> Chọn ngôn ngữ chỉnh sửa
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={activeLanguage === "vi" ? "default" : "outline"}
              onClick={() => setActiveLanguage("vi")}
              size="sm"
            >
              🇻🇳 Tiếng Việt
            </Button>
            <Button
              variant={activeLanguage === "en" ? "default" : "outline"}
              onClick={() => setActiveLanguage("en")}
              size="sm"
            >
              🇺🇸 English
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-col md:flex-row">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" /> FAQ -{" "}
              {activeLanguage === "vi" ? "Tiếng Việt" : "English"}
            </CardTitle>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button onClick={addCategory} size="sm" className="bg-primary">
                Thêm danh mục
              </Button>
              <Button onClick={addFaq} size="sm" className="bg-primary">
                <Plus className="h-4 w-4 mr-2" /> Thêm FAQ
              </Button>
              <Button
                onClick={onSave}
                disabled={saving}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                <Input
                  value={data[activeLanguage].FaqSection.title || ""}
                  onChange={(e) => updateMeta("title", e.target.value, activeLanguage)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Placeholder tìm kiếm
                </label>
                <Input
                  value={data[activeLanguage].FaqSection.searchPlaceholder || ""}
                  onChange={(e) => updateMeta("searchPlaceholder", e.target.value, activeLanguage)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thông báo không có kết quả
                </label>
                <Input
                  value={data[activeLanguage].FaqSection.noResults || ""}
                  onChange={(e) => updateMeta("noResults", e.target.value, activeLanguage)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-gray-700">Danh mục</div>
            {currentCategories.map((cat, idx) => (
              <div key={`cat-${idx}`} className="flex items-center gap-2">
                <Input
                  value={cat}
                  onChange={(e) => updateCategory(idx, e.target.value, activeLanguage)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCategory(idx)}
                  className="text-red-600 border-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {currentFaqs.map((faq, index) => (
            <div key={`faq-${index}`} className="p-4 border rounded-xl bg-white/60">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-700">FAQ #{index + 1}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFaq(index)}
                  className="text-red-600 border-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Câu hỏi</label>
                  <Input
                    value={data[activeLanguage].FaqSection.faqs[index]?.question || ""}
                    onChange={(e) => updateFaq(index, "question", e.target.value, activeLanguage)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <Input
                    value={data[activeLanguage].FaqSection.faqs[index]?.category || ""}
                    onChange={(e) => updateFaq(index, "category", e.target.value, activeLanguage)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trả lời</label>
                  <Textarea
                    rows={3}
                    value={data[activeLanguage].FaqSection.faqs[index]?.answer || ""}
                    onChange={(e) => updateFaq(index, "answer", e.target.value, activeLanguage)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
