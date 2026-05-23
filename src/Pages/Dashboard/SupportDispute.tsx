import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiSliders,
  FiX,
  FiArrowLeft,
  FiArrowRight,
  FiPaperclip,
  FiCalendar,
  FiShield,
  FiAlertTriangle,
  FiMessageSquare,
  FiFileText,
  FiImage,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

interface SupportDisputeItem {
  id: string; // e.g. TKT-1002
  subject: string;
  date: string;
  status: "Open" | "Closed";
  type: "Support" | "Dispute";
  ticketNumber: string; // e.g. #TKT-2024-0325-7890
  dateTimeText: string; // March 25, 2024 at 2:30 PM
  description: string;
  toUser: string;
  subjectReply: string;
  attachments?: { name: string; size: string; type: "pdf" | "image" }[];
  replies?: {
    sender: string;
    role: string;
    isOfficial?: boolean;
    date: string;
    message: string;
  }[];
}

const initialTickets: SupportDisputeItem[] = [
  {
    id: "TKT-1002",
    subject: "Payment not reflecting in account",
    date: "2/2/2026",
    status: "Open",
    type: "Support",
    ticketNumber: "#TKT-2024-0325-7890",
    dateTimeText: "OCT 24, 2026  11:20 AM",
    description: "I am writing regarding a recent transaction on my account that appears to have been processed twice. The transaction occurred on October 22nd for the amount of $149.00.\n\nI have checked my bank statement and can see two identical charges from \"Linear Protocol\" with the same timestamp. I only intended to purchase the Annual Pro Plan once.\n\nCould you please investigate this and process a refund for the duplicate charge as soon as possible? I have attached the invoice receipts for both transactions below for your reference.",
    toUser: "fahimhasan",
    subjectReply: "Re: Payment not reflecting in account",
    attachments: [
      { name: "Invoice_OCT_22_A.pdf", size: "1.2 MB", type: "pdf" },
      { name: "Bank_Statement.png", size: "3.5 MB", type: "image" },
    ],
    replies: [
      {
        sender: "Support Team",
        role: "OFFICIAL",
        isOfficial: true,
        date: "OCT 24, 2026  11:20 AM",
        message: "Hello,\n\nThank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.\n\nTypically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated.\n\nBest regards,\nLinear Protocol Support",
      },
    ],
  },
  {
    id: "TKT-1001",
    subject: "Password Change Problem",
    date: "2/2/2026",
    status: "Closed",
    type: "Support",
    ticketNumber: "#TKT-2024-0325-7891",
    dateTimeText: "October 20, 2026 at 9:15 AM",
    description: "I am unable to reset my password using the standard verify otp page. It shows an invalid token error. Please assist.",
    toUser: "fahimhasan",
    subjectReply: "Re: Password Change Problem",
  },
  {
    id: "TKT-1001",
    subject: "Dispute",
    date: "2/2/2026",
    status: "Closed",
    type: "Dispute",
    ticketNumber: "#TKT-2024-0325-7890",
    dateTimeText: "March 25, 2024 at 2:30 PM",
    description: "I was charged $99.99 on March 25th but I never authorized this payment. I need a refund immediately.",
    toUser: "fahimhasan",
    subjectReply: "Re: Unauthorized charge dispute",
  },
  {
    id: "TKT-1001",
    subject: "Dispute",
    date: "2/2/2026",
    status: "Open",
    type: "Dispute",
    ticketNumber: "#TKT-2024-0325-7892",
    dateTimeText: "April 10, 2026 at 3:45 PM",
    description: "The buyer claims they sent the payment but I have not received it in my bank account. Please review their payment proof.",
    toUser: "fahimhasan",
    subjectReply: "Re: Pending transfer dispute",
  },
];

// Add dummy data for pagination testing
for (let i = 5; i <= 20; i++) {
  initialTickets.push({
    id: `TKT-10${i}`,
    subject: i % 2 === 0 ? "Payment failure on swap" : "Verification delay",
    date: "2/2/2026",
    status: i % 3 === 0 ? "Closed" : "Open",
    type: i % 2 === 0 ? "Support" : "Dispute",
    ticketNumber: `#TKT-2024-0325-79${i}`,
    dateTimeText: "October 28, 2026 at 4:10 PM",
    description: `This is a generated ${i % 2 === 0 ? "support ticket" : "dispute ticket"} for automated list pagination.`,
    toUser: "fahimhasan",
    subjectReply: `Re: Ticket 10${i}`,
  });
}

const SupportDispute: React.FC = () => {
  // Main data state
  const [tickets, setTickets] = useState<SupportDisputeItem[]>(initialTickets);

  // Tabs: support | dispute
  const [activeTab, setActiveTab] = useState<"support" | "dispute">("support");

  // Filter Overlay Panel toggle
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Filter parameters
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Selected ticket for Detail View
  const [selectedTicket, setSelectedTicket] = useState<SupportDisputeItem | null>(null);

  // View state machine: list | details | reply
  const [viewMode, setViewMode] = useState<"list" | "details" | "reply">("list");

  // Close Dispute Confirmation Dialog popup state
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

  // Reply Form States
  const [replyMessage, setReplyMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation stack when details view opens or replies list changes
  useEffect(() => {
    if (viewMode === "details") {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [viewMode, selectedTicket?.replies]);

  // Close filter panel on clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsFilterPanelOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const tabMatch = activeTab === "support" ? ticket.type === "Support" : ticket.type === "Dispute";
    const statusMatch = statusFilter === "All" || ticket.status === statusFilter;
    const searchMatch =
      searchQuery === "" ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return tabMatch && statusMatch && searchMatch;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, countryFilter, searchQuery]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  const handleRowClick = (ticket: SupportDisputeItem) => {
    setSelectedTicket(ticket);
    setViewMode("details");
  };

  const handleMarkClosed = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: "Closed" as const } : t))
    );
    // Also update selected ticket state if currently opened in details
    setSelectedTicket((prev) => (prev && prev.id === ticketId ? { ...prev, status: "Closed" as const } : prev));
    toast.success(`Ticket ${ticketId} status updated to Closed successfully!`);
    setViewMode("list");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicket) {
      toast.error("Please write a message before sending.");
      return;
    }

    const newReply = {
      sender: "Support Team",
      role: "OFFICIAL",
      isOfficial: true,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }).replace(",", " "),
      message: replyMessage,
    };

    // Update tickets array state
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === selectedTicket.id) {
          return {
            ...t,
            replies: [...(t.replies || []), newReply],
          };
        }
        return t;
      })
    );

    // Update selectedTicket state
    setSelectedTicket((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        replies: [...(prev.replies || []), newReply],
      };
    });

    toast.success("Reply message sent successfully!");
    setViewMode("details");
    setReplyMessage("");
  };

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
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
          currentPage === pageNumber
            ? "bg-[#0DBCBA] text-white shadow-md shadow-[#0dbcba]/25"
            : "bg-white border border-gray-150 text-gray-500 hover:bg-gray-50 shadow-sm"
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
          <span key="dots" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      } else if (currentPage >= totalPages - 3) {
        items.push(renderButton(1));
        items.push(
          <span key="dots" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        for (let i = totalPages - 5; i <= totalPages; i++) {
          items.push(renderButton(i));
        }
      } else {
        items.push(renderButton(1));
        items.push(
          <span key="dots1" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(renderButton(i));
        }
        items.push(
          <span key="dots2" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      }
    }

    return items;
  };

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* VIEW MODE: TICKET LISTS */}
        {viewMode === "list" && (
          <>
            {/* Header tabs navigation */}
            <div className="flex gap-8 items-center pb-2">
              <button
                onClick={() => setActiveTab("support")}
                className={`pb-2 text-[16px] font-bold transition-all relative focus:outline-none ${
                  activeTab === "support" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Support
                {activeTab === "support" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("dispute")}
                className={`pb-2 text-[16px] font-bold transition-all relative focus:outline-none ${
                  activeTab === "dispute" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Dispute
                {activeTab === "dispute" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-full" />
                )}
              </button>
            </div>

            {/* Search bar & Filter trigger */}
            <div className="flex items-center gap-3 w-full max-w-xl relative">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <FiSearch size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Search here......."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all shadow-sm"
                />
              </div>

              {/* Filter Slider toggle button */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="w-11 h-11 rounded-xl bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
                  title="Filters"
                >
                  <FiSliders size={18} />
                </button>

                {/* Filter Floating Dropdown Panel */}
                {isFilterPanelOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 z-50 flex flex-col gap-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-955 font-bold text-base">Filter</span>
                      <button
                        onClick={() => setIsFilterPanelOpen(false)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <FiX size={18} />
                      </button>
                    </div>

                    {/* Status select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-700 font-bold text-xs">Status</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all cursor-pointer"
                      >
                        <option value="All">All</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Country select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-700 font-bold text-xs">Country</label>
                      <select
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all cursor-pointer"
                      >
                        <option value="All">All</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>

                    {/* Bottom Clear/Apply actions */}
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => {
                          setStatusFilter("All");
                          setCountryFilter("All");
                          setIsFilterPanelOpen(false);
                        }}
                        className="flex-1 py-2.5 border border-[#0DBCBA] text-[#0DBCBA] rounded-xl text-xs font-semibold hover:bg-slate-55 transition-all focus:outline-none"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setIsFilterPanelOpen(false)}
                        className="flex-1 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-xs font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tickets row list */}
            <div className="flex flex-col gap-4">
              {paginatedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleRowClick(ticket)}
                  className="w-full bg-white border border-gray-150 rounded-xl p-5 flex justify-between items-center hover:bg-slate-50/50 hover:border-gray-300 transition-all cursor-pointer shadow-sm select-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-semibold text-[11px]">{ticket.id}</span>
                    <span className="text-gray-800 font-bold text-[15px]">{ticket.subject}</span>
                    <span className="text-gray-400 font-medium text-[10px]">{ticket.date}</span>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    {ticket.type === "Dispute" && (
                      <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#FDF2E9] text-[#E67E22] border border-[#FBD38D]/40">
                        Dispute
                      </span>
                    )}
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold border ${
                        ticket.status === "Open"
                          ? "bg-[#E8F7F7] text-[#0DBCBA] border-[#0DBCBA]/30"
                          : "bg-[#F3F4F6] text-[#9CA3AF] border-[#E5E7EB]"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
              {filteredTickets.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-150 text-gray-400 text-sm shadow-sm">
                  No tickets found matching filters.
                </div>
              )}
            </div>

            {/* Custom Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiArrowLeft size={20} />
                </button>

                {renderPaginationItems()}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiArrowRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {/* VIEW MODE: TICKET DETAILS PAGE */}
        {viewMode === "details" && selectedTicket && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-scaleUp">
            {/* Top Header section */}
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-gray-900 font-bold text-lg leading-none">
                {selectedTicket.type}
              </h3>

              {/* Close button to return to ticket lists */}
              <button
                onClick={() => setViewMode("list")}
                className="w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
              >
                <FiX size={18} />
              </button>
            </div>

            {selectedTicket.type === "Dispute" ? (
              /* Dispute Detail Layout (Image 3) */
              <div className="w-full flex flex-col gap-4 border border-gray-155 rounded-2xl p-6 bg-white shadow-sm">
                <span className="text-gray-400 text-xs font-semibold">To: Support Team</span>

                <div className="flex flex-col gap-3.5 mt-2">
                  <div className="flex items-center gap-3 text-xs">
                    <FiFileText size={16} className="text-gray-400 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Dispute ID</span>
                      <span className="text-gray-800 font-bold mt-0.5 text-[13px]">{selectedTicket.ticketNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <FiCalendar size={16} className="text-gray-400 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Date & Time</span>
                      <span className="text-gray-800 font-bold mt-0.5 text-[13px]">{selectedTicket.dateTimeText}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <FiShield size={16} className="text-gray-400 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Status</span>
                      <span className="flex items-center gap-1.5 text-gray-800 font-bold mt-0.5 text-[13px]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0DBCBA] shrink-0" />
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <FiAlertTriangle size={16} className="text-gray-400 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Dispute Subject</span>
                      <span className="text-gray-800 font-bold mt-0.5 text-[13px]">Unauthorized charge on my account</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs mt-1">
                    <FiMessageSquare size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col flex-1">
                      <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Description</span>
                      <div className="bg-[#f8f9fa] border border-gray-150 rounded-xl p-4 mt-1.5 text-gray-700 leading-relaxed font-medium text-[13px]">
                        {selectedTicket.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Support Detail Layout (Image 4 & 1) - Multiple messages replies stack */
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-semibold px-1">
                  <span className="text-gray-900 font-bold text-base">Payment Inquiry</span>
                  <span className="text-gray-400 font-medium">{selectedTicket.ticketNumber}</span>
                </div>

                {/* Scrollable messages conversation stack */}
                <div className="w-full flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                  {/* Customer Card (Message 1) */}
                  <div className="border border-gray-150 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center text-[11px] font-semibold border-b border-gray-100 pb-2">
                      <span className="text-gray-900 font-bold">
                        You <span className="text-gray-400 font-medium ml-1">Customer</span>
                      </span>
                      <span className="text-gray-400">{selectedTicket.dateTimeText}</span>
                    </div>

                    <p className="text-gray-600 text-xs leading-relaxed font-medium whitespace-pre-line pr-2">
                      {selectedTicket.description}
                    </p>

                    {/* Attachments Section */}
                    {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                      <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-gray-100">
                        <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wide flex items-center gap-1.5">
                          <FiPaperclip size={13} /> {selectedTicket.attachments.length} Attachments
                        </span>

                        <div className="flex flex-col sm:flex-row gap-3">
                          {selectedTicket.attachments.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 flex-1 shadow-sm"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-55 border border-gray-150 flex items-center justify-center text-gray-500 shrink-0">
                                {file.type === "pdf" ? <FiFileText size={16} /> : <FiImage size={16} />}
                              </div>
                              <div className="flex flex-col truncate">
                                <span className="text-gray-800 font-bold text-[11px] truncate">{file.name}</span>
                                <span className="text-gray-400 text-[10px] font-medium mt-0.5">{file.size}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Divider 1: SUPPORT OPENED BY SYSTEM */}
                  <div className="w-full text-center py-1 select-none">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest text-center block">
                      Support opened by system
                    </span>
                  </div>

                  {/* Official Replies Loop */}
                  {selectedTicket.replies && selectedTicket.replies.length > 0 ? (
                    selectedTicket.replies.map((reply, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-150 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4"
                      >
                        <div className="flex justify-between items-center text-[11px] font-semibold border-b border-gray-100 pb-2">
                          <span className="text-gray-900 font-bold flex items-center">
                            {reply.sender}
                            {reply.isOfficial && (
                              <span className="bg-[#E2E8F0] text-gray-600 rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider ml-2 select-none">
                                {reply.role}
                              </span>
                            )}
                          </span>
                          <span className="text-gray-400">{reply.date}</span>
                        </div>

                        <p className="text-gray-700 text-xs leading-relaxed font-medium whitespace-pre-line pr-2">
                          {reply.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    /* Default Official Reply Fallback */
                    <div className="border border-gray-150 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-center text-[11px] font-semibold border-b border-gray-100 pb-2">
                        <span className="text-gray-900 font-bold flex items-center">
                          Support Team
                          <span className="bg-[#E2E8F0] text-gray-600 rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider ml-2 select-none">
                            OFFICIAL
                          </span>
                        </span>
                        <span className="text-gray-400">{selectedTicket.dateTimeText}</span>
                      </div>

                      <p className="text-gray-700 text-xs leading-relaxed font-medium whitespace-pre-line pr-2">
                        Hello,{"\n\n"}Thank you for reaching out. We have received your inquiry. An agent has been assigned to investigate your request and will follow up shortly.{"\n\n"}Best regards,{"\n"}Linear Protocol Support
                      </p>
                    </div>
                  )}

                  {/* Divider 2: STATUS CHANGED TO PENDING */}
                  <div className="w-full text-center py-1 select-none">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest text-center block">
                      Status changed to pending
                    </span>
                  </div>
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Bottom detail action buttons */}
            <div className="flex gap-4 w-full mt-2">
              <button
                onClick={() => setViewMode("reply")}
                className="flex-1 py-3 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/10"
              >
                Respond
              </button>
              <button
                onClick={() => setIsCloseConfirmOpen(true)}
                className="flex-1 py-3 bg-white border border-[#0DBCBA] text-[#0DBCBA] rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all focus:outline-none"
              >
                Mark as Closed
              </button>
            </div>
          </div>
        )}

        {/* VIEW MODE: REPLY / COMPOSE FORM PAGE */}
        {viewMode === "reply" && selectedTicket && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-scaleUp">
            {/* Top Header section */}
            <div className="flex justify-between items-center pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("details")}
                  className="w-8 h-8 rounded-full border border-gray-250 bg-white flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all focus:outline-none mr-1"
                >
                  <FiArrowLeft size={16} />
                </button>
                <h3 className="text-gray-900 font-bold text-lg leading-none">
                  Payment Inquiry
                </h3>
              </div>

              {/* Close button to return to ticket lists */}
              <button
                onClick={() => setViewMode("list")}
                className="w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
              >
                <FiX size={18} />
              </button>
            </div>

            <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1.5 px-1">
              <FiCalendar size={13} /> Created Oct 24, 2023
            </span>

            <div className="border border-gray-150 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col min-h-[300px]">
              {/* To Subject Fields */}
              <div className="px-6 py-4 flex flex-col gap-3">
                <div className="flex items-center py-2 border-b border-gray-100 text-xs">
                  <span className="text-gray-400 font-medium w-16 shrink-0">To:</span>
                  <span className="text-gray-800 font-bold">{selectedTicket.toUser}</span>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100 text-xs">
                  <span className="text-gray-400 font-medium w-16 shrink-0">Subject:</span>
                  <span className="text-gray-800 font-bold">{selectedTicket.subjectReply}</span>
                </div>
                
                {/* Message textarea body */}
                <textarea
                  placeholder="Write your message here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full flex-1 mt-3 text-xs text-[#4E4E4E] placeholder-gray-400 border-none outline-none resize-none min-h-[140px]"
                />
              </div>

              {/* Actions Footer (Matching image 5 footer layout exactly) */}
              <div className="border-t border-gray-155 bg-[#F8F9FA] px-6 py-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 w-full justify-center">
                  <button
                    onClick={handleSendReply}
                    className={`w-36 py-2.5 text-white rounded-xl text-xs font-semibold transition-all focus:outline-none shadow-sm ${
                      replyMessage.trim() ? "bg-[#0DBCBA] hover:bg-[#0aa6a4]" : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!replyMessage.trim()}
                  >
                    Send
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-250 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-55 transition-all shadow-sm focus:outline-none"
                    title="Attach file"
                  >
                    <FiPaperclip size={15} />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={() => toast.success("File attached!")} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 select-none">
                  Your message will be added to Support {selectedTicket.id}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Close Ticket/Dispute Confirmation Modal (Image 2) */}
      {isCloseConfirmOpen && selectedTicket && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[420px] w-full mx-4 relative flex flex-col items-center text-center border border-gray-100">
            {/* Close button top right */}
            <button
              onClick={() => setIsCloseConfirmOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
            >
              <FiX size={18} />
            </button>

            {/* Warning triangle in pink square */}
            <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] flex items-center justify-center mb-6 mt-2">
              <FiAlertTriangle size={28} className="text-[#EF4444]" />
            </div>

            {/* Confirmation query */}
            <h4 className="text-gray-900 font-bold text-lg mb-6 leading-snug">
              Are you sure you want to close the dispute?
            </h4>

            {/* Confirm button */}
            <button
              onClick={() => {
                setIsCloseConfirmOpen(false);
                handleMarkClosed(selectedTicket.id);
              }}
              className="w-full py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-sm font-semibold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/15"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportDispute;
