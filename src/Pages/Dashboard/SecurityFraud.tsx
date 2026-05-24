import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiX,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

// ─── Icons ───────────────────────────────────────────────────────────────────


// ─── Data ────────────────────────────────────────────────────────────────────

const mockData = Array.from({ length: 45 }, (_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  ip: `192.168.1.${100 + i}`,
  status: i % 5 === 0 ? "Locked" : "Unlocked",
}));

// ─── Component ───────────────────────────────────────────────────────────────

const SecurityFraud: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ips, setIps] = useState(mockData);

  // Modal states
  const [confirmLockModalOpen, setConfirmLockModalOpen] = useState(false);
  const [selectedIp, setSelectedIp] = useState<{ id: string; name: string; email: string; ip: string; status: string } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);



  // ── Filtered list ───────────────────────────────────────────────────

  const filteredIps = ips.filter(
    (item) =>
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredIps.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedIps = filteredIps.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ── Actions ─────────────────────────────────────────────────────────

  const handleToggleLockClick = (item: { id: string; name: string; email: string; ip: string; status: string }) => {
    if (item.status === "Unlocked") {
      // Prompt to lock
      setSelectedIp(item);
      setConfirmLockModalOpen(true);
    } else {
      // If already locked, unlock it directly or could also have a confirmation
      setIps((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "Unlocked" } : i))
      );
      toast.success("IP Address unlocked successfully!");
    }
  };

  const handleLockConfirmYes = () => {
    if (selectedIp) {
      setIps((prev) =>
        prev.map((i) => (i.id === selectedIp.id ? { ...i, status: "Locked" } : i))
      );
      toast.success("IP Address locked successfully!");
    }
    setConfirmLockModalOpen(false);
  };

  const handleLockConfirmNo = () => {
    setConfirmLockModalOpen(false);
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
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-900 w-1/4">
                    USER NAME
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-900 w-1/4">
                    EMAIL
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-900 w-1/4">
                    IP ADDRESS
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-900 text-right w-1/4">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedIps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-16 text-center text-gray-400 text-sm"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  paginatedIps.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-[#fafbfc] transition-colors"
                    >
                      <td className="px-6 py-4 text-[14px] text-gray-700 font-medium">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-gray-500">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-gray-700 font-medium">
                        {item.ip}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleToggleLockClick(item)}
                          className={`p-2 rounded-lg transition-all focus:outline-none inline-flex items-center justify-center ${item.status === "Locked"
                            ? "bg-red-50 text-red-500 hover:bg-red-100"
                            : "bg-teal-50 text-teal-600 hover:bg-teal-100"
                            }`}
                          title={item.status === "Locked" ? "Unlock IP" : "Lock IP"}
                        >
                          {item.status === "Locked" ? <FiLock size={18} /> : <FiUnlock size={18} />}
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

      {/* ── Lock Confirmation Modal ──────────────────────────── */}
      {confirmLockModalOpen && selectedIp && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-[460px] w-full relative flex flex-col items-center text-center animate-scaleUp">
            {/* Close */}
            <button
              onClick={handleLockConfirmNo}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
            >
              <FiX size={16} />
            </button>

            {/* Warning Icon */}
            <div className="w-16 h-16 rounded-full bg-[#FDE8E8] flex items-center justify-center mb-6 mt-2 shadow-sm">
              <FiLock className="w-8 h-8 text-[#E74C3C]" />
            </div>

            {/* Text */}
            <h4 className="text-gray-800 font-bold text-[19px] mb-8 px-4 leading-snug">
              Do you really want to lock this IP?
            </h4>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={handleLockConfirmYes}
                className="flex-1 py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
              >
                Yes
              </button>
              <button
                onClick={handleLockConfirmNo}
                className="flex-1 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[15px] font-bold transition-all focus:outline-none shadow-sm"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityFraud;
