"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";

type FormField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number";
  value: string | number;
};

type EditFormProps = {
  title: string;
  fields: FormField[];
  onSave: (data: Record<string, string | number>) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function EditForm({ title, fields, onSave, onCancel, isLoading = false }: EditFormProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    fields.reduce(
      (acc, field) => {
        acc[field.key] = field.value;
        return acc;
      },
      {} as Record<string, string | number>
    )
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (key: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <Textarea
                  value={formData[field.key] as string}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  rows={3}
                />
              ) : (
                <Input
                  type={field.type}
                  value={formData[field.key] as string}
                  onChange={(e) =>
                    handleInputChange(
                      field.key,
                      field.type === "number" ? Number(e.target.value) : e.target.value
                    )
                  }
                />
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
