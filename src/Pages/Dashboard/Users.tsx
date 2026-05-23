import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiX,
} from "react-icons/fi";
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
    {
      key: "4",
      id: "04",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Active",
    },
    {
      key: "5",
      id: "05",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Hide",
    },
    {
      key: "6",
      id: "06",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Active",
    },
    {
      key: "7",
      id: "07",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Active",
    },
    {
      key: "8",
      id: "08",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Active",
    },
    {
      key: "9",
      id: "09",
      name: "Md Shakir Ahmed",
      email: "Shakir.Uxui@Gmail.Com",
      phone: "+8880133327633",
      country: "Bangladesh",
      swap: 36,
      status: "Active",
    },
  ];

  const countries = ["Bangladesh", "Pakistan", "United States", "China", "Canada"];
  const statuses: ("Active" | "Ban" | "Suspend" | "Hide")[] = [
    "Active",
    "Ban",
    "Suspend",
    "Hide",
  ];

  for (let i = 10; i <= 95; i++) {
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

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>(generateDummyData());

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // Dropdown open states
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [activeDropdownRowKey, setActiveDropdownRowKey] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // 9 rows per page to match the image exactly

  // Modal for confirmation
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    targetKey: string | null;
    targetStatus: "Active" | "Ban" | "Suspend" | null;
  }>({
    isOpen: false,
    targetKey: null,
    targetStatus: null,
  });

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdownRowKey(null);
      setIsStatusDropdownOpen(false);
      setIsCountryDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Filtered and searched users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      selectedCountryFilter === "All" || user.country === selectedCountryFilter;

    const matchesStatus =
      selectedStatusFilter === "All" || user.status === selectedStatusFilter;

    return matchesSearch && matchesCountry && matchesStatus;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCountryFilter, selectedStatusFilter]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handleUpdateStatus = (
    key: string,
    status: "Active" | "Ban" | "Suspend" | "Hide"
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.key === key ? { ...user, status } : user))
    );
    toast.success(`Swapper status updated to ${status} successfully!`);
  };

  const columns: ColumnsType<UserData> = [
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
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text: string) => (
        <span className="text-gray-400 text-[13px]">{text}</span>
      ),
    },
    {
      title: "Swap",
      dataIndex: "swap",
      key: "swap",
      render: (text: number) => (
        <span className="text-gray-600 text-[13px]">{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let bgClass = "";
        if (status === "Active") bgClass = "bg-[#0DBCBA]";
        else if (status === "Ban") bgClass = "bg-[#EF4444]";
        else if (status === "Suspend") bgClass = "bg-[#F97316]";
        else if (status === "Hide") bgClass = "bg-[#4B5563]";

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
      align: "right",
      width: 60,
      render: (_: any, record: UserData) => {
        const isOpen = activeDropdownRowKey === record.key;
        return (
          <div className="relative flex justify-end" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setActiveDropdownRowKey(isOpen ? null : record.key);
                setIsStatusDropdownOpen(false);
                setIsCountryDropdownOpen(false);
              }}
              className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-50 transition-all focus:outline-none"
            >
              <FiMoreVertical size={20} />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-8 w-44 bg-white border border-gray-100 rounded-xl shadow-xl py-2 px-1 z-50 flex flex-col gap-0.5 text-left text-xs font-semibold">
                <button
                  onClick={() => {
                    navigate(`/swappers/profile/${record.key}`);
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-gray-600 rounded-lg transition-all flex items-center gap-2"
                >
                  <FiUser size={14} className="text-gray-400" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(record.key, "Hide");
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-gray-600 rounded-lg transition-all"
                >
                  Hide Swapper
                </button>
                <button
                  onClick={() => {
                    setConfirmModal({
                      isOpen: true,
                      targetKey: record.key,
                      targetStatus: "Active",
                    });
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-teal-500 font-semibold rounded-lg transition-all"
                >
                  Active User
                </button>
                <button
                  onClick={() => {
                    setConfirmModal({
                      isOpen: true,
                      targetKey: record.key,
                      targetStatus: "Suspend",
                    });
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-orange-500 font-semibold rounded-lg transition-all"
                >
                  Suspend Swapper
                </button>
                <button
                  onClick={() => {
                    setConfirmModal({
                      isOpen: true,
                      targetKey: record.key,
                      targetStatus: "Ban",
                    });
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-red-500 font-semibold rounded-lg transition-all"
                >
                  Ban Swapper
                </button>
              </div>
            )}
          </div>
        );
      },
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
          <span
            key="dots"
            className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold"
          >
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      } else if (currentPage >= totalPages - 3) {
        items.push(renderButton(1));
        items.push(
          <span
            key="dots"
            className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold"
          >
            ...
          </span>
        );
        for (let i = totalPages - 5; i <= totalPages; i++) {
          items.push(renderButton(i));
        }
      } else {
        items.push(renderButton(1));
        items.push(
          <span
            key="dots1"
            className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold"
          >
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(renderButton(i));
        }
        items.push(
          <span
            key="dots2"
            className="w-8 h-8 flex items-end justify-center text-gray-400 pb-2 font-bold"
          >
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
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Top bar with Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search here......."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
            />
          </div>

          {/* Filters and Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Country Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  setIsStatusDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none"
              >
                <span>
                  {selectedCountryFilter === "All" ? "Pakistan" : selectedCountryFilter}
                </span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Pakistan", "Bangladesh", "United States", "China"].map(
                    (country) => {
                      const isSelected = selectedCountryFilter === country;
                      return (
                        <button
                          key={country}
                          onClick={() => {
                            setSelectedCountryFilter(country);
                            setIsCountryDropdownOpen(false);
                          }}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${isSelected
                              ? "bg-[#0DBCBA] text-white"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {country}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsStatusDropdownOpen(!isStatusDropdownOpen);
                  setIsCountryDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none"
              >
                <span>
                  {selectedStatusFilter === "All" ? "Active" : selectedStatusFilter}
                </span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isStatusDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Ban", "Active", "Suspend", "Hide"].map((status) => {
                    const isSelected = selectedStatusFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatusFilter(status);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${isSelected
                            ? "bg-[#0DBCBA] text-white font-bold shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-[#0DBCBA] hover:text-white"
                          }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ant Design Table with custom styling */}
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
            dataSource={paginatedUsers}
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
      </div>
      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[420px] w-full mx-4 relative flex flex-col items-center border border-gray-100/50">
            {/* Close Circle Button */}
            <button
              onClick={() => setConfirmModal({ isOpen: false, targetKey: null, targetStatus: null })}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-500 transition-all focus:outline-none"
            >
              <FiX size={14} />
            </button>

            {/* Warning Icon Container */}
            <div className="w-14 h-14 rounded-xl bg-[#FEE4E2] flex items-center justify-center text-[#D92D20] mb-5 mt-2 shadow-sm">
              <svg className="w-8 h-8 text-[#D92D20]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 20h20L12 3z" />
                <rect x="11" y="9" width="2" height="5" rx="1" fill="white" />
                <circle cx="12" cy="16.5" r="1.2" fill="white" />
              </svg>
            </div>

            {/* Message Text */}
            <h3 className="text-[#1A1C1E] text-base font-semibold mb-6 text-center leading-relaxed px-4">
              Are you sure you want to {confirmModal.targetStatus} this Swapper?
            </h3>

            {/* Confirm Button */}
            <button
              onClick={() => {
                if (confirmModal.targetKey && confirmModal.targetStatus) {
                  handleUpdateStatus(confirmModal.targetKey, confirmModal.targetStatus);
                }
                setConfirmModal({ isOpen: false, targetKey: null, targetStatus: null });
              }}
              className="w-[180px] py-2.5 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/20"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

