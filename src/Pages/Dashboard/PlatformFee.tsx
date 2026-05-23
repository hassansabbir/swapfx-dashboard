import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FiSearch,
  FiChevronDown,
  FiArrowLeft,
  FiArrowRight,
  FiX,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

interface PlatformFeeData {
  key: string;
  serial: string;
  country: string;
  currency: string;
  platformFee: number;
  safetyShieldFee: number;
  status: "Active" | "Inactive";
}

const initialData: PlatformFeeData[] = [
  {
    key: "1",
    serial: "01",
    country: "BANGLADESH",
    currency: "BDT",
    platformFee: 100,
    safetyShieldFee: 200,
    status: "Active",
  },
  {
    key: "2",
    serial: "01",
    country: "AUSTRALIA",
    currency: "AUD",
    platformFee: 300,
    safetyShieldFee: 600,
    status: "Active",
  },
  {
    key: "3",
    serial: "01",
    country: "USA",
    currency: "USD",
    platformFee: 200,
    safetyShieldFee: 300,
    status: "Active",
  },
  {
    key: "4",
    serial: "01",
    country: "INDIA",
    currency: "INR",
    platformFee: 800,
    safetyShieldFee: 500,
    status: "Active",
  },
  {
    key: "5",
    serial: "01",
    country: "FRANCE",
    currency: "EUR",
    platformFee: 400,
    safetyShieldFee: 250,
    status: "Active",
  },
  {
    key: "6",
    serial: "01",
    country: "BANGLADESH",
    currency: "BDT",
    platformFee: 150,
    safetyShieldFee: 450,
    status: "Active",
  },
  {
    key: "7",
    serial: "01",
    country: "INDIA",
    currency: "INR",
    platformFee: 250,
    safetyShieldFee: 100,
    status: "Active",
  },
  {
    key: "8",
    serial: "01",
    country: "UGANDA",
    currency: "UGX",
    platformFee: 160,
    safetyShieldFee: 150,
    status: "Active",
  },
  {
    key: "9",
    serial: "01",
    country: "SOUTH AFRICA",
    currency: "ZAR",
    platformFee: 300,
    safetyShieldFee: 100,
    status: "Active",
  },
];

const PlatformFee: React.FC = () => {
  const [data, setData] = useState<PlatformFeeData[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("All");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Add / Edit Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [editingRecord, setEditingRecord] = useState<PlatformFeeData | null>(null);

  // Add/Edit Form states
  const [formCountry, setFormCountry] = useState("");
  const [formCurrency, setFormCurrency] = useState("");
  const [formPlatformFee, setFormPlatformFee] = useState("");
  const [formSafetyShieldFee, setFormSafetyShieldFee] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  // Delete Confirmation Modal states
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean;
    targetKey: string | null;
    targetCountry: string | null;
  }>({
    isOpen: false,
    targetKey: null,
    targetCountry: null,
  });

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsCountryDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Filtered and searched data
  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      selectedCountryFilter === "All" ||
      item.country.toLowerCase() === selectedCountryFilter.toLowerCase();

    return matchesSearch && matchesCountry;
  });

  // Reset page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCountryFilter]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleOpenAddModal = () => {
    setModalType("add");
    setEditingRecord(null);
    setFormCountry("");
    setFormCurrency("");
    setFormPlatformFee("");
    setFormSafetyShieldFee("");
    setFormStatus("Active");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (record: PlatformFeeData) => {
    setModalType("edit");
    setEditingRecord(record);
    
    // Normalize country casing to match select options
    const toTitleCase = (str: string) => {
      if (str === "USA") return "USA";
      return str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    };
    
    setFormCountry(toTitleCase(record.country));
    setFormCurrency(record.currency);
    setFormPlatformFee(String(record.platformFee));
    setFormSafetyShieldFee(String(record.safetyShieldFee));
    setFormStatus(record.status);
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountry.trim() || !formCurrency.trim() || !formPlatformFee || !formSafetyShieldFee) {
      toast.error("Please fill in all fields.");
      return;
    }

    const platformFeeVal = parseFloat(formPlatformFee);
    const safetyShieldVal = parseFloat(formSafetyShieldFee);

    if (isNaN(platformFeeVal) || isNaN(safetyShieldVal)) {
      toast.error("Fees must be numeric values.");
      return;
    }

    if (modalType === "add") {
      const newRecord: PlatformFeeData = {
        key: String(Date.now()),
        serial: "01",
        country: formCountry.toUpperCase(),
        currency: formCurrency.toUpperCase(),
        platformFee: platformFeeVal,
        safetyShieldFee: safetyShieldVal,
        status: formStatus,
      };
      setData((prev) => [newRecord, ...prev]);
      toast.success("Country fee added successfully!");
    } else if (modalType === "edit" && editingRecord) {
      setData((prev) =>
        prev.map((item) =>
          item.key === editingRecord.key
            ? {
                ...item,
                country: formCountry.toUpperCase(),
                currency: formCurrency.toUpperCase(),
                platformFee: platformFeeVal,
                safetyShieldFee: safetyShieldVal,
                status: formStatus,
              }
            : item
        )
      );
      toast.success("Country fee updated successfully!");
    }

    setIsModalOpen(false);
  };

  const handleDeleteClick = (record: PlatformFeeData) => {
    setDeleteConfirmModal({
      isOpen: true,
      targetKey: record.key,
      targetCountry: record.country,
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmModal.targetKey) {
      setData((prev) => prev.filter((item) => item.key !== deleteConfirmModal.targetKey));
      toast.success("Country fee entry deleted successfully!");
    }
    setDeleteConfirmModal({ isOpen: false, targetKey: null, targetCountry: null });
  };

  const columns: ColumnsType<PlatformFeeData> = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 100,
      render: (text: string) => (
        <span className="text-gray-500 font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text: string) => (
        <span className="text-[#4E4E4E] font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      render: (text: string) => (
        <span className="text-[#4E4E4E] text-[13px] font-medium">{text}</span>
      ),
    },
    {
      title: "Platfrom Fee",
      dataIndex: "platformFee",
      key: "platformFee",
      render: (text: number) => (
        <span className="text-gray-600 text-[13px] font-medium">{text}</span>
      ),
    },
    {
      title: "Safety Shield Fee",
      dataIndex: "safetyShieldFee",
      key: "safetyShieldFee",
      render: (text: number) => (
        <span className="text-gray-600 text-[13px] font-medium">{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span className="inline-block text-center text-[12px] font-medium px-4 py-1 rounded-[6px] text-white min-w-[76px] bg-[#0DBCBA]">
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 120,
      render: (_: any, record: PlatformFeeData) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleOpenEditModal(record)}
            className="p-1.5 rounded-lg border border-[#0DBCBA]/30 hover:border-[#0DBCBA] text-[#0DBCBA] transition-all bg-white hover:bg-slate-50 focus:outline-none"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={() => handleDeleteClick(record)}
            className="p-1.5 rounded-lg border border-red-100 hover:border-red-500 text-red-500 transition-all bg-white hover:bg-red-50/50 focus:outline-none"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
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
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
          currentPage === pageNumber
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

  // Get unique list of countries for filter dropdown
  const filterCountries = ["All", ...Array.from(new Set(data.map((item) => item.country.charAt(0) + item.country.slice(1).toLowerCase())))];

  return (
    <div className="p-6 min-h-full bg-[#f1f1f9]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Top bar with Search, Filters, and Add button */}
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

          {/* Right section filters & actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Country Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none"
              >
                <span>{selectedCountryFilter === "All" ? "Pakistan" : selectedCountryFilter}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5 max-h-60 overflow-y-auto">
                  {filterCountries.map((country) => {
                    const isSelected = selectedCountryFilter === country;
                    return (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountryFilter(country);
                          setIsCountryDropdownOpen(false);
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${
                          isSelected ? "bg-[#0DBCBA] text-white" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {country}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add New Country Button */}
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white font-semibold text-sm rounded-lg shadow-sm transition-all focus:outline-none"
            >
              Add New Country
            </button>
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
            dataSource={paginatedData}
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

      {/* Add / Edit Country Fee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[440px] w-full mx-4 relative flex flex-col border border-gray-100/50">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-red-500 hover:text-red-700 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-[#0DBCBA] text-lg font-bold mb-6 text-center">
              {modalType === "add" ? "Add Platform Fee" : "Edit Platform Fee"}
            </h3>

            <form onSubmit={handleSaveForm} className="flex flex-col gap-4">
              {/* Row 1: Select Country & Currency */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-[2.3]">
                  <label className="text-gray-700 font-medium text-[13px]">Select Country</label>
                  <div className="relative">
                    <select
                      value={formCountry}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setFormCountry(selected);
                        // Auto-map currency for ease of use
                        const currencyMap: { [key: string]: string } = {
                          Bangladesh: "BDT",
                          Australia: "AUD",
                          USA: "USD",
                          India: "INR",
                          France: "EUR",
                          Uganda: "UGX",
                          "South Africa": "ZAR",
                          Pakistan: "PKR",
                        };
                        if (currencyMap[selected]) {
                          setFormCurrency(currencyMap[selected]);
                        }
                      }}
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled hidden>Select Country</option>
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

                <div className="flex flex-col gap-1.5 flex-[1]">
                  <label className="text-gray-700 font-medium text-[13px]">Currency</label>
                  <input
                    type="text"
                    placeholder="BDT"
                    value={formCurrency}
                    onChange={(e) => setFormCurrency(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Swap Fee */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Swap Fee</label>
                <input
                  type="text"
                  placeholder="type here.."
                  value={formPlatformFee}
                  onChange={(e) => setFormPlatformFee(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                  required
                />
              </div>

              {/* Row 3: Protection Fee */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-medium text-[13px]">Protection Fee</label>
                <input
                  type="text"
                  placeholder="type here.."
                  value={formSafetyShieldFee}
                  onChange={(e) => setFormSafetyShieldFee(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-[#4E4E4E] focus:outline-none focus:border-[#0DBCBA] transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/20"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[420px] w-full mx-4 relative flex flex-col items-center border border-gray-100/50">
            {/* Close Button */}
            <button
              onClick={() => setDeleteConfirmModal({ isOpen: false, targetKey: null, targetCountry: null })}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none"
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
              Are you sure you want to delete Platform Fee config for {deleteConfirmModal.targetCountry}?
            </h3>

            {/* Confirm Button */}
            <button
              onClick={confirmDelete}
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

export default PlatformFee;
