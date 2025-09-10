"use client";

import type React from "react";

import Image from "next/image";
import { TiltCard } from "./tilt-card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PictureTiltCardProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  maxWidth?: number;
  maxHeight?: number;
  priority?: boolean;
}

export function PictureTiltCard({
  src,
  alt,
  className,
  imageClassName,
  maxWidth = 600,
  maxHeight = 450,
  priority = false,
}: PictureTiltCardProps) {
  const [imageDimensions, setImageDimensions] = useState({ width: maxWidth, height: maxHeight });

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;

    // Calculate aspect ratio and scale to fit within max dimensions
    const aspectRatio = naturalWidth / naturalHeight;
    let scaledWidth = naturalWidth;
    let scaledHeight = naturalHeight;

    if (scaledWidth > maxWidth) {
      scaledWidth = maxWidth;
      scaledHeight = scaledWidth / aspectRatio;
    }

    if (scaledHeight > maxHeight) {
      scaledHeight = maxHeight;
      scaledWidth = scaledHeight * aspectRatio;
    }

    setImageDimensions({ width: Math.round(scaledWidth), height: Math.round(scaledHeight) });
  };

  return (
    <TiltCard className={cn("w-fit", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={imageDimensions.width}
        height={imageDimensions.height}
        priority={priority}
        onLoad={handleImageLoad}
        className={cn("object-cover transition-transform duration-300 rounded-lg", imageClassName)}
      />
    </TiltCard>
  );
}
