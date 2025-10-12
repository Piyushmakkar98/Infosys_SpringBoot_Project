import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
  });

  // ------------------- Fetch profile -------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/profile", { withCredentials: true });
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          dateOfBirth: res.data.dateOfBirth || "",
          occupation: res.data.occupation || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // ------------------- Handle form -------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:8080/auth/profile", formData, { withCredentials: true });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };
  const profileStats = [
    { label: "Active Policies", value: "3", icon: "📄" },
    { label: "Total Claims", value: "12", icon: "📋" },
    { label: "Years with us", value: "2", icon: "🗓️" },
    { label: "Savings", value: "$2,400", icon: "💰" },
  ];

  const activityLog = [
    { action: "Policy Renewal", date: "2024-10-01", status: "Completed" },
    { action: "Claim Filed", date: "2024-09-15", status: "Processing" },
    { action: "Payment Made", date: "2024-09-01", status: "Completed" },
    { action: "Profile Updated", date: "2024-08-20", status: "Completed" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {formData.name || "User"}
                    </h2>
                    <p className="text-blue-100">{user?.email}</p>
                    <p className="text-blue-200 text-sm">
                      Member since October 2022
                    </p>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                          !isEditing ? "bg-gray-50" : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                          !isEditing ? "bg-gray-50" : "bg-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                          !isEditing ? "bg-gray-50" : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                        !isEditing ? "bg-gray-50" : "bg-white"
                      }`}
                    />
                  </div>


                  {isEditing && (
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Profile Stats
              </h3>
              <div className="space-y-4">
                {profileStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className="text-gray-700">{stat.label}</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-2xl">🔒</span>
                  <span>Change Password</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <span>Download Policies</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-2xl">⚙️</span>
                  <span>Notification Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                >
                  <span className="text-2xl">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {activityLog.map((activity, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-3 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {activity.date}
                    </p>
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

export default Profile;
