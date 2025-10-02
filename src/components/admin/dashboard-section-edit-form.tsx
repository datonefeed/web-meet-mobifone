"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Languages, LayoutList } from "lucide-react";
import type { MultilingualData, DashboardFeature } from "@/types/content";
import LanguageTabs from "./LanguageTabs";
import ConfirmDialog from "./ConfirmDialog";

interface DashboardSectionEditFormProps {
  data: MultilingualData;
  onDataChange: (newData: MultilingualData) => void;
  onSave: () => void;
  saving: boolean;
}

export default function DashboardSectionEditForm({
  data,
  onDataChange,
  onSave,
  saving,
}: DashboardSectionEditFormProps) {
  const [activeLanguage, setActiveLanguage] = useState<"vi" | "en">("vi");

  const currentItems = data[activeLanguage].DashboardSection.features || [];

  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const updateItem = (
    index: number,
    field: keyof DashboardFeature,
    value: string,
    language: "vi" | "en"
  ) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData[language].DashboardSection.features[index] = {
      ...newData[language].DashboardSection.features[index],
      [field]: value,
    } as DashboardFeature;
    onDataChange(newData);
  };

  const addItem = () => {
    const viItems = data.vi.DashboardSection.features;
    const nextIndex = viItems.length + 1;
    const newId = `item-${nextIndex}`;

    const base: DashboardFeature = {
      id: newId,
      label: "New label",
      title: "New title",
      description: "Description",
      image: "/images/call-video-mock.png",
    };

    const baseVi: DashboardFeature = {
      ...base,
      label: "Tính năng",
      title: "Tiêu đề",
      description: "Mô tả",
    };

    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.DashboardSection.features.push(baseVi);
    newData.en.DashboardSection.features.push(base);
    onDataChange(newData);

    setLastAddedId(newId);

    setTimeout(() => setLastAddedId(null), 1500);
  };

  const removeItem = async (index: number) => {
    // Lấy ảnh của item
    const imageUrl = data.vi.DashboardSection.features[index]?.image;
    if (imageUrl) {
      const filename = imageUrl.split("/").pop();
      if (filename) {
        await fetch(`/api/admin/files?filename=${filename}`, {
          method: "DELETE",
        });
      }
    }

    // Xóa trong state
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    newData.vi.DashboardSection.features.splice(index, 1);
    newData.en.DashboardSection.features.splice(index, 1);
    onDataChange(newData);
  };

  return (
    <div className="space-y-6">
      {/* Language Tabs */}
      <LanguageTabs activeLanguage={activeLanguage} onChange={setActiveLanguage} />
      {/* Header with Add and Save buttons */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-col md:flex-row">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <LayoutList className="h-5 w-5" /> Dashboard -{" "}
              {activeLanguage === "vi" ? "Tiếng Việt" : "English"}
            </CardTitle>
            <div className="flex gap-2">
              {/* Add Button */}
              <Button onClick={addItem} size="sm" className="bg-primary">
                <Plus className="h-4 w-4 mr-2" /> Thêm mục
              </Button>

              {/* Save Button */}
              <ConfirmDialog
                trigger={
                  <Button disabled={saving} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                }
                title="Xác nhận lưu thay đổi"
                description="Bạn có chắc chắn muốn lưu thay đổi không? Mọi thay đổi sẽ được cập nhật."
                onConfirm={onSave}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col-reverse">
          {currentItems.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 border rounded-xl bg-white/60 transition 
    ${lastAddedId === item.id ? "animate-pulse border-primary bg-green-50" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-700">
                  #{currentItems.length - index - 1} {item.id}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 border-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <Input
                    value={data[activeLanguage].DashboardSection.features[index]?.label || ""}
                    onChange={(e) => updateItem(index, "label", e.target.value, activeLanguage)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={data[activeLanguage].DashboardSection.features[index]?.title || ""}
                    onChange={(e) => updateItem(index, "title", e.target.value, activeLanguage)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    rows={3}
                    value={data[activeLanguage].DashboardSection.features[index]?.description || ""}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value, activeLanguage)
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>

                  {/* Upload ảnh */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append("file", file);

                      const res = await fetch("/api/admin/files", {
                        method: "POST",
                        body: formData,
                      });

                      const result = await res.json();
                      if (result.url) {
                        updateItem(index, "image", result.url, activeLanguage);
                      }
                    }}
                  />

                  {/* Preview ảnh */}
                  {data[activeLanguage].DashboardSection.features[index]?.image && (
                    <img
                      src={data[activeLanguage].DashboardSection.features[index]?.image}
                      alt="preview"
                      className="mt-2 h-24 object-contain border rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
