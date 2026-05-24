import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FiSearch,
  FiChevronDown,
  FiArrowLeft,
  FiArrowRight,
  FiX,
  FiEye,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

interface MemberData {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  package: "Silver" | "Gold";
  expireDate: string;
  status: "Active" | "Expired" | "Cancelled";
  price: string;
  startDate: string;
  packName: string;
  remainingDays: string;
}

const initialMembers: MemberData[] = [
  {
    key: "1",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  {
    key: "2",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Expired",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "0 Days",
  },
  {
    key: "3",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  {
    key: "4",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  {
    key: "5",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  {
    key: "6",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Expired",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "0 Days",
  },
  {
    key: "7",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  {
    key: "8",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  {
    key: "9",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Gold",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "$19.99",
    startDate: "01 Jan 2027",
    packName: "Premium Plan",
    remainingDays: "25 Days",
  },
  // Silver Members
  {
    key: "10",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Silver",
    expireDate: "01 Feb 2027",
    status: "Active",
    price: "Free",
    startDate: "01 Jan 2027",
    packName: "Basic Plan",
    remainingDays: "25 Days",
  },
  {
    key: "11",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Silver",
    expireDate: "01 Feb 2027",
    status: "Expired",
    price: "Free",
    startDate: "01 Jan 2027",
    packName: "Basic Plan",
    remainingDays: "0 Days",
  },
  {
    key: "12",
    id: "01",
    name: "Md Shakir Ahmed",
    email: "Shakir.Uxui@Gmail.Com",
    phone: "+8880133327633",
    package: "Silver",
    expireDate: "01 Feb 2027",
    status: "Cancelled",
    price: "Free",
    startDate: "01 Jan 2027",
    packName: "Basic Plan",
    remainingDays: "0 Days",
  },
];

// Add dummy generator loop to have enough rows for pagination
for (let i = 13; i <= 35; i++) {
  initialMembers.push({
    key: String(i),
    id: "01",
    name: i % 2 === 0 ? "Md Shakir Ahmed" : `User ${i}`,
    email: i % 2 === 0 ? "Shakir.Uxui@Gmail.Com" : `user${i}@example.com`,
    phone: `+88801333${40000 + i}`,
    package: i % 2 === 0 ? "Silver" : "Gold",
    expireDate: "01 Feb 2027",
    status: i % 3 === 0 ? "Expired" : i % 4 === 0 ? "Cancelled" : "Active",
    price: i % 2 === 0 ? "Free" : "$19.99",
    startDate: "01 Jan 2027",
    packName: i % 2 === 0 ? "Basic Plan" : "Premium Plan",
    remainingDays: i % 3 === 0 ? "0 Days" : "25 Days",
  });
}

const Membership: React.FC = () => {
  // Tabs: plans | silver_members | gold_members
  const [activeTab, setActiveTab] = useState<"plans" | "silver_members" | "gold_members">("plans");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("All");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Plan Details / Configs
  const [goldPlanConfig, setGoldPlanConfig] = useState({
    price: 499,
    isActive: true,
    country: "Bangladesh",
    paymentCycle: "Monthly",
    swapLimits: "20",
    swapAmount: "5000",
    safetyShield: "100",
  });

  const [silverPlanConfig, setSilverPlanConfig] = useState({
    price: 0, // Free
    isActive: true,
    country: "Bangladesh",
    paymentCycle: "Monthly",
    swapLimits: "5",
    swapAmount: "1000",
  });

  // Edit Plan Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPlanType, setEditPlanType] = useState<"gold" | "silver">("gold");
  const [formCountry, setFormCountry] = useState("Bangladesh");
  const [formFee, setFormFee] = useState("$499");
  const [formPaymentCycle, setFormPaymentCycle] = useState("Monthly");
  const [formSwapLimits, setFormSwapLimits] = useState("");
  const [formSwapAmount, setFormSwapAmount] = useState("");
  const [formSafetyShield, setFormSafetyShield] = useState("");

  // Member Detail Popup Modal
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsCountryDropdownOpen(false);
      setIsStatusDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Filter members list based on current active tab and search filters
  const filteredMembers = initialMembers.filter((member) => {
    // Tab constraint
    const tabMatch =
      activeTab === "silver_members"
        ? member.package === "Silver"
        : member.package === "Gold";

    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const matchesStatus =
      selectedStatusFilter === "All" || member.status === selectedStatusFilter;

    // In a real app we'd filter country too, but mockup doesn't have country column, so search & status are key.
    return tabMatch && matchesSearch && matchesStatus;
  });

  // Reset page number on filter/tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, selectedStatusFilter]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredMembers.length / pageSize);

  const handleOpenEditModal = (type: "gold" | "silver") => {
    setEditPlanType(type);
    if (type === "gold") {
      setFormCountry(goldPlanConfig.country);
      setFormFee(`$${goldPlanConfig.price}`);
      setFormPaymentCycle(goldPlanConfig.paymentCycle);
      setFormSwapLimits(goldPlanConfig.swapLimits);
      setFormSwapAmount(goldPlanConfig.swapAmount);
      setFormSafetyShield(goldPlanConfig.safetyShield);
    } else {
      setFormCountry(silverPlanConfig.country);
      setFormFee("Free");
      setFormPaymentCycle(silverPlanConfig.paymentCycle);
      setFormSwapLimits(silverPlanConfig.swapLimits);
      setFormSwapAmount(silverPlanConfig.swapAmount);
      setFormSafetyShield(""); // Not applicable for silver
    }
    setIsEditModalOpen(true);
  };

  const handleSavePlanConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFee = formFee.replace(/[^0-9]/g, "");
    const priceNum = cleanFee ? parseInt(cleanFee) : 0;

    if (editPlanType === "gold") {
      setGoldPlanConfig({
        price: priceNum,
        isActive: goldPlanConfig.isActive,
        country: formCountry,
        paymentCycle: formPaymentCycle,
        swapLimits: formSwapLimits,
        swapAmount: formSwapAmount,
        safetyShield: formSafetyShield,
      });
      toast.success("Gold Membership plan updated successfully!");
    } else {
      setSilverPlanConfig({
        price: priceNum,
        isActive: silverPlanConfig.isActive,
        country: formCountry,
        paymentCycle: formPaymentCycle,
        swapLimits: formSwapLimits,
        swapAmount: formSwapAmount,
      });
      toast.success("Silver Membership plan updated successfully!");
    }
    setIsEditModalOpen(false);
  };

  const handleTogglePlanActive = (type: "gold" | "silver") => {
    if (type === "gold") {
      setGoldPlanConfig((prev) => ({ ...prev, isActive: !prev.isActive }));
      toast.success(`Gold Plan ${goldPlanConfig.isActive ? "deactivated" : "activated"} successfully!`);
    } else {
      setSilverPlanConfig((prev) => ({ ...prev, isActive: !prev.isActive }));
      toast.success(`Silver Plan ${silverPlanConfig.isActive ? "deactivated" : "activated"} successfully!`);
    }
  };

  const handleViewMember = (record: MemberData) => {
    setSelectedMember(record);
    setIsMemberModalOpen(true);
  };

  const columns: ColumnsType<MemberData> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text: string) => (
        <span className="text-gray-500 font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="text-[#4E4E4E] font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <span className="text-[#4E4E4E] text-[13px]">{text}</span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => (
        <span className="text-[#4E4E4E] text-[13px]">{text}</span>
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      render: (text: string) => (
        <span className="text-gray-600 font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Expire Date",
      dataIndex: "expireDate",
      key: "expireDate",
      render: (text: string) => (
        <span className="text-gray-500 text-[13px]">{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let bgClass = "";
        if (status === "Active") bgClass = "bg-[#0DBCBA]";
        else if (status === "Expired") bgClass = "bg-[#EF4444]";
        else bgClass = "bg-[#94A3B8]"; // Cancelled

        return (
          <span
            className={`inline-block text-center text-[12px] font-medium px-4 py-1 rounded-[6px] text-white min-w-[76px] ${bgClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "",
      key: "actions",
      align: "center",
      width: 80,
      render: (_: any, record: MemberData) => (
        <button
          onClick={() => handleViewMember(record)}
          className="p-1.5 rounded-lg border border-[#0DBCBA]/30 hover:border-[#0DBCBA] text-[#0DBCBA] transition-all bg-white hover:bg-slate-50 focus:outline-none"
        >
          <FiEye size={16} />
        </button>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const renderButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${currentPage === pageNumber
          ? "bg-[#0DBCBA] text-white shadow-sm"
          : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
      >
        {pageNumber}
      </button>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(renderButton(i));
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) {
          items.push(renderButton(i));
        }
        items.push(
          <span key="dots" className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold">
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      } else if (currentPage >= totalPages - 3) {
        items.push(renderButton(1));
        items.push(
          <span key="dots" className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold">
            ...
          </span>
        );
        for (let i = totalPages - 5; i <= totalPages; i++) {
          items.push(renderButton(i));
        }
      } else {
        items.push(renderButton(1));
        items.push(
          <span key="dots1" className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold">
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(renderButton(i));
        }
        items.push(
          <span key="dots2" className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold">
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      }
    }

    return items;
  };

  return (
    <div className="p-6 min-h-full bg-[#f1f1f9]">
      {/* Top filters container (only visible for silver/gold member tables) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        {/* Navigation & Header tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4 mb-5">
          <div className="flex gap-6 items-center">
            {["plans", "silver_members", "gold_members"].map((tab) => {
              const tabTitle =
                tab === "plans"
                  ? "Membership Plans"
                  : tab === "silver_members"
                    ? "Silver Members"
                    : "Gold Members";
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-2 text-[14px] font-semibold transition-all relative ${isActive ? "text-[#1A1C1E]" : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {tabTitle}
                  {isActive && (
                    <div className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-black rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search bar & Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {activeTab !== "plans" && (
              <div className="relative w-full md:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FiSearch size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search here......."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl bg-white text-xs text-[#4E4E4E] placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
                />
              </div>
            )}

            {/* Pakistan Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-[#4E4E4E] font-semibold hover:border-[#0DBCBA] transition-all focus:outline-none"
              >
                <span>{selectedCountryFilter === "All" ? "Pakistan" : selectedCountryFilter}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Pakistan", "Bangladesh", "United States", "China"].map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountryFilter(country);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${selectedCountryFilter === country ? "bg-[#0DBCBA] text-white" : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Dropdown (only visible when viewing member list tabs) */}
            {activeTab !== "plans" && (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-[#4E4E4E] font-semibold hover:border-[#0DBCBA] transition-all focus:outline-none"
                >
                  <span>{selectedStatusFilter === "All" ? "Active" : selectedStatusFilter}</span>
                  <FiChevronDown
                    className={`transition-transform duration-200 ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isStatusDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                    {["All", "Active", "Cancelled", "Expired"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatusFilter(status);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${selectedStatusFilter === status
                          ? "bg-[#0DBCBA] text-white font-bold shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-[#0DBCBA] hover:text-white"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tab Content rendering */}
        {activeTab === "plans" ? (
          /* Cards UI */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mt-6">
            {/* Gold Plan Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
              {/* Badge/Medal Icon */}
              <div className="w-16 h-16 rounded-full bg-[#FEF6E0] flex items-center justify-center mb-4 relative shadow-sm border border-[#FDE047]/30">
                <span className="text-3xl">🏅</span>
              </div>
              <h4 className="text-[#0DBCBA] text-[20px] font-bold mb-3">Gold Plan</h4>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-[#0DBCBA] text-4xl font-extrabold">${goldPlanConfig.price}</span>
                <span className="text-gray-400 text-sm font-medium">/ Month</span>
              </div>

              {/* Bullet points */}
              <div className="w-full flex flex-col gap-3 mb-8 px-2">
                {[
                  { text: "Unlimited Payment", active: true },
                  { text: "Basic Dashboard", active: true },
                  { text: "Transaction History", active: true },
                  { text: "Standard Reports", active: true },
                  { text: "Email Support", active: true },
                  { text: "No Payout Priority", active: false },
                  { text: "No Advanced Analytics", active: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {item.active ? (
                      <span className="w-5 h-5 rounded-full bg-[#E6F4EA] text-[#137333] flex items-center justify-center shrink-0">
                        <FiCheck size={12} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 font-bold text-xs">
                        ✕
                      </span>
                    )}
                    <span className={item.active ? "text-gray-700 font-medium" : "text-gray-400"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 w-full mt-auto">
                <button
                  onClick={() => handleTogglePlanActive("gold")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none ${goldPlanConfig.isActive
                    ? "bg-[#EF4444] text-white hover:bg-red-600"
                    : "bg-[#0DBCBA] text-white hover:bg-[#0aa6a4]"
                    }`}
                >
                  {goldPlanConfig.isActive ? "Deactivate" : "Active"}
                </button>
                <button
                  onClick={() => handleOpenEditModal("gold")}
                  className="flex-1 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-xs font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none"
                >
                  Edit Plan
                </button>
              </div>
            </div>

            {/* Silver Plan Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
              {/* Badge/Medal Icon */}
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 relative shadow-sm border border-slate-200">
                <span className="text-3xl">🥈</span>
              </div>
              <h4 className="text-[#0DBCBA] text-[20px] font-bold mb-3">Silver Plan</h4>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-[#0DBCBA] text-4xl font-extrabold">Free</span>
              </div>

              {/* Bullet points */}
              <div className="w-full flex flex-col gap-3 mb-8 px-2">
                {[
                  { text: "Unlimited Payment", active: true },
                  { text: "Basic Dashboard", active: true },
                  { text: "Transaction History", active: true },
                  { text: "Standard Reports", active: true },
                  { text: "Email Support", active: true },
                  { text: "No Payout Priority", active: false },
                  { text: "No Advanced Analytics", active: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {item.active ? (
                      <span className="w-5 h-5 rounded-full bg-[#E6F4EA] text-[#137333] flex items-center justify-center shrink-0">
                        <FiCheck size={12} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 font-bold text-xs">
                        ✕
                      </span>
                    )}
                    <span className={item.active ? "text-gray-700 font-medium" : "text-gray-400"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 w-full mt-auto">
                <button
                  onClick={() => handleTogglePlanActive("silver")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none ${silverPlanConfig.isActive
                    ? "bg-[#EF4444] text-white hover:bg-red-600"
                    : "bg-[#0DBCBA] text-white hover:bg-[#0aa6a4]"
                    }`}
                >
                  {silverPlanConfig.isActive ? "Deactivate" : "Active"}
                </button>
                <button
                  onClick={() => handleOpenEditModal("silver")}
                  className="flex-1 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-xs font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none"
                >
                  Edit Plan
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Table UI for Silver/Gold members */
          <>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#CFF2F1",
                    headerColor: "#4E4E4E",
                    headerBorderRadius: 10,
                    rowHoverBg: "#f8fafc",
                    cellPaddingBlock: 14,
                    cellPaddingInline: 16,
                  },
                },
              }}
            >
              <Table
                columns={columns}
                dataSource={paginatedMembers}
                rowKey="key"
                pagination={false}
                className="border-none"
              />
            </ConfigProvider>

            {/* Custom Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiArrowLeft size={16} />
                </button>

                {renderPaginationItems()}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Plan Modal (Gold / Silver update form) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[440px] w-full mx-4 relative flex flex-col border border-gray-100/50">
            {/* Close Button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 text-red-500 hover:text-red-700 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-[#0DBCBA] text-lg font-bold mb-6 text-center">
              {editPlanType === "gold" ? "Gold Membership" : "Silver Membership"}
            </h3>

            <form onSubmit={handleSavePlanConfig} className="flex flex-col gap-4">
              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Country</label>
                <div className="relative">
                  <select
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all appearance-none cursor-pointer"
                    required
                  >
                    {["Bangladesh", "Australia", "USA", "India", "France", "Uganda", "South Africa", "Pakistan"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
                    <FiChevronDown size={16} />
                  </span>
                </div>
              </div>

              {/* Fee */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Fee</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="$499"
                    value={formFee}
                    onChange={(e) => setFormFee(e.target.value)}
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-gray-300 pointer-events-none">
                    PKR
                  </span>
                </div>
              </div>

              {/* Payment Cycle */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Payment Cycle</label>
                <div className="relative">
                  <select
                    value={formPaymentCycle}
                    onChange={(e) => setFormPaymentCycle(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
                    <FiChevronDown size={16} />
                  </span>
                </div>
              </div>

              {/* Swap Limits */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Swap Limits</label>
                <input
                  type="number"
                  placeholder="Enter Swap Limits"
                  value={formSwapLimits}
                  onChange={(e) => setFormSwapLimits(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                  required
                />
              </div>

              {/* Swap Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Swap Amount</label>
                <input
                  type="number"
                  placeholder="Enter Swap Amount"
                  value={formSwapAmount}
                  onChange={(e) => setFormSwapAmount(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                  required
                />
              </div>

              {/* Safety Shield (Only for Gold membership) */}
              {editPlanType === "gold" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-700 font-medium text-[13px]">Safety Shield</label>
                  <input
                    type="number"
                    placeholder="Enter Safety Shield"
                    value={formSafetyShield}
                    onChange={(e) => setFormSafetyShield(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                    required
                  />
                </div>
              )}

              {/* Update Plan Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/20"
              >
                Update Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Member Details Popup Modal */}
      {isMemberModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[360px] w-full mx-4 relative flex flex-col items-center border border-gray-100/50">
            {/* Close Button */}
            <button
              onClick={() => setIsMemberModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>

            {/* Profile Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#0DBCBA]/20 mb-3 mt-2 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Member avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h4 className="text-gray-900 font-bold text-[16px] mb-1">{selectedMember.name}</h4>

            {/* Yellow Shield Badge */}
            <div className="w-7 h-7 bg-amber-400 flex items-center justify-center text-white mb-4 rounded-md shadow-sm border border-amber-300" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              <FiCheck size={14} strokeWidth={3} />
            </div>

            {/* Plan Title */}
            <h5 className="text-[#0DBCBA] font-bold text-base mb-6">
              {selectedMember.package === "Gold" ? "Gold Plan" : "Silver Plan"}
            </h5>

            {/* Detail Rows */}
            <div className="w-full flex flex-col mb-6 text-[12px]">
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Pack Nam</span>
                <span className="text-gray-800 font-bold">{selectedMember.packName}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Price</span>
                <span className="text-gray-800 font-bold">{selectedMember.price}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Start Date</span>
                <span className="text-gray-800 font-bold">{selectedMember.startDate}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">End Date</span>
                <span className="text-gray-800 font-bold">{selectedMember.expireDate}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Remaining Days</span>
                <span className="text-gray-800 font-bold">{selectedMember.remainingDays}</span>
              </div>
            </div>

            {/* Renew Plan button */}
            <button
              onClick={() => {
                toast.success(`Plan renewed for ${selectedMember.name} successfully!`);
                setIsMemberModalOpen(false);
              }}
              className="w-full py-3 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/20"
            >
              Renew Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
