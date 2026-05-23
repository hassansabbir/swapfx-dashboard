import React, { useState, useRef } from "react";
import { FiMail, FiPhone, FiCamera } from "react-icons/fi";
import { toast } from "react-hot-toast";
import defaultAvatar from "../../../assets/randomProfile2.jpg";

const UserProfile: React.FC = () => {
  // Tab state: "info" | "password"
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  // Form states for Personal Info
  const [firstName, setFirstName] = useState("Sarah");
  const [lastName, setLastName] = useState("Anderson");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");

  // Form states for Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Avatar Image state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar upload preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      toast.success("Profile picture updated!");
    }
  };

  // Reset/Cancel changes
  const handleCancelInfo = () => {
    setFirstName("Sarah");
    setLastName("Anderson");
    setPhoneNumber("+1 (555) 123-4567");
    toast.success("Changes discarded.");
  };

  // Save changes
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      toast.error("Please fill in all personal information fields.");
      return;
    }
    toast.success("Personal information updated successfully!");
  };

  // Update password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8] flex flex-col justify-start">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        
        {/* Page title and description */}
        <div className="flex flex-col gap-1">
          <h2 className="text-gray-900 font-bold text-2xl">Admin Profile</h2>
          <p className="text-gray-500 text-sm">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card Container (Sarah Anderson) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-6">
          <div className="relative w-28 h-28 shrink-0">
            {/* Avatar image */}
            <img
              src={avatarUrl || defaultAvatar}
              alt="Admin Avatar"
              className="w-full h-full object-cover rounded-full border border-gray-100 shadow-sm"
            />
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            {/* Camera trigger button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#eef0f2] border-2 border-white flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all cursor-pointer shadow-sm"
              title="Upload new image"
            >
              <FiCamera size={14} />
            </button>
          </div>

          <div className="flex flex-col">
            <h3 className="text-gray-900 font-bold text-xl leading-snug">
              {firstName} {lastName}
            </h3>
            <span className="text-gray-400 font-medium text-xs mt-0.5">Administrator</span>

            {/* Email & Contact Row */}
            <div className="flex flex-col gap-1.5 mt-3.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiMail size={13} className="text-gray-400 shrink-0" />
                <span>{firstName.toLowerCase()}.{lastName.toLowerCase()}@company.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiPhone size={13} className="text-gray-400 shrink-0" />
                <span>{phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom tabs menu (Grey pill capsule design) */}
        <div className="flex w-fit bg-[#eef0f2] rounded-full p-1 border border-gray-200">
          <button
            onClick={() => setActiveTab("info")}
            className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all focus:outline-none ${
              activeTab === "info"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all focus:outline-none ${
              activeTab === "password"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Change password
          </button>
        </div>

        {/* TAB CONTENT: Personal Information Form */}
        {activeTab === "info" && (
          <form
            onSubmit={handleSaveInfo}
            className="bg-white rounded-2xl p-8 border border-gray-150 shadow-sm flex flex-col gap-6 animate-scaleUp"
          >
            <div className="flex flex-col gap-1 pb-2 border-b border-gray-100">
              <h4 className="text-gray-950 font-bold text-base">Personal Information</h4>
              <p className="text-gray-400 font-medium text-xs">Update your personal details and information</p>
            </div>

            {/* Input Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-xs">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-xs">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
                />
              </div>
            </div>

            {/* Input Row 2: Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-xs">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
              />
            </div>

            {/* Action buttons bottom right */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={handleCancelInfo}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-xs font-semibold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/15"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* TAB CONTENT: Password & Authentication Form */}
        {activeTab === "password" && (
          <form
            onSubmit={handleUpdatePassword}
            className="bg-white rounded-2xl p-8 border border-gray-150 shadow-sm flex flex-col gap-6 animate-scaleUp"
          >
            <div className="flex flex-col gap-1 pb-2 border-b border-gray-100">
              <h4 className="text-gray-955 font-bold text-base">Password & Authentication</h4>
              <p className="text-gray-400 font-medium text-xs">Manage your password and security settings</p>
            </div>

            {/* Side by side: Current, New, Confirm password inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-xs">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-xs">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-xs">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
                />
              </div>
            </div>

            {/* Action button bottom right */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-xs font-semibold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/15"
              >
                Update Password
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default UserProfile;
