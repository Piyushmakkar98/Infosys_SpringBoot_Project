import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPolicies: 3,
    activeClaims: 1,
    totalCoverage: 500000,
    nextPayment: "15 Nov 2024",
  });

  const policies = [
    {
      id: 1,
      type: "Auto Insurance",
      status: "Active",
      premium: "$1,200/year",
      coverage: "$250,000",
      icon: "🚗",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      type: "Home Insurance",
      status: "Active",
      premium: "$800/year",
      coverage: "$200,000",
      icon: "🏠",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      type: "Health Insurance",
      status: "Active",
      premium: "$2,400/year",
      coverage: "$50,000",
      icon: "🏥",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Policy Renewed",
      type: "Auto Insurance",
      date: "2 days ago",
      icon: "✅",
    },
    {
      id: 2,
      action: "Claim Filed",
      type: "Home Insurance",
      date: "1 week ago",
      icon: "📄",
    },
    {
      id: 3,
      action: "Payment Processed",
      type: "Health Insurance",
      date: "2 weeks ago",
      icon: "💳",
    },
  ];

  const quickActions = [
    {
      title: "File a Claim",
      icon: "📋",
      color: "from-red-500 to-red-600",
      action: () => alert("File Claim feature coming soon!"),
    },
    {
      title: "Make Payment",
      icon: "💰",
      color: "from-green-500 to-green-600",
      action: () => alert("Payment feature coming soon!"),
    },
    {
      title: "Get Quote",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      action: () => alert("Quote feature coming soon!"),
    },
    {
      title: "Contact Agent",
      icon: "👤",
      color: "from-purple-500 to-purple-600",
      action: () => alert("Contact feature coming soon!"),
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your insurance today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Policies
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalPolicies}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📄</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Claims
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.activeClaims}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Coverage
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${stats.totalCoverage.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🛡️</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Next Payment
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {stats.nextPayment}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💳</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Policies Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Policies
                </h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${policy.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <span className="text-white text-xl">
                            {policy.icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {policy.type}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Coverage: {policy.coverage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          {policy.status}
                        </span>
                        <p className="text-gray-600 text-sm mt-1">
                          {policy.premium}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium">{action.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.type} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
