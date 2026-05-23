import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiDownload,
  FiCalendar,
  FiChevronLeft,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";

// ─── Data ────────────────────────────────────────────────────────────────────

interface ChatLogItem {
  id: string;
  chatId: string;
  swapper1: string;
  swapper2: string;
  type: "Direct" | "Swap";
  timestamp: string;
  country: string;
}

const mockChatLogs: ChatLogItem[] = Array.from({ length: 45 }, (_, i) => ({
  id: String(i + 1),
  chatId: "#1B464",
  swapper1: "Bob Builder",
  swapper2: "Fahim",
  type: i % 2 === 0 ? "Direct" : "Swap",
  timestamp: "Oct 24, 14:32:01 UTC",
  country: "Pakistan",
}));

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
  type: "primary" | "secondary"; // primary = teal, secondary = grey
  avatar: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "Bob Builder",
    text: "Hello! Nazrul How are you?",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: false,
    type: "primary",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "2",
    sender: "Fahim Hasan",
    text: "You did your job well!",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: true,
    type: "primary",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    sender: "Fahim Hasan",
    text: "You did your job well!",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: true,
    type: "primary",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "4",
    sender: "Bob Builder",
    text: "Have a great working week!",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: false,
    type: "primary",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "5",
    sender: "Bob Builder",
    text: "Hope you like it",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: false,
    type: "primary",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "6",
    sender: "Fahim Hasan",
    text: "You did your job well!",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: true,
    type: "primary",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "7",
    sender: "Fahim Hasan",
    text: "Give me bank details",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: true,
    type: "secondary",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "8",
    sender: "Fahim Hasan",
    text: "or give me your phone number",
    timestamp: "Oct 24, 14:32:01 UTC",
    isSelf: true,
    type: "secondary",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const ChatLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("2026-03-28");
  const [toDate, setToDate] = useState("2026-03-28");
  const [countryFilter, setCountryFilter] = useState("Pakistan");
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const [selectedChat, setSelectedChat] = useState<ChatLogItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => setIsCountryOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, countryFilter]);

  // ── Filtered list ───────────────────────────────────────────────────

  const filteredLogs = mockChatLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.swapper1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.swapper2.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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

  // ── Render List View ────────────────────────────────────────────────

  const renderListView = () => (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Search */}
        <div className="relative w-full max-w-[280px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by swapper name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          {/* Date Range */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <FiCalendar size={16} className="text-gray-400" />
            <span className="text-[13px] text-gray-600 font-medium">From :</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="text-[13px] text-gray-700 font-medium bg-transparent border-none focus:outline-none w-[110px]"
            />
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <span className="text-[13px] text-gray-600 font-medium">To :</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="text-[13px] text-gray-700 font-medium bg-transparent border-none focus:outline-none w-[110px]"
            />
          </div>

          {/* Country Filter */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm min-w-[120px] justify-between"
            >
              <span>{countryFilter}</span>
              <HiOutlineChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCountryOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                {["Pakistan", "USA", "UK"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCountryFilter(c);
                      setIsCountryOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                      countryFilter === c
                        ? "bg-[#0DBCBA] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="px-6 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#CFF2F1]">
                <th className="px-6 py-4 text-[14px] font-bold text-gray-800 whitespace-nowrap">
                  Chat ID
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-800 whitespace-nowrap">
                  Swappers
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-800 whitespace-nowrap">
                  Type
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-800 whitespace-nowrap">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-800 whitespace-nowrap text-right pr-10">
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
                    No chat logs found.
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-gray-100 hover:bg-[#fafbfc] transition-colors"
                  >
                    <td className="px-6 py-5 text-[14px] text-gray-800 font-medium">
                      {log.chatId}
                    </td>
                    <td className="px-6 py-5 text-[14px] text-gray-600 font-medium">
                      {log.swapper1} <span className="text-gray-300 mx-2">-</span> {log.swapper2}
                    </td>
                    <td className="px-6 py-5 text-[14px] text-gray-600 font-medium">
                      {log.type}
                    </td>
                    <td className="px-6 py-5 text-[13px] text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-5 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedChat(log)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-[#0DBCBA] hover:bg-[#f0fdfc] transition-colors focus:outline-none"
                        >
                          <FiEye size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-[#0DBCBA] hover:bg-[#f0fdfc] transition-colors focus:outline-none">
                          <FiDownload size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-2 mt-2">
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
  );

  // ── Render Detail View ──────────────────────────────────────────────

  const renderDetailView = () => {
    if (!selectedChat) return null;
    return (
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedChat(null)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all focus:outline-none shadow-sm"
          >
            <FiChevronLeft size={22} />
          </button>
          <h2 className="text-[20px] font-bold text-[#1b3d5b]">
            Chat ID : {selectedChat.chatId}
          </h2>
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[600px] flex flex-col gap-6">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 w-full max-w-[80%] ${
                msg.isSelf ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative">
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Message Content */}
              <div className={`flex flex-col gap-1 ${msg.isSelf ? "items-end" : "items-start"}`}>
                <span className="text-[11px] font-bold text-gray-700 mx-1">
                  {msg.sender}
                </span>

                <div
                  className={`px-5 py-3 rounded-2xl shadow-sm text-[13px] leading-snug ${
                    msg.isSelf
                      ? msg.type === "primary"
                        ? "bg-[#0DBCBA] text-white rounded-tr-sm"
                        : "bg-[#B0B0B0] text-white rounded-tr-sm"
                      : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-gray-400 mx-1 mt-0.5">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Main Layout ─────────────────────────────────────────────────────

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-[1200px] mx-auto">
        {selectedChat ? renderDetailView() : renderListView()}
      </div>
    </div>
  );
};

export default ChatLogs;
