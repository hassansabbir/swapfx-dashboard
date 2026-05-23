import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { toast } from "react-hot-toast";

// ─── Icons ───────────────────────────────────────────────────────────────────

const UnlockedIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-500"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 019.9-1" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const mockIps = Array.from({ length: 45 }, (_, i) => ({
  id: String(i + 1),
  ip: "192.168.1.100",
  status: "Enabled",
}));

// ─── Component ───────────────────────────────────────────────────────────────

const SecurityFraud: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ips, setIps] = useState(mockIps);

  // Modal states
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedIp, setSelectedIp] = useState<{ id: string; ip: string; status: string } | null>(null);
  
  // Dropdown state in Action modal
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("Enabled");

  const [confirmDisableModalOpen, setConfirmDisableModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setIsStatusDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ── Filtered list ───────────────────────────────────────────────────

  const filteredIps = ips.filter(
    (item) =>
      searchQuery === "" || item.ip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredIps.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedIps = filteredIps.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ── Actions ─────────────────────────────────────────────────────────

  const handleOpenActionModal = (item: { id: string; ip: string; status: string }) => {
    setSelectedIp(item);
    setModalStatus(item.status);
    setActionModalOpen(true);
  };

  const handleActionConfirm = () => {
    if (modalStatus === "Disabled") {
      setActionModalOpen(false);
      setConfirmDisableModalOpen(true);
    } else {
      // Just update if it's Enabled
      if (selectedIp) {
        setIps((prev) =>
          prev.map((i) => (i.id === selectedIp.id ? { ...i, status: modalStatus } : i))
        );
        toast.success("IP status updated successfully!");
      }
      setActionModalOpen(false);
    }
  };

  const handleDisableConfirm = () => {
    if (selectedIp) {
      setIps((prev) =>
        prev.map((i) => (i.id === selectedIp.id ? { ...i, status: "Disabled" } : i))
      );
      toast.success("IP Address disabled successfully!");
    }
    setConfirmDisableModalOpen(false);
  };

  // ── Pagination Render ───────────────────────────────────────────────

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const btn = (n: number) => (
      <button
        key={n}
        onClick={() => setCurrentPage(n)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
          currentPage === n
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
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {/* ── Search ───────────────────────────────────────────── */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search here......."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all shadow-sm"
          />
        </div>

        {/* ── IP Address Table ─────────────────────────────────── */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-2">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#CFF2F1]">
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-900">
                    IP ADDRESS
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-900 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedIps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="py-16 text-center text-gray-400 text-sm"
                    >
                      No IP addresses found.
                    </td>
                  </tr>
                ) : (
                  paginatedIps.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-[#fafbfc] transition-colors"
                    >
                      <td className="px-6 py-4 text-[14px] text-gray-700 font-medium">
                        {item.ip}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenActionModal(item)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-all focus:outline-none inline-flex"
                        >
                          <UnlockedIcon />
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
          <div className="flex items-center justify-center gap-2 py-2 mt-4">
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

      {/* ── Action Modal ────────────────────────────────────────── */}
      {actionModalOpen && selectedIp && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] relative flex flex-col animate-scaleUp overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h3 className="text-gray-900 font-bold text-[18px]">Action</h3>
              <button
                onClick={() => setActionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8 flex flex-col gap-2">
              <label className="text-[12px] text-gray-800 font-medium uppercase">
                IP ADDRESS
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={selectedIp.ip}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none shadow-sm"
                />
                
                {/* Custom Status Dropdown */}
                <div
                  className="relative min-w-[140px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-500 rounded-lg text-sm text-[#1b3d5b] font-medium transition-all focus:outline-none"
                  >
                    <span>{modalStatus}</span>
                    <HiOutlineChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isStatusDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isStatusDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                      {["Enabled", "Disabled"].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setModalStatus(s);
                            setIsStatusDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-all ${
                            modalStatus === s
                              ? "bg-[#0DBCBA] text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 pb-8 flex items-center justify-center mt-4">
              <button
                onClick={handleActionConfirm}
                className="w-full max-w-[280px] py-3.5 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-lg text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Disable Confirmation Modal ──────────────────────────── */}
      {confirmDisableModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-[460px] w-full relative flex flex-col items-center text-center animate-scaleUp">
            {/* Close */}
            <button
              onClick={() => setConfirmDisableModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
            >
              <FiX size={16} />
            </button>

            {/* Warning Icon */}
            <div className="w-20 h-20 rounded-2xl bg-[#FDE8E8] flex items-center justify-center mb-6 mt-2 shadow-sm">
              <svg
                className="w-11 h-11 text-[#E74C3C]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V9h2v5z" />
              </svg>
            </div>

            {/* Text */}
            <h4 className="text-gray-800 font-bold text-[19px] mb-8 px-4 leading-snug">
              Are you sure you want to disable this IP ADDRESS ?
            </h4>

            {/* Confirm Button */}
            <button
              onClick={handleDisableConfirm}
              className="w-full max-w-[300px] py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-md text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityFraud;
