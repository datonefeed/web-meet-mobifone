"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Languages, List } from "lucide-react";
import type { MultilingualData, Plan } from "@/types/content";

interface PricingSectionEditFormProps {
  data: MultilingualData;
  onDataChange: (newData: MultilingualData) => void;
  onSave: () => void;
  saving: boolean;
}

export default function PricingSectionEditForm({
  data,
  onDataChange,
  onSave,
  saving,
}: PricingSectionEditFormProps) {
  const [activeLanguage, setActiveLanguage] = useState<"vi" | "en">("vi");

  const updatePlan = <K extends keyof Plan>(
    index: number,
    field: K,
    value: Plan[K],
    language: "vi" | "en"
  ) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    const plan = newData[language].PricingSection.plans[index];
    plan[field] = value;
    onDataChange(newData);
  };

  const addPlan = () => {
    const viBase: Plan = {
      name: "Gói mới",
      title: "Tiêu đề",
      price: "0",
      period: "đ/tháng",
      features: ["Tính năng 1"],
      buttonText: "Mua ngay",
      popular: false,
    };
    const enBase: Plan = {
      name: "New Plan",
      title: "Title",
      price: "0",
      period: "USD/mo",
      features: ["Feature 1"],
      buttonText: "Buy Now",
      popular: false,
    };
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.PricingSection.plans.push(viBase);
    newData.en.PricingSection.plans.push(enBase);
    onDataChange(newData);
  };

  const removePlan = (index: number) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.PricingSection.plans.splice(index, 1);
    newData.en.PricingSection.plans.splice(index, 1);
    onDataChange(newData);
  };

  const updateMeta = (field: "title" | "included", value: string, language: "vi" | "en") => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData[language].PricingSection[field] = value;
    onDataChange(newData);
  };

  const currentPlans = data[activeLanguage].PricingSection.plans || [];

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
              <List className="h-5 w-5" /> Pricing -{" "}
              {activeLanguage === "vi" ? "Tiếng Việt" : "English"}
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={addPlan} size="sm" className="bg-primary">
                <Plus className="h-4 w-4 mr-2" /> Thêm gói
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <Input
                value={data[activeLanguage].PricingSection.title || ""}
                onChange={(e) => updateMeta("title", e.target.value, activeLanguage)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bao gồm</label>
              <Input
                value={data[activeLanguage].PricingSection.included || ""}
                onChange={(e) => updateMeta("included", e.target.value, activeLanguage)}
              />
            </div>
          </div>

          {currentPlans.map((plan, index) => (
            <div key={`${plan.name}-${index}`} className="p-4 border rounded-xl bg-white/60">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-700">
                  #{index + 1} - {plan.name}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removePlan(index)}
                  className="text-red-600 border-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
                  <Input
                    value={data[activeLanguage].PricingSection.plans[index]?.name || ""}
                    onChange={(e) => updatePlan(index, "name", e.target.value, activeLanguage)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                  <Input
                    value={data[activeLanguage].PricingSection.plans[index]?.title || ""}
                    onChange={(e) => updatePlan(index, "title", e.target.value, activeLanguage)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                  <Input
                    value={data[activeLanguage].PricingSection.plans[index]?.price || ""}
                    onChange={(e) => updatePlan(index, "price", e.target.value, activeLanguage)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chu kỳ</label>
                  <Input
                    value={data[activeLanguage].PricingSection.plans[index]?.period || ""}
                    onChange={(e) => updatePlan(index, "period", e.target.value, activeLanguage)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nút</label>
                  <Input
                    value={data[activeLanguage].PricingSection.plans[index]?.buttonText || ""}
                    onChange={(e) =>
                      updatePlan(index, "buttonText", e.target.value, activeLanguage)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phổ biến</label>
                  <Input
                    value={String(
                      data[activeLanguage].PricingSection.plans[index]?.popular ?? false
                    )}
                    onChange={(e) =>
                      updatePlan(
                        index,
                        "popular",
                        e.target.value.toLowerCase() === "true",
                        activeLanguage
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tính năng</label>
                <Textarea
                  rows={3}
                  value={(data[activeLanguage].PricingSection.plans[index]?.features || []).join(
                    "\n"
                  )}
                  onChange={(e) => {
                    const lines = e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    updatePlan(index, "features", lines, activeLanguage);
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
