import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiPaperclip,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Attachment {
  name: string;
  size: string;
  type: "pdf" | "image";
}

interface ChatEntry {
  sender: string;
  role: string;
  date: string;
  body: string;
  attachments?: Attachment[];
}

interface MessageItem {
  key: string;
  senderName: string;
  senderAvatar: string;
  subject: string;
  date: string;
  hasAttachment: boolean;
  chat: ChatEntry[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";

const generateMockMessages = (prefix: string, count: number): MessageItem[] =>
  Array.from({ length: count }, (_, i) => ({
    key: `${prefix}-${i + 1}`,
    senderName: i === 0 ? "Fahimhasan" : "Fahim Faisal",
    senderAvatar: avatarUrl,
    subject:
      i === 0
        ? "Payment not reflecting in account"
        : "Password Change Problem",
    date: "Oct 24,2026  11:20 AM",
    hasAttachment: i === 0,
    chat: [
      {
        sender: "You",
        role: "Support Team",
        date: "OCT 24,2026  11:20 AM",
        body: `Hello,\n\nThank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.\n\nTypically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated.\n\nBest regards,\nLinear Protocol Support`,
      },
      {
        sender: i === 0 ? "Fahim hasan" : "Fahim Faisal",
        role: "",
        date: "Oct 24,2026  11:20 AM",
        body: `I am writing regarding a recent transaction on my account that appears to have been processed twice. The transaction occurred on October 22nd for the amount of $149.00.\n\nI have checked my bank statement and can see two identical charges from "Linear Protocol" with the same timestamp. I only intended to purchase the Annual Pro Plan once.\n\nCould you please investigate this and process a refund for the duplicate charge as soon as possible? I have attached the invoice receipts for both transactions below for your reference.`,
        attachments: [
          { name: "Invoice_OCT_22_A.pdf", size: "1.2 MB", type: "pdf" },
          { name: "Bank_Statement.png", size: "3.5 MB", type: "image" },
        ],
      },
    ],
  }));

const inboxMessages = generateMockMessages("inbox", 30);
const sentMessages = generateMockMessages("sent", 25);

// ─── Component ───────────────────────────────────────────────────────────────

const Messages: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(
    null
  );
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const currentDataset = activeTab === "inbox" ? inboxMessages : sentMessages;

  const filteredMessages = currentDataset.filter((msg) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      msg.senderName.toLowerCase().includes(q) ||
      msg.subject.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMessages = filteredMessages.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredMessages.length / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ── Pagination ──────────────────────────────────────────────────────

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const btn = (n: number) => (
      <button
        key={n}
        onClick={() => setCurrentPage(n)}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
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
          <span key="dots" className="px-1 text-gray-400">
            ...
          </span>,
          btn(totalPages)
        );
      } else if (currentPage >= totalPages - 3) {
        items.push(
          btn(1),
          <span key="dots" className="px-1 text-gray-400">
            ...
          </span>
        );
        for (let i = totalPages - 5; i <= totalPages; i++) items.push(btn(i));
      } else {
        items.push(
          btn(1),
          <span key="d1" className="px-1 text-gray-400">
            ...
          </span>,
          btn(currentPage - 1),
          btn(currentPage),
          btn(currentPage + 1),
          <span key="d2" className="px-1 text-gray-400">
            ...
          </span>,
          btn(totalPages)
        );
      }
    }
    return items;
  };

  // ── Reply View (inline page) ────────────────────────────────────────

  const renderReplyView = () => {
    if (!selectedMessage) return null;
    return (
      <div className="flex flex-col gap-6">
        {/* Back Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setShowReply(false);
              setReplyText("");
            }}
            className="w-10 h-10 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Reply Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-0 flex flex-col">
            {/* To */}
            <div className="flex items-center border-b border-gray-200 py-4">
              <span className="text-gray-400 text-[14px] font-medium w-20 shrink-0">
                To:
              </span>
              <span className="text-gray-800 text-[15px] font-medium">
                {selectedMessage.chat[1]?.sender || selectedMessage.senderName}
              </span>
            </div>

            {/* Subject */}
            <div className="flex items-center border-b border-gray-200 py-4">
              <span className="text-[#0DBCBA] text-[14px] font-bold w-20 shrink-0">
                Subject:
              </span>
              <span className="text-gray-500 text-[14px]">
                Re: {selectedMessage.subject}
              </span>
            </div>
          </div>

          {/* Text Area */}
          <div className="px-8 pt-5 pb-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your message here..."
              className="w-full h-[260px] resize-none text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Hint */}
          <div className="px-8 pb-4">
            <p className="text-[12px] text-[#0DBCBA] font-medium">
              Please provide as much detail as possible.
            </p>
          </div>

          {/* Footer */}
          <div className="bg-[#f5f6f8] px-8 py-5 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3 w-full">
              <button
                onClick={() => {
                  setShowReply(false);
                  setReplyText("");
                }}
                className="flex-1 max-w-[300px] py-3.5 bg-gray-300 text-gray-700 rounded-lg text-[15px] font-bold hover:bg-gray-400 transition-all focus:outline-none"
              >
                Send
              </button>
              <button className="w-12 h-12 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all focus:outline-none">
                <FiPaperclip size={20} />
              </button>
            </div>
            <p className="text-[12px] text-gray-400">
              Your message will be added to Support TKT-1001
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ── Detail View ─────────────────────────────────────────────────────

  const renderDetailView = () => {
    if (!selectedMessage) return null;
    return (
      <div className="flex flex-col gap-6">
        {/* Back Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setSelectedMessage(null)}
            className="w-10 h-10 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        {selectedMessage.chat.map((entry, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="px-7 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-gray-800 font-bold text-[15px]">
                  {entry.sender}
                </span>
                {entry.role && (
                  <span className="text-gray-400 text-[13px] font-medium">
                    {entry.role}
                  </span>
                )}
              </div>
              <span className="text-gray-400 text-[12px] font-medium tracking-wide">
                {entry.date}
              </span>
            </div>

            {/* Chat Body */}
            <div className="px-7 py-6">
              <div className="border-l-[3px] border-[#0DBCBA] pl-5">
                {entry.body.split("\n").map((line, li) => (
                  <p
                    key={li}
                    className={`text-[14px] leading-[1.8] ${
                      line.trim() === ""
                        ? "h-4"
                        : "text-gray-700"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Attachments */}
              {entry.attachments && entry.attachments.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FiPaperclip size={14} className="text-gray-400" />
                    <span className="text-[12px] text-gray-500 font-semibold tracking-widest uppercase">
                      {entry.attachments.length} Attachments
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {entry.attachments.map((att, ai) => (
                      <div
                        key={ai}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                      >
                        {/* File Icon */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${
                            att.type === "pdf" ? "bg-[#5B7FFF]" : "bg-[#5B7FFF]"
                          }`}
                        >
                          {att.type === "pdf" ? (
                            <svg
                              width="18"
                              height="18"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="18"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                              />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-800 text-[13px] font-semibold leading-tight">
                            {att.name}
                          </span>
                          <span className="text-gray-400 text-[11px]">
                            {att.size}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Reply Button */}
        <div className="flex justify-center mt-2 mb-4">
          <button
            onClick={() => setShowReply(true)}
            className="w-full max-w-[380px] py-3.5 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-lg text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
          >
            Reply
          </button>
        </div>
      </div>
    );
  };

  // ── List View ───────────────────────────────────────────────────────

  const renderListView = () => (
    <div className="flex flex-col gap-6">
      {/* Search + Back */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-xl">
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
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm shrink-0"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`px-7 py-2 rounded-full text-[13px] font-semibold transition-all focus:outline-none ${
            activeTab === "inbox"
              ? "bg-[#0DBCBA] text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Inbox
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-7 py-2 rounded-full text-[13px] font-semibold transition-all focus:outline-none ${
            activeTab === "sent"
              ? "bg-[#0DBCBA] text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Sent
        </button>
      </div>

      {/* Message List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {paginatedMessages.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            No messages found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {paginatedMessages.map((msg) => (
              <button
                key={msg.key}
                onClick={() => setSelectedMessage(msg)}
                className="w-full flex items-center gap-4 px-6 py-5 hover:bg-[#f9fafb] transition-all text-left group"
              >
                {/* Avatar */}
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-[14px] leading-tight truncate">
                    {msg.senderName}
                  </p>
                  <p className="text-gray-500 text-[13px] mt-0.5 truncate">
                    {msg.subject}
                  </p>
                </div>

                {/* Date */}
                <span className="text-gray-400 text-[12px] font-medium whitespace-nowrap shrink-0">
                  {msg.date}
                </span>

                {/* Indicator */}
                <div className="shrink-0 ml-1">
                  {msg.hasAttachment ? (
                    <FiPaperclip
                      size={16}
                      className="text-gray-400 group-hover:text-[#0DBCBA] transition-colors"
                    />
                  ) : (
                    <FiArrowRight
                      size={16}
                      className="text-[#0DBCBA] opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all focus:outline-none"
          >
            <FiArrowLeft size={16} />
          </button>
          {renderPaginationItems()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all focus:outline-none"
          >
            <FiArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );

  // ── Main Render ─────────────────────────────────────────────────────

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-[900px] mx-auto">
        {selectedMessage
          ? showReply
            ? renderReplyView()
            : renderDetailView()
          : renderListView()}
      </div>
    </div>
  );
};

export default Messages;
