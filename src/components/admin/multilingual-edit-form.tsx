"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Save, Plus, Trash2, Languages, Globe } from "lucide-react";

type Feature = {
  number: string;
  title: string;
  description: string;
  bgColor: string;
};

type LanguageData = {
  FeaturesSection: {
    title: string;
    description: string;
    features: Feature[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type MultilingualData = {
  vi: LanguageData;
  en: LanguageData;
};

interface MultilingualEditFormProps {
  data: MultilingualData;
  onDataChange: (newData: MultilingualData) => void;
  onSave: () => void;
  saving: boolean;
}

export default function MultilingualEditForm({
  data,
  onDataChange,
  onSave,
  saving,
}: MultilingualEditFormProps) {
  const [editingFeature, setEditingFeature] = useState<number | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<"vi" | "en">("vi");

  const updateFeature = (
    index: number,
    field: keyof Feature,
    value: string,
    language: "vi" | "en"
  ) => {
    const newData = { ...data };
    newData[language].FeaturesSection.features[index] = {
      ...newData[language].FeaturesSection.features[index],
      [field]: value,
    };
    onDataChange(newData);
  };

  const updateSectionInfo = (
    field: "title" | "description",
    value: string,
    language: "vi" | "en"
  ) => {
    const newData = { ...data };
    newData[language].FeaturesSection[field] = value;
    onDataChange(newData);
  };

  const addFeature = () => {
    try {
      const viFeatures = data.vi.FeaturesSection.features;
      const newNumber = String(viFeatures.length + 1).padStart(2, "0");

      const newViFeature: Feature = {
        number: newNumber,
        title: "Tính năng mới",
        description: "Mô tả tính năng",
        bgColor: "bg-blue-400",
      };

      const newEnFeature: Feature = {
        number: newNumber,
        title: "New Feature",
        description: "Feature description",
        bgColor: "bg-blue-400",
      };

      const newData = { ...data };
      newData.vi.FeaturesSection.features.push(newViFeature);
      newData.en.FeaturesSection.features.push(newEnFeature);
      onDataChange(newData);
      alert("Đã thêm tính năng mới. Vui lòng chỉnh sửa thông tin và lưu lại.");
    } catch (error) {
      alert("Đã xảy ra lỗi khi thêm tính năng mới.");
      console.error("Error adding new feature:", error);
    }
  };

  const removeFeature = (index: number) => {
    const newData = { ...data };
    newData.vi.FeaturesSection.features.splice(index, 1);
    newData.en.FeaturesSection.features.splice(index, 1);

    // Cập nhật lại số thứ tự
    newData.vi.FeaturesSection.features.forEach((feature, i) => {
      feature.number = String(i + 1).padStart(2, "0");
    });
    newData.en.FeaturesSection.features.forEach((feature, i) => {
      feature.number = String(i + 1).padStart(2, "0");
    });

    onDataChange(newData);
  };

  const colorOptions = [
    "bg-orange-400",
    "bg-blue-400",
    "bg-teal-500",
    "bg-green-400",
    "bg-purple-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-indigo-400",
  ];

  const currentFeatures = data[activeLanguage]?.FeaturesSection?.features || [];

  return (
    <div className="space-y-8">
      {/* Language Tabs */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Chọn ngôn ngữ chỉnh sửa
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={activeLanguage === "vi" ? "default" : "outline"}
              onClick={() => setActiveLanguage("vi")}
              className="flex items-center gap-2"
            >
              🇻🇳 Tiếng Việt
            </Button>
            <Button
              variant={activeLanguage === "en" ? "default" : "outline"}
              onClick={() => setActiveLanguage("en")}
              className="flex items-center gap-2"
            >
              🇺🇸 English
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Section Info Edit */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Thông tin Section - {activeLanguage === "vi" ? "Tiếng Việt" : "English"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Section</label>
            <Input
              value={data[activeLanguage]?.FeaturesSection?.title || ""}
              onChange={(e) => updateSectionInfo("title", e.target.value, activeLanguage)}
              placeholder={activeLanguage === "vi" ? "Nhập tiêu đề section" : "Enter section title"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả Section</label>
            <Textarea
              value={data[activeLanguage]?.FeaturesSection?.description || ""}
              onChange={(e) => updateSectionInfo("description", e.target.value, activeLanguage)}
              placeholder={
                activeLanguage === "vi" ? "Nhập mô tả section" : "Enter section description"
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Danh sách tính năng - {activeLanguage === "vi" ? "Tiếng Việt" : "English"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                Quản lý các tính năng nổi bật của sản phẩm ({currentFeatures.length} tính năng)
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={addFeature}
                size="sm"
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-blue-500/25"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm tính năng
              </Button>
              <Button
                onClick={onSave}
                disabled={saving}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Đang lưu..." : "Lưu tất cả"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 border-2 border-gray-200 hover:border-blue-300 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {feature.number}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">
                        Tính năng #{feature.number} -{" "}
                        {activeLanguage === "vi" ? "Tiếng Việt" : "English"}
                      </span>
                      {editingFeature === index && (
                        <span className="ml-2 text-xs bg-primary text-white px-3 py-1 rounded-full">
                          Đang chỉnh sửa
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={editingFeature === index ? "default" : "outline"}
                      onClick={() => setEditingFeature(editingFeature === index ? null : index)}
                      className={
                        editingFeature === index
                          ? "bg-primary hover:from-blue-600 hover:to-purple-700"
                          : "border-gray-300 hover:border-blue-400"
                      }
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {editingFeature === index ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Vietnamese */}
                      <div className="space-y-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                        <h4 className="font-semibold text-blue-700 flex items-center gap-2">
                          🇻🇳 Tiếng Việt
                        </h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tiêu đề
                          </label>
                          <Input
                            value={data.vi.FeaturesSection.features[index]?.title || ""}
                            onChange={(e) => updateFeature(index, "title", e.target.value, "vi")}
                            placeholder="Nhập tiêu đề tính năng"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả
                          </label>
                          <Textarea
                            value={data.vi.FeaturesSection.features[index]?.description || ""}
                            onChange={(e) =>
                              updateFeature(index, "description", e.target.value, "vi")
                            }
                            placeholder="Nhập mô tả tính năng"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* English */}
                      <div className="space-y-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                        <h4 className="font-semibold text-green-700 flex items-center gap-2">
                          🇺🇸 English
                        </h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <Input
                            value={data.en.FeaturesSection.features[index]?.title || ""}
                            onChange={(e) => updateFeature(index, "title", e.target.value, "en")}
                            placeholder="Enter feature title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <Textarea
                            value={data.en.FeaturesSection.features[index]?.description || ""}
                            onChange={(e) =>
                              updateFeature(index, "description", e.target.value, "en")
                            }
                            placeholder="Enter feature description"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Màu nền (áp dụng cho cả hai ngôn ngữ)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              updateFeature(index, "bgColor", color, "vi");
                              updateFeature(index, "bgColor", color, "en");
                            }}
                            className={`w-8 h-8 rounded ${color} border-2 ${
                              feature.bgColor === color ? "border-gray-800" : "border-gray-300"
                            }`}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vietnamese Preview */}
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                        🇻🇳 {data.vi.FeaturesSection.features[index]?.title || "Chưa có tiêu đề"}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {data.vi.FeaturesSection.features[index]?.description || "Chưa có mô tả"}
                      </p>
                    </div>

                    {/* English Preview */}
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        🇺🇸 {data.en.FeaturesSection.features[index]?.title || "No title"}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {data.en.FeaturesSection.features[index]?.description || "No description"}
                      </p>
                    </div>

                    {/* Color Preview */}
                    <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Màu nền:</span>
                      <div className={`w-4 h-4 rounded ${feature.bgColor}`} />
                      <span className="text-xs text-gray-500">{feature.bgColor}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
