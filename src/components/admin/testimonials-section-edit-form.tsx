"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, MessageSquareText, User, Edit3 } from "lucide-react";
import type { MultilingualData, Testimonial } from "@/types/content";
import LanguageTabs from "./LanguageTabs";
import ConfirmDialog from "./ConfirmDialog";

interface TestimonialsSectionEditFormProps {
  data: MultilingualData;
  onDataChange: (newData: MultilingualData) => void;
  onSave: () => void;
  saving: boolean;
}

export default function TestimonialsSectionEditForm({
  data,
  onDataChange,
  onSave,
  saving,
}: TestimonialsSectionEditFormProps) {
  const [activeLanguage, setActiveLanguage] = useState<"vi" | "en">("vi");
  const [editingTestimonial, setEditingTestimonial] = useState<number | null>(null);

  const currentSection = data[activeLanguage].TestimonialsSection;
  const currentTestimonials = currentSection?.testimonials || [];

  const updateSectionInfo = (
    field: "title" | "titleHighlight" | "description",
    value: string,
    language: "vi" | "en"
  ) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    if (!newData[language].TestimonialsSection) {
      newData[language].TestimonialsSection = {
        title: "",
        titleHighlight: "",
        description: "",
        testimonials: [],
      };
    }
    newData[language].TestimonialsSection[field] = value;
    onDataChange(newData);
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string | number,
    language: "vi" | "en"
  ) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    if (!newData[language].TestimonialsSection) {
      newData[language].TestimonialsSection = {
        title: "",
        titleHighlight: "",
        description: "",
        testimonials: [],
      };
    }
    newData[language].TestimonialsSection.testimonials[index] = {
      ...newData[language].TestimonialsSection.testimonials[index],
      [field]: value,
    };
    onDataChange(newData);
  };

  const addTestimonial = () => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));

    if (!newData.vi.TestimonialsSection) {
      newData.vi.TestimonialsSection = {
        title: "Khách hàng đã nói gì về",
        titleHighlight: "Meet",
        description: "Lắng nghe trải nghiệm của khách hàng tin dùng sản phẩm.",
        testimonials: [],
      };
    }
    if (!newData.en.TestimonialsSection) {
      newData.en.TestimonialsSection = {
        title: "What customers say about",
        titleHighlight: "Meet",
        description: "Hear the experiences of customers who trust our product.",
        testimonials: [],
      };
    }

    const maxId = Math.max(
      ...newData.vi.TestimonialsSection.testimonials.map((t) => t.id),
      ...newData.en.TestimonialsSection.testimonials.map((t) => t.id),
      0
    );

    const newTestimonial: Testimonial = {
      id: maxId + 1,
      name: "Tên khách hàng",
      title: "Chức vụ",
      company: "Công ty",
      content: "Nội dung đánh giá...",
      avatar: "/images/professional-woman-avatar.png",
    };

    const newTestimonialEn: Testimonial = {
      id: maxId + 1,
      name: "Customer Name",
      title: "Position",
      company: "Company",
      content: "Review content...",
      avatar: "/images/professional-woman-avatar.png",
    };

    newData.vi.TestimonialsSection.testimonials.push(newTestimonial);
    newData.en.TestimonialsSection.testimonials.push(newTestimonialEn);
    onDataChange(newData);
    setEditingTestimonial(newData.vi.TestimonialsSection.testimonials.length - 1);
  };

  const deleteTestimonial = (index: number) => {
    const newData: MultilingualData = JSON.parse(JSON.stringify(data));
    if (newData.vi.TestimonialsSection) {
      newData.vi.TestimonialsSection.testimonials.splice(index, 1);
    }
    if (newData.en.TestimonialsSection) {
      newData.en.TestimonialsSection.testimonials.splice(index, 1);
    }
    onDataChange(newData);
    if (editingTestimonial === index) {
      setEditingTestimonial(null);
    } else if (editingTestimonial !== null && editingTestimonial > index) {
      setEditingTestimonial(editingTestimonial - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Language Tabs */}
      <LanguageTabs activeLanguage={activeLanguage} onChange={setActiveLanguage} />
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <MessageSquareText className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-bold text-gray-900">
              Quản lý Section Testimonials
            </CardTitle>
          </div>
          <div className="flex gap-2">
            {/* Save Button */}
            <ConfirmDialog
              trigger={
                <Button disabled={saving} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Đang lưu..." : "Lưu"}
                </Button>
              }
              title="Xác nhận lưu thay đổi"
              description="Bạn có chắc chắn muốn lưu thay đổi không? Mọi thay đổi sẽ được cập nhật."
              onConfirm={onSave}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Section Info */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Thông tin chung Section ({activeLanguage.toUpperCase()})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề chính
                </label>
                <Input
                  value={currentSection?.title || ""}
                  onChange={(e) => updateSectionInfo("title", e.target.value, activeLanguage)}
                  placeholder="Khách hàng đã nói gì về"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề nổi bật
                </label>
                <Input
                  value={currentSection?.titleHighlight || ""}
                  onChange={(e) =>
                    updateSectionInfo("titleHighlight", e.target.value, activeLanguage)
                  }
                  placeholder="Meet"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <Textarea
                value={currentSection?.description || ""}
                onChange={(e) => updateSectionInfo("description", e.target.value, activeLanguage)}
                placeholder="Lắng nghe trải nghiệm của khách hàng tin dùng sản phẩm."
                rows={2}
              />
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Testimonials ({activeLanguage.toUpperCase()})
              </h3>
              <Button
                onClick={addTestimonial}
                size="sm"
                variant="outline"
                className="bg-primary text-white hover:bg-primary/90 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm Testimonial
              </Button>
            </div>

            <div className=" gap-4 flex flex-col-reverse">
              {currentTestimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Testimonial #{testimonial.id}
                        </span>
                        {editingTestimonial === index && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Đang chỉnh sửa
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() =>
                            setEditingTestimonial(editingTestimonial === index ? null : index)
                          }
                          size="sm"
                          variant="outline"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteTestimonial(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {editingTestimonial === index && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên
                          </label>
                          <Input
                            value={testimonial.name}
                            onChange={(e) =>
                              updateTestimonial(index, "name", e.target.value, activeLanguage)
                            }
                            placeholder="Tên khách hàng"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Chức vụ
                          </label>
                          <Input
                            value={testimonial.title}
                            onChange={(e) =>
                              updateTestimonial(index, "title", e.target.value, activeLanguage)
                            }
                            placeholder="CEO, CTO, Manager..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Công ty
                          </label>
                          <Input
                            value={testimonial.company}
                            onChange={(e) =>
                              updateTestimonial(index, "company", e.target.value, activeLanguage)
                            }
                            placeholder="Tên công ty"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Avatar URL
                          </label>
                          <Input
                            value={testimonial.avatar}
                            onChange={(e) =>
                              updateTestimonial(index, "avatar", e.target.value, activeLanguage)
                            }
                            placeholder="/images/avatar.png"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nội dung đánh giá
                        </label>
                        <Textarea
                          value={testimonial.content}
                          onChange={(e) =>
                            updateTestimonial(index, "content", e.target.value, activeLanguage)
                          }
                          placeholder="Nội dung đánh giá của khách hàng..."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  )}

                  {editingTestimonial !== index && (
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>{testimonial.name}</strong> - {testimonial.title} tại{" "}
                          {testimonial.company}
                        </p>
                        <p className="mt-1 line-clamp-2">{testimonial.content}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {currentTestimonials.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageSquareText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Chưa có testimonial nào. Nhấn &ldquo;Thêm Testimonial&rdquo; để bắt đầu.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
