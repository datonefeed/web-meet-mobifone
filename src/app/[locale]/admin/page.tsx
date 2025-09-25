import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Users, Activity, TrendingUp, Edit3, Eye, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Tổng nội dung",
      value: "12",
      description: "Sections đang quản lý",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Lần cập nhật cuối",
      value: "2 ngày",
      description: "Trước đây",
      icon: Activity,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Lượt truy cập",
      value: "1.2K",
      description: "Tháng này",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Tỷ lệ tương tác",
      value: "3.2%",
      description: "Tăng 12% so với tháng trước",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const quickActions = [
    {
      title: "Chỉnh sửa nội dung",
      description: "Cập nhật nội dung landing page",
      href: "/admin/content",
      icon: Edit3,
      color: "bg-primary hover:bg-primary/50",
    },
    {
      title: "Xem website",
      description: "Xem trang web hiện tại",
      href: "/admin/preview",
      icon: Eye,
      color: "bg-primary hover:bg-primary/50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Tổng quan quản trị website MobiFone Meet</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Thao tác nhanh</CardTitle>
          <CardDescription className="text-gray-600">Các tính năng thường sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <div className="group relative overflow-hidden rounded-xl border-2 border-primary/20 hover:border-transparent hover:shadow-xl transition-all duration-300 p-6 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Hoạt động gần đây</CardTitle>
          <CardDescription className="text-gray-600">Lịch sử thay đổi nội dung</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl hover:bg-primary/20 cursor-pointer transition-all duration-300 border border-primary/20">
              <div className="p-3 bg-primary rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Cập nhật section Features</p>
                <p className="text-sm text-gray-600">2 ngày trước</p>
              </div>
            </div>
            <div className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-50/50from-blue-50 to-blue-50/50 rounded-xl hover:bg-primary/20 cursor-pointer transition-all duration-300 border border-primary/20">
              <div className="p-3 bg-primary rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Edit3 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Thay đổi nội dung Hero section
                </p>
                <p className="text-sm text-gray-600">5 ngày trước</p>
              </div>
            </div>
            <div className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl hover:bg-primary/20 cursor-pointer transition-all duration-300 border border-primary/20">
              <div className="p-3 bg-primary rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Cập nhật thông tin pricing</p>
                <p className="text-sm text-gray-600">1 tuần trước</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
