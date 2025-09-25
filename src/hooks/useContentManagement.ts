import { useState, useEffect } from "react";
import type { MultilingualData } from "@/types/content";

export function useContentManagement() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Save failed");
      alert("Đã lưu thành công!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Có lỗi xảy ra khi lưu!");
    } finally {
      setSaving(false);
    }
  };

  return { data, setData, loading, saving, loadData, saveData };
}
