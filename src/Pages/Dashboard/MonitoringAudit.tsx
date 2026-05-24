import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { toast } from "react-hot-toast";

// ─── Data ────────────────────────────────────────────────────────────────────

const mockLogs = Array.from({ length: 45 }, (_, i) => ({
  id: String(i + 1),
  timestamp: "Oct 24, 14:32:01 UTC",
  adminUser: "Shakir.Uxui@Gmail.Com",
  reportType: i % 3 === 0 ? "Swap Transaction Completed" : i % 3 === 1 ? "Swap Match Event" : "Failed Transaction",
  country: "Pakistan",
}));

const reportTypes = [
  "Authentication & Security Logs",
  "User Profile & Identity Logs",
  "Transaction & Money Movement Logs",
  "Compliance & Risk Monitoring Logs",
  "Admin Activity Logs",
  "System Infrastructure Logs",
  "Swap Lifecycle Logs",
  "Fraud Risk & Trust Logs",
  "User Interaction & App Behavior Logs",
];

const countries = [
  "Pakistan",
  "India",
  "United States",
  "United Kingdom",
  "Canada",
];

// ─── Component ───────────────────────────────────────────────────────────────

const MonitoringAudit: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState(reportTypes[0]);
  const [fromDate, setFromDate] = useState("2026-03-28");
  const [toDate, setToDate] = useState("2026-03-28");
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [logs,] = useState(mockLogs);

  // Dropdown states
  const [isReportDropdownOpen, setIsReportDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setIsReportDropdownOpen(false);
      setIsCountryDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = () => {
    toast.success("Filters applied");
    setCurrentPage(1);
    // In a real app, this would fetch filtered data from the backend
  };

  // ── Filtered list ───────────────────────────────────────────────────

  const totalPages = Math.ceil(logs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLogs = logs.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ── Actions ─────────────────────────────────────────────────────────

  const handleDownload = (id: string) => {
    toast.success(`Downloading log report for ID: ${id}`);
  };

  // ── Pagination Render ───────────────────────────────────────────────

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const btn = (n: number) => (
      <button
        key={n}
        onClick={() => setCurrentPage(n)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${currentPage === n
            ? "bg-[#0DBCBA] text-white shadow-sm"
            : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
      >
        {n}
      </button>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(btn(i));
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) items.push(btn(i));
        items.push(
          <span key="dots" className="px-2 text-gray-400">
            ...
          </span>,
          btn(totalPages)
        );
      } else if (currentPage >= totalPages - 3) {
        items.push(
          btn(1),
          <span key="dots" className="px-2 text-gray-400">
            ...
          </span>
        );
        for (let i = totalPages - 5; i <= totalPages; i++) items.push(btn(i));
      } else {
        items.push(
          btn(1),
          <span key="d1" className="px-2 text-gray-400">
            ...
          </span>,
          btn(currentPage - 1),
          btn(currentPage),
          btn(currentPage + 1),
          <span key="d2" className="px-2 text-gray-400">
            ...
          </span>,
          btn(totalPages)
        );
      }
    }
    return items;
  };

  // ── Main Render ─────────────────────────────────────────────────────

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

        {/* ── Filters Section ───────────────────────────────────────────── */}
        <div className="flex flex-wrap items-end gap-4">

          {/* Report Type */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[250px]">
            <label className="text-sm text-gray-600 font-medium">Report Type</label>
            <div
              className="relative w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setIsReportDropdownOpen(!isReportDropdownOpen);
                  setIsCountryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-[#0DBCBA] shadow-sm"
              >
                <span className="truncate">{selectedReportType}</span>
                <HiOutlineChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform duration-200 ${isReportDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isReportDropdownOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
                  {reportTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedReportType(type);
                        setIsReportDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all ${selectedReportType === type
                          ? "bg-[#EAF7F6] text-[#0DBCBA] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-1.5 min-w-[300px]">
            <label className="text-sm text-gray-600 font-medium">Select Date</label>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2">
              <FiCalendar className="text-gray-400 mr-2" size={16} />
              <div className="flex items-center text-sm text-gray-700">
                <span className="mr-2">From :</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-gray-800 w-[110px]"
                />
                <span className="mx-2 text-gray-300">|</span>
                <span className="mr-2">To :</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-gray-800 w-[110px]"
                />
              </div>
            </div>
          </div>

          {/* Select Country */}
          <div className="flex flex-col gap-1.5 w-[160px]">
            <label className="text-sm text-gray-600 font-medium">Select Country</label>
            <div
              className="relative w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  setIsReportDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 transition-all focus:outline-none focus:border-[#0DBCBA] shadow-sm"
              >
                <span className="truncate">{selectedCountry}</span>
                <HiOutlineChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isCountryDropdownOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
                  {countries.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all ${selectedCountry === c
                          ? "bg-[#EAF7F6] text-[#0DBCBA] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-lg text-sm font-semibold transition-all focus:outline-none shadow-sm h-[46px]"
            >
              Search
            </button>
          </div>

        </div>

        {/* ── Table ─────────────────────────────────── */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#DDF4F0]">
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1b3d5b]">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1b3d5b]">
                    Admin User
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1b3d5b]">
                    Report Type
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1b3d5b]">
                    Country
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1b3d5b] text-center w-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center text-gray-400 text-sm"
                    >
                      No logs found.
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-50 hover:bg-[#fafbfc] transition-colors last:border-b-0"
                    >
                      <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">
                        {item.adminUser}
                      </td>
                      <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">
                        {item.reportType}
                      </td>
                      <td className="px-6 py-5 text-[14px] text-gray-500 font-medium">
                        {item.country}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleDownload(item.id)}
                          className="p-1.5 rounded-lg border border-[#0DBCBA] text-[#0DBCBA] hover:bg-[#EAF7F6] transition-all focus:outline-none inline-flex"
                        >
                          <FiDownload size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Pagination ───────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 mt-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all focus:outline-none"
            >
              <FiArrowLeft size={16} />
            </button>
            {renderPaginationItems()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all focus:outline-none"
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringAudit;
