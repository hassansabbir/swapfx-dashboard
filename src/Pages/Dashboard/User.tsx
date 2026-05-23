import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronDown, FiPaperclip, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface UserData {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  swap: number;
  status: "Active" | "Ban" | "Suspend" | "Hide";
}

const generateDummyData = (): UserData[] => {
  const data: UserData[] = [
    {
      key: "1",
      id: "01",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Active",
    },
    {
      key: "2",
      id: "02",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Ban",
    },
    {
      key: "3",
      id: "03",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Suspend",
    },
  ];

  const countries = ["Bangladesh", "Pakistan", "United States", "China", "Canada"];
  const statuses: ("Active" | "Ban" | "Suspend" | "Hide")[] = [
    "Active",
    "Ban",
    "Suspend",
    "Hide",
  ];

  for (let i = 4; i <= 95; i++) {
    const randomCountry = countries[i % countries.length];
    const randomStatus = statuses[i % statuses.length];
    const paddedId = String(i).padStart(2, "0");
    data.push({
      key: String(i),
      id: paddedId,
      name: i % 3 === 0 ? "Md Shakir Ahmed" : `User ${i}`,
      email: i % 3 === 0 ? "Shakir.Uxui@Gmail.Com" : `user${i}@example.com`,
      phone: `+88801333${40000 + i}`,
      country: randomCountry,
      swap: 10 + (i % 50),
      status: randomStatus,
    });
  }
  return data;
};

const SwapperDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allSwappers = generateDummyData();
  const swapper = allSwappers.find((s) => s.key === id) || allSwappers[0];

  // View state transitions: details | manage | contact | success
  const [view, setView] = useState<"details" | "manage" | "contact" | "success">("details");
  const [activeTab, setActiveTab] = useState<"swap" | "fee">("swap");

  // Manage form fields states
  const [swapLimit, setSwapLimit] = useState("2");
  const [swapAmount, setSwapAmount] = useState("1234");
  const [platformFee, setPlatformFee] = useState("$50");
  const [safetyShield, setSafetyShield] = useState("$50");

  // Contact form fields states
  const [messageText, setMessageText] = useState("");
  const [subjectText, setSubjectText] = useState("Re: Password Change Problem");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSetSwap = () => {
    toast.success("Swap limits and amount updated successfully!");
  };

  const handleSaveFee = () => {
    toast.success("Platform fee and safety shield saved successfully!");
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Please write a message before sending.");
      return;
    }
    // Transition to success screen
    setView("success");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      toast.success(`Attached file: ${file.name}`);
    }
  };

  // Manage View
  if (view === "manage") {
    return (
      <div className="p-6 min-h-full bg-[#f1f1f9]">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setView("details")}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer shadow-sm focus:outline-none"
          >
            <FiChevronLeft size={22} className="mr-0.5" />
          </button>
          <span className="text-[17px] font-semibold text-[#4E4E4E]">
            Manage
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-[#FeFeFe] p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[460px] flex flex-col items-center">
          {/* Centered Tab Selector */}
          <div className="flex gap-8 justify-center mb-10 border-b border-gray-100 w-full max-w-md pb-3 relative">
            <button
              onClick={() => setActiveTab("swap")}
              className={`pb-1 text-sm font-semibold transition-all relative ${
                activeTab === "swap" ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Swap
              {activeTab === "swap" && (
                <div className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("fee")}
              className={`pb-1 text-sm font-semibold transition-all relative ${
                activeTab === "fee" ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Fee
              {activeTab === "fee" && (
                <div className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
              )}
            </button>
          </div>

          {/* Form Fields Content */}
          <div className="w-full max-w-sm flex flex-col gap-6 mt-4">
            {activeTab === "swap" ? (
              <>
                {/* Swap Limits */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#4E4E4E] font-medium text-[13px]">
                    Swap Limits
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={swapLimit}
                      onChange={(e) => setSwapLimit(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 flex flex-col justify-center pr-3 pointer-events-none text-gray-400">
                      <FiChevronDown size={14} className="rotate-180 mb-0.5" />
                      <FiChevronDown size={14} />
                    </div>
                  </div>
                </div>

                {/* Swap Amount */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#4E4E4E] font-medium text-[13px]">
                    Swap Amount
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                      className="w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-gray-300 pointer-events-none">
                      PKR
                    </span>
                  </div>
                </div>

                {/* Set Button */}
                <button
                  onClick={handleSetSwap}
                  className="w-full mt-4 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm"
                >
                  Set
                </button>
              </>
            ) : (
              <>
                {/* Platform Fee */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#4E4E4E] font-medium text-[13px]">
                    Platform Fee
                  </label>
                  <input
                    type="text"
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                  />
                </div>

                {/* Safety Shield */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#4E4E4E] font-medium text-[13px]">
                    Safety Shield
                  </label>
                  <input
                    type="text"
                    value={safetyShield}
                    onChange={(e) => setSafetyShield(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveFee}
                  className="w-full mt-4 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Contact / Support View
  if (view === "contact") {
    return (
      <div className="p-6 min-h-full bg-[#f1f1f9] flex flex-col justify-start">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Support Header */}
        <div className="flex items-center justify-between mb-6 w-full max-w-4xl mx-auto px-1">
          <span className="text-[17px] font-semibold text-[#4E4E4E] mx-auto translate-x-4">
            Support
          </span>
          <button
            onClick={() => setView("details")}
            className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center hover:bg-gray-500 transition-all focus:outline-none shadow-sm"
            title="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Message Panel Box */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-4xl mx-auto flex flex-col min-h-[460px] overflow-hidden">
          {/* Form Rows */}
          <div className="px-6 py-4 flex flex-col flex-1">
            {/* To row */}
            <div className="flex items-center py-3.5 border-b border-gray-100">
              <span className="text-gray-400 font-medium text-sm w-20 shrink-0">To:</span>
              <span className="text-[#4E4E4E] font-medium text-sm">fahimahmed7890</span>
            </div>

            {/* Subject row */}
            <div className="flex items-center py-3.5 border-b border-gray-100">
              <span className="text-gray-400 font-medium text-sm w-20 shrink-0">Subject:</span>
              <input
                type="text"
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
                className="text-[#4E4E4E] text-sm flex-1 bg-transparent focus:outline-none placeholder-gray-300"
                placeholder="Subject line..."
              />
            </div>

            {/* Textarea body */}
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write your message here..."
              className="w-full flex-1 mt-5 text-sm text-[#4E4E4E] placeholder-gray-400 border-none outline-none resize-none min-h-[220px]"
            />

            {/* Attachment preview badge */}
            {attachedFile && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600 mt-2 self-start shadow-sm animate-fadeIn">
                <FiPaperclip size={12} className="text-gray-400" />
                <span className="truncate max-w-[200px] font-medium">{attachedFile.name}</span>
                <button
                  onClick={() => setAttachedFile(null)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  title="Remove file"
                >
                  <FiX size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Message Footer Actions */}
          <div className="border-t border-gray-100 bg-[#FAFAFA] px-6 py-5 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 w-full max-w-md justify-center">
              <button
                onClick={handleSendMessage}
                style={{
                  backgroundColor: messageText.trim() ? "#0DBCBA" : "#CCCCCC",
                }}
                className="flex-1 py-3 text-white rounded-xl text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
              >
                Send
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm focus:outline-none"
                title="Attach file"
              >
                <FiPaperclip size={18} />
              </button>
            </div>
            <span className="text-[11px] text-gray-400 mt-1">
              Your message will be added to Support TKT-1001
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Enquiry Sent Success View
  if (view === "success") {
    return (
      <div className="p-6 min-h-full bg-[#f1f1f9] flex flex-col justify-start">
        {/* Success Modal Container */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl w-full max-w-md mx-auto flex flex-col items-center justify-center relative min-h-[340px] mt-16 overflow-hidden">
          {/* Close button X */}
          <button
            onClick={() => setView("details")}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center hover:bg-gray-500 transition-all focus:outline-none shadow-sm"
            title="Close"
          >
            <FiX size={18} />
          </button>

          {/* Success Checkmark & Custom Confetti Particles */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-4 mt-4">
            {/* Confetti SVG shards */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 112 112">
              <path d="M22,32 Q26,24 30,28" stroke="#0DBCBA" strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(15 26 28)" />
              <path d="M84,36 Q88,28 92,32" stroke="#34D399" strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(-30 88 32)" />
              <path d="M24,80 Q28,88 32,84" stroke="#0DBCBA" strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(-15 28 84)" />
              <path d="M82,78 Q86,86 90,82" stroke="#34D399" strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(45 86 82)" />
              
              <rect x="42" y="14" width="3" height="7" rx="1.5" fill="#0DBCBA" transform="rotate(45 43.5 17.5)" />
              <rect x="70" y="16" width="3" height="7" rx="1.5" fill="#A7F3D0" transform="rotate(-15 71.5 19.5)" />
              <rect x="14" y="52" width="7" height="3" rx="1.5" fill="#A7F3D0" transform="rotate(10 17.5 53.5)" />
              <rect x="94" y="54" width="7" height="3" rx="1.5" fill="#0DBCBA" transform="rotate(-45 97.5 55.5)" />
              
              <circle cx="56" cy="10" r="2.5" fill="#34D399" />
              <circle cx="56" cy="102" r="2.5" fill="#0DBCBA" />
              <circle cx="12" cy="68" r="2" fill="#0DBCBA" />
              <circle cx="102" cy="72" r="2" fill="#A7F3D0" />
            </svg>

            {/* Central Teal Badge with Checkmark */}
            <div className="w-16 h-16 rounded-full bg-[#0DBCBA] flex items-center justify-center text-white shadow-sm z-10 relative">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Message Text */}
          <span className="text-[15px] font-semibold text-[#4E4E4E] mb-6 text-center">
            Enquiry has been send!
          </span>

          {/* Action Button */}
          <button
            onClick={() => navigate("/swappers-management")}
            className="px-6 py-2.5 bg-[#0DBCBA] text-white rounded-lg text-xs font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm"
          >
            Back to Swapper Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full bg-[#f1f1f9]">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/swappers-management")}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer shadow-sm focus:outline-none"
        >
          <FiChevronLeft size={22} className="mr-0.5" />
        </button>
        <span className="text-[17px] font-semibold text-[#4E4E4E]">
          View Swapper Details
        </span>
      </div>

      {/* Main Details Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8 mb-6">
        {/* Profile Image */}
        <div className="w-full lg:w-64 h-64 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
            alt="Swapper headshot"
            className="w-full h-full object-cover rounded-2xl border border-gray-100 shadow-sm"
          />
        </div>

        {/* Details Grid & Actions */}
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
          {/* Key-Value details */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl">
            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                Name:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">
                {swapper.name}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                State/City:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">
                Mohakhali
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                Email:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px] break-all">
                {swapper.email}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                City:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">Dhaka</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                Mobile Number:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">
                {swapper.phone}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                ZIP Code:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">1215</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                Country:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">
                {swapper.country}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                Currency:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">USD</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-400 font-medium text-[13px] w-28 shrink-0">
                DOB:
              </span>
              <span className="text-[#4E4E4E] font-medium text-[13px]">31-10-1998</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row md:flex-col gap-3 justify-start shrink-0">
            <button
              onClick={() => setView("contact")}
              className="px-7 py-2 bg-[#0DBCBA] text-white rounded-lg text-xs font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm min-w-[100px]"
            >
              Contact
            </button>
            <button
              onClick={() => setView("manage")}
              className="px-7 py-2 bg-[#0DBCBA] text-white rounded-lg text-xs font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm min-w-[100px]"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* NID Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Front Side */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-[#0DBCBA] font-semibold text-[13px] mb-4">
            NID Card Front Side
          </h4>
          <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 max-h-80">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/02/NID_%28Front%29.png"
              alt="NID Card Front Side"
              className="w-full h-auto object-contain max-h-72 rounded-lg"
            />
          </div>
        </div>

        {/* Back Side */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-[#0DBCBA] font-semibold text-[13px] mb-4">
            NID Card Back Side
          </h4>
          <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 max-h-80">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/NID_%28Back%29.png/960px-NID_%28Back%29.png?_=20241211202028"
              alt="NID Card Back Side"
              className="w-full h-auto object-contain max-h-72 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapperDetails;
