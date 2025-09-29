"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit3, RotateCcw, AlertCircle, LayoutGrid, Save } from "lucide-react";
import FeaturesSectionEditForm from "@/components/admin/features-section-edit-form";
import type { MultilingualData } from "@/types/content";
import { useContentManagement } from "@/hooks/useContentManagement";
import DashboardSectionEditForm from "@/components/admin/dashboard-section-edit-form";
import PricingSectionEditForm from "@/components/admin/pricing-section-edit-form";
import FaqSectionEditForm from "@/components/admin/faq-section-edit-form";
import TestimonialsSectionEditForm from "@/components/admin/testimonials-section-edit-form";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

type SectionKey = "features" | "dashboard" | "pricing" | "faq" | "testimonials";

const SECTION_LABELS: Record<SectionKey, string> = {
  features: "Ưu điểm (Features)",
  dashboard: "Bảng điều khiển (Dashboard)",
  pricing: "Bảng giá (Pricing)",
  faq: "Câu hỏi thường gặp (FAQ)",
  testimonials: "Lời chứng thực (Testimonials)",
};

export default function ContentManagement() {
  const { data, setData, loading, saving, loadData, saveData } = useContentManagement();
  const [activeSection, setActiveSection] = useState<SectionKey>("features");

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
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Edit3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Quản lý nội dung đa ngôn ngữ
            </h1>
            <p className="text-gray-600 text-sm lg:text-lg">
              Chỉnh sửa nội dung cho cả tiếng Việt và tiếng Anh
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {/* Reload Button*/}
          <ConfirmDialog
            trigger={
              <Button variant="outline" className="hover:bg-gray-50 border-gray-300">
                <RotateCcw className="h-4 w-4 mr-2" />
                Tải lại
              </Button>
            }
            title="Xác nhận tải lại"
            description="Bạn có chắc chắn muốn tải lại dữ liệu không? Mọi thay đổi chưa lưu sẽ bị mất."
            onConfirm={loadData}
          />

          {/* Save All Button */}
          <ConfirmDialog
            trigger={
              <Button disabled={saving} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Đang lưu..." : "Lưu tất cả"}
              </Button>
            }
            title="Xác nhận lưu tất cả"
            description="Bạn có chắc chắn muốn lưu tất cả thay đổi không? Mọi thay đổi sẽ được cập nhật."
            onConfirm={saveData}
          />
        </div>
      </div>

      {/* Section selector */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <LayoutGrid className="h-5 w-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">
            Chọn phần (section) muốn chỉnh sửa
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SECTION_LABELS) as SectionKey[]).map((key) => (
            <Button
              key={key}
              variant={activeSection === key ? "default" : "outline"}
              onClick={() => setActiveSection(key)}
              className={activeSection === key ? "" : "border-gray-300"}
              size="sm"
            >
              {SECTION_LABELS[key]}
            </Button>
          ))}
        </div>
      </Card>

      {/* Section Forms */}
      {activeSection === "features" && (
        <FeaturesSectionEditForm
          data={data}
          onDataChange={(newData: MultilingualData) => setData(newData)}
          onSave={saveData}
          saving={saving}
        />
      )}
      {activeSection === "dashboard" && (
        <DashboardSectionEditForm
          data={data}
          onDataChange={(newData: MultilingualData) => setData(newData)}
          onSave={saveData}
          saving={saving}
        />
      )}
      {activeSection === "pricing" && (
        <PricingSectionEditForm
          data={data}
          onDataChange={(newData: MultilingualData) => setData(newData)}
          onSave={saveData}
          saving={saving}
        />
      )}
      {activeSection === "faq" && (
        <FaqSectionEditForm
          data={data}
          onDataChange={(newData: MultilingualData) => setData(newData)}
          onSave={saveData}
          saving={saving}
        />
      )}
      {activeSection === "testimonials" && (
        <TestimonialsSectionEditForm
          data={data}
          onDataChange={(newData: MultilingualData) => setData(newData)}
          onSave={saveData}
          saving={saving}
        />
      )}
    </div>
  );
}
