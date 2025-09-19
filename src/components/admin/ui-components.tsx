"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type AlertType = "info" | "success" | "warning" | "error";

type AlertProps = {
  type: AlertType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

const alertStyles = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: Info,
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    descColor: "text-blue-700",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
    titleColor: "text-green-800",
    descColor: "text-green-700",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-800",
    descColor: "text-yellow-700",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertCircle,
    iconColor: "text-red-600",
    titleColor: "text-red-800",
    descColor: "text-red-700",
  },
};

export function Alert({ type, title, description, action }: AlertProps) {
  const style = alertStyles[type];
  const Icon = style.icon;

  return (
    <div className={`rounded-lg border p-4 ${style.bg} ${style.border}`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 mt-0.5 ${style.iconColor}`} />
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${style.titleColor}`}>{title}</h3>
          {description && <p className={`mt-1 text-sm ${style.descColor}`}>{description}</p>}
          {action && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={action.onClick}
                className={`border-current ${style.titleColor} hover:bg-white/20`}
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
};

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary ${sizeClasses[size]}`}
      />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
}

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: "blue" | "green" | "purple" | "orange" | "red";
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
}: StatsCardProps) {
  const colorStyles = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
    orange: "text-orange-600 bg-orange-100",
    red: "text-red-600 bg-red-100",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {Icon && (
          <div className={`p-2 rounded-full ${colorStyles[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}
