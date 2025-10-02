"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Smartphone, Tablet, Monitor } from "lucide-react";

export default function PreviewPage() {
  const [size, setSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const sizes = {
    mobile: "w-[375px] h-[667px]",
    tablet: "w-[768px] h-[1024px]",
    desktop: "w-[1280px] h-[800px]",
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex space-x-2">
        <Button
          size="icon"
          variant={size === "mobile" ? "default" : "outline"}
          onClick={() => setSize("mobile")}
        >
          <Smartphone className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant={size === "tablet" ? "default" : "outline"}
          onClick={() => setSize("tablet")}
        >
          <Tablet className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant={size === "desktop" ? "default" : "outline"}
          onClick={() => setSize("desktop")}
        >
          <Monitor className="h-5 w-5" />
        </Button>
      </div>

      {/* Preview container */}
      <div
        className={cn(
          "border shadow-xl overflow-hidden rounded-lg bg-white transition-all duration-300",
          sizes[size]
        )}
      >
        <iframe src="/" className="w-full h-full" />
      </div>
    </div>
  );
}
