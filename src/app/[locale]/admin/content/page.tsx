"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit3, RotateCcw, AlertCircle } from "lucide-react";
import MultilingualEditForm from "@/components/admin/multilingual-edit-form";

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

export default function ContentManagement() {
  const [data, setData] = useState<MultilingualData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/admin/content");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Đã lưu thành công!");
      } else {
        alert("Có lỗi xảy ra khi lưu!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Có lỗi xảy ra khi lưu!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <div className="text-lg text-gray-600">Không thể tải dữ liệu</div>
          <Button onClick={loadData} className="mt-4">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Edit3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Quản lý nội dung đa ngôn ngữ
            </h1>
            <p className="text-gray-600 text-lg">
              Chỉnh sửa nội dung cho cả tiếng Việt và tiếng Anh
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={loadData}
            disabled={loading}
            className="hover:bg-gray-50 border-gray-300"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Tải lại
          </Button>
        </div>
      </div>

      {/* Multilingual Edit Form */}
      <MultilingualEditForm data={data} onDataChange={setData} onSave={saveData} saving={saving} />
    </div>
  );
}
