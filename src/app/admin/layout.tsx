"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Settings, Menu, X } from "lucide-react";
import { Toaster } from "sonner";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý nội dung",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transform transition-all duration-300 ease-in-out flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center">
              <img src="/images/icon.png" alt="Meet logo" />
            </div>
            <h1 className="text-xl font-bold text-white">Meet Admin</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-300 hover:text-white hover:bg-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-8 px-3 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out",
                    isActive
                      ? "bg-gradient-to-r bg-primary text-white shadow-lg shadow-blue-500/25 transform scale-105"
                      : "text-gray-300 hover:text-white hover:bg-slate-700/50 hover:transform hover:scale-105"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* <div className="absolute bottom-0 w-full p-3">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
            <LogOut className="mr-3 h-4 w-4" />
            Đăng xuất
          </Button>
        </div> */}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:w-0">
        {/* Top header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <div className="flex-1 lg:ml-0 ml-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Quản trị nội dung Website
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">D</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Thanh Dat</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <Toaster richColors position="top-right" />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
