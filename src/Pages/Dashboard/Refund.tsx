import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiX,
  FiArrowLeft,
  FiArrowRight,
  FiMoreVertical,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface RefundRequest {
  key: string;
  id: string;
  name: string;
  username: string;
  transactionId: string;
  amount: string;
  reason: string;
  requestedDate: string;
  status: "Active" | "Closed";
  // Detail views fields
  swapId: string;
  swapDate: string;
  swapFrom: string;
  swapTo: string;
  exchangeRate: string;
  refundAmount: string;
  platformFee: string;
  feeType: string;
  description: string;
  country: string;
}

const mockRefundRequests: RefundRequest[] = [
  {
    key: "1",
    id: "01",
    name: "Md Shakir Ahmed",
    username: "Fahimhasan123",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "2",
    id: "02",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Closed",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "3",
    id: "03",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "4",
    id: "04",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "5",
    id: "05",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "6",
    id: "06",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "7",
    id: "07",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "8",
    id: "08",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "9",
    id: "09",
    name: "Md Shakir Ahmed",
    username: "shakir_ahmed99",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Time Expired",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Platform Access Fee",
    description: "The Swapper Confirmed Receipt But Never Sent The Funds To My Account. I Have Waited 5 Days And Reached Out Multiple Times With No Response.",
    country: "Pakistan",
  },
  {
    key: "10",
    id: "10",
    name: "John Doe",
    username: "johndoe7",
    transactionId: "T-88291",
    amount: "$150",
    reason: "Verification Issue",
    requestedDate: "2026-04-12",
    status: "Active",
    swapId: "T-88291",
    swapDate: "2026-04-12",
    swapFrom: "UK",
    swapTo: "PAKISTAN",
    exchangeRate: "1 GBP = 350 PKR",
    refundAmount: "$15.00",
    platformFee: "$5.00",
    feeType: "Premium Shield Fee",
    description: "The other user did not release assets after confirming bank receipt.",
    country: "United States",
  },
  {
    key: "11",
    id: "11",
    name: "Rahim Ali",
    username: "rahimali",
    transactionId: "T-99231",
    amount: "$80",
    reason: "Expired Session",
    requestedDate: "2026-04-18",
    status: "Closed",
    swapId: "T-99231",
    swapDate: "2026-04-18",
    swapFrom: "UAE",
    swapTo: "BANGLADESH",
    exchangeRate: "1 AED = 32 BDT",
    refundAmount: "$8.00",
    platformFee: "$4.00",
    feeType: "Platform Access Fee",
    description: "Session timed out during swap operation.",
    country: "Bangladesh",
  }
];

const mockSafetyShieldRequests: RefundRequest[] = [
  {
    key: "1",
    id: "01",
    name: "Md Shakir Ahmed",
    username: "Fahimhasan123",
    transactionId: "T-54321",
    amount: "$50",
    reason: "Safety Violation",
    requestedDate: "2026-03-28",
    status: "Active",
    swapId: "T-54321",
    swapDate: "2026-03-28",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$2.50",
    platformFee: "$2.50",
    feeType: "Safety Shield Fee",
    description: "The seller attempted to request offline payments outside the platform rules.",
    country: "Pakistan",
  },
  {
    key: "2",
    id: "02",
    name: "Sarah Connors",
    username: "terminator_fan",
    transactionId: "T-11920",
    amount: "$200",
    reason: "Scam Attempt",
    requestedDate: "2026-03-30",
    status: "Closed",
    swapId: "T-11920",
    swapDate: "2026-03-30",
    swapFrom: "USA",
    swapTo: "PAKISTAN",
    exchangeRate: "1 USD = 278 PKR",
    refundAmount: "$10.00",
    platformFee: "$10.00",
    feeType: "Safety Shield Fee",
    description: "Scammer tried to send a fake screenshot of payment confirmation.",
    country: "United States",
  }
];

const Refund: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"admin" | "safety">("admin");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [activeDropdownRowKey, setActiveDropdownRowKey] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RefundRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"approve" | "reject" | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdownRowKey(null);
      setIsCountryOpen(false);
      setIsStatusOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const currentDataset = activeTab === "admin" ? mockRefundRequests : mockSafetyShieldRequests;

  const filteredRequests = currentDataset.filter((req) => {
    const matchesSearch =
      searchQuery === "" ||
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = countryFilter === "All" || req.country === countryFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Open" && req.status === "Active") ||
      (statusFilter === "Closed" && req.status === "Closed");

    return matchesSearch && matchesCountry && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, countryFilter, statusFilter]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredRequests.length / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleConfirmDecision = () => {
    toast.success(`Refund claim successfully ${confirmType === "approve" ? "approved" : "rejected"}!`);
    setConfirmType(null);
    setIsDetailOpen(false);
    setIsSuccessOpen(true);
  };

  const renderPaginationItems = () => {
    const items = [];
    const renderButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${currentPage === pageNumber
            ? "bg-[#0DBCBA] text-white shadow-sm"
            : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
      >
        {pageNumber}
      </button>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(renderButton(i));
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 6; i++) items.push(renderButton(i));
        items.push(<span key="dots" className="px-2">...</span>, renderButton(totalPages));
      } else if (currentPage >= totalPages - 3) {
        items.push(renderButton(1), <span key="dots" className="px-2">...</span>);
        for (let i = totalPages - 5; i <= totalPages; i++) items.push(renderButton(i));
      } else {
        items.push(renderButton(1), <span key="dots1" className="px-2">...</span>, renderButton(currentPage - 1), renderButton(currentPage), renderButton(currentPage + 1), <span key="dots2" className="px-2">...</span>, renderButton(totalPages));
      }
    }
    return items;
  };

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by name, transaction ID, or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setIsCountryOpen(!isCountryOpen); setIsStatusOpen(false); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm"
              >
                <span>{countryFilter === "All" ? "Pakistan" : countryFilter}</span>
                <HiOutlineChevronDown size={16} className={`transition-transform duration-200 ${isCountryOpen ? "rotate-180" : ""}`} />
              </button>
              {isCountryOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Pakistan", "Bangladesh", "United States"].map((c) => (
                    <button key={c} onClick={() => { setCountryFilter(c); setIsCountryOpen(false); }} className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left ${countryFilter === c ? "bg-[#0DBCBA] text-white" : "text-gray-700 hover:bg-gray-50"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setIsStatusOpen(!isStatusOpen); setIsCountryOpen(false); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm"
              >
                <span>{statusFilter}</span>
                <HiOutlineChevronDown size={16} className={`transition-transform duration-200 ${isStatusOpen ? "rotate-180" : ""}`} />
              </button>
              {isStatusOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Open", "Closed"].map((s) => (
                    <button key={s} onClick={() => { setStatusFilter(s); setIsStatusOpen(false); }} className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-center ${statusFilter === s ? "bg-[#0DBCBA] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-50"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center border-b border-gray-200 pb-0 mt-2">
          <button onClick={() => setActiveTab("admin")} className={`pb-3 text-[15px] font-bold transition-all relative focus:outline-none ${activeTab === "admin" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
            Admin Fee Refund
            {activeTab === "admin" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-md" />}
          </button>
          <button onClick={() => setActiveTab("safety")} className={`pb-3 text-[15px] font-bold transition-all relative focus:outline-none ${activeTab === "safety" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
            Safety Shield
            {activeTab === "safety" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-md" />}
          </button>
        </div>

        <div className="w-full bg-white rounded-2xl border border-gray-150 shadow-sm overflow-visible">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#CFF2F1] text-[#4E4E4E] font-bold text-[13px]">
                <th className="py-4 px-6 uppercase tracking-wider rounded-tl-2xl w-24">Id</th>
                <th className="py-4 px-6 uppercase tracking-wider">Name</th>
                <th className="py-4 px-6 uppercase tracking-wider">Transaction ID</th>
                <th className="py-4 px-6 uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 uppercase tracking-wider">Reason</th>
                <th className="py-4 px-6 uppercase tracking-wider">Requested Date</th>
                <th className="py-4 px-6 uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 uppercase tracking-wider rounded-tr-2xl w-16 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px] text-gray-600 font-medium">
              {paginatedRequests.map((req) => {
                const isOpen = activeDropdownRowKey === req.key;
                return (
                  <tr key={req.key} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-500">{req.id}</td>
                    <td className="py-4 px-6 text-[#4E4E4E] italic">{req.name}</td>
                    <td className="py-4 px-6 text-[#4E4E4E]">{req.transactionId}</td>
                    <td className="py-4 px-6 text-[#4E4E4E]">{req.amount}</td>
                    <td className="py-4 px-6 text-[#4E4E4E]">{req.reason}</td>
                    <td className="py-4 px-6 text-gray-500">{req.requestedDate}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block text-center text-[12px] font-semibold px-4 py-1.5 rounded-[6px] text-white min-w-[80px] ${req.status === "Active" ? "bg-[#0DBCBA]" : "bg-[#E67E22]"}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 relative">
                      <div className="flex justify-end relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { setActiveDropdownRowKey(isOpen ? null : req.key); setIsCountryOpen(false); setIsStatusOpen(false); }} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-50 transition-all focus:outline-none">
                          <FiMoreVertical size={20} />
                        </button>
                        {isOpen && (
                          <div className="absolute right-8 top-6 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-xl py-2 px-1.5 z-[100] flex flex-col gap-0.5 text-left text-xs font-semibold">
                            <button onClick={() => { setSelectedRequest(req); setIsDetailOpen(true); setActiveDropdownRowKey(null); }} className="w-full text-left py-2 px-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-all">View Details</button>
                            <button onClick={() => { setSelectedRequest(req); setConfirmType("reject"); setActiveDropdownRowKey(null); }} className="w-full text-left py-2 px-3 hover:bg-red-50 text-red-500 rounded-lg transition-all">Reject Refund</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 select-none">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30">
              <FiArrowLeft size={16} />
            </button>
            {renderPaginationItems()}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30">
              <FiArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* REFUND REQUEST DETAILS MODAL */}
      {isDetailOpen && selectedRequest && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/45 backdrop-blur-[1px] p-4">
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #a8a8a8;
            }
          `}</style>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-[650px] w-full flex flex-col animate-scaleUp max-h-[95vh]">
            {/* Header */}
            <div className="bg-[#0DBCBA] px-6 py-4 flex justify-between items-center shrink-0">
              <h3 className="text-white font-medium text-xl">Refund Request Details</h3>
              <button onClick={() => setIsDetailOpen(false)} className="text-white hover:opacity-80 transition-all focus:outline-none"><FiX size={20} /></button>
            </div>

            {/* Scrollable Content */}
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
              
              {/* Status Row */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-[15px]">Status:</span>
                  <span className={`px-6 py-1.5 rounded text-[13px] text-white ${selectedRequest.status === "Active" ? "bg-[#0DBCBA]" : "bg-[#E67E22]"}`}>
                    {selectedRequest.status === "Active" ? "Open" : "Closed"}
                  </span>
                </div>
                <div className="text-gray-600 text-[13px]">
                  Oct 24,2026 11:20 AM
                </div>
              </div>

              {/* Title Swap Details */}
              <h4 className="text-[#154b4b] font-semibold text-[17px] mb-2">Swap Details</h4>
              <div className="h-[2px] w-full bg-[#0DBCBA] mb-6"></div>

              {/* Grid 2 cols */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Username</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.username}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Name</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.name}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Swap ID</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.swapId}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Swap Date</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.swapDate}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Swap From</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.swapFrom}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Swap To</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.swapTo}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Exchange Rate</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.exchangeRate}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Refund Amount</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.refundAmount}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Platform Fee</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.platformFee}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Reason</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.reason}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-[12px] mb-1">Fee Type</span>
                  <span className="text-gray-800 text-[14px]">{selectedRequest.feeType}</span>
                </div>
              </div>

              {/* Description Box */}
              <div className="mb-6">
                <span className="block text-gray-600 text-[13px] mb-2">Description</span>
                <div className="bg-[#f0f2f5] p-5 rounded-lg text-[#1f2937] text-[14px] leading-relaxed border border-gray-100">
                  "{selectedRequest.description}"
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="bg-[#f5f6f8] px-8 py-5 flex justify-end gap-3">
              <button onClick={() => setIsDetailOpen(false)} className="px-6 py-2.5 bg-white border border-gray-400 text-gray-700 rounded text-[14px] transition-all focus:outline-none hover:bg-gray-50">Close</button>
              <button onClick={() => { setIsDetailOpen(false); setConfirmType("approve"); }} className="px-5 py-2.5 bg-[#0DBCBA] text-white rounded text-[14px] hover:bg-[#0aa6a4] transition-all focus:outline-none">Approve Refund Claim</button>
              <button onClick={() => { setIsDetailOpen(false); setConfirmType("reject"); }} className="px-5 py-2.5 bg-[#0DBCBA] text-white rounded text-[14px] hover:bg-[#0aa6a4] transition-all focus:outline-none">Reject Refund Claim</button>
            </div>
          </div>
        </div>
      )}
      {confirmType && selectedRequest && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-[460px] w-full relative flex flex-col items-center text-center animate-scaleUp">
            
            <button
              onClick={() => setConfirmType(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
            >
              <FiX size={16} />
            </button>

            <div className="w-20 h-20 rounded-2xl bg-[#FDE8E8] flex items-center justify-center mb-6 mt-2 shadow-sm">
              <svg
                className="w-11 h-11 text-[#E74C3C]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V9h2v5z"/>
              </svg>
            </div>

            <h4 className="text-gray-800 font-bold text-[19px] mb-8">
              {confirmType === "approve"
                ? "Do you want to approve the refund?"
                : "Do you want to reject the refund?"}
            </h4>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setConfirmType(null)}
                className="flex-1 py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-md text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
              >
                No
              </button>
              <button
                onClick={handleConfirmDecision}
                className="flex-1 py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-md text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
              >
                Yes
              </button>
            </div>

          </div>
        </div>
      )}

      {isSuccessOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-[460px] w-full relative flex flex-col items-center text-center animate-scaleUp">
            
            <button
              onClick={() => setIsSuccessOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#8A8A8A] hover:bg-gray-600 text-white flex items-center justify-center transition-all focus:outline-none shadow-sm"
            >
              <FiX size={16} />
            </button>

            <div className="relative w-40 h-40 flex items-center justify-center mb-2 mt-4">
              {/* Confetti */}
              <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute top-4 left-8 w-2 h-4 bg-[#A3E4D7] rounded-sm rotate-45" />
                <div className="absolute top-8 right-10 w-2.5 h-2.5 bg-[#1ABC9C] rounded-full" />
                <div className="absolute bottom-8 left-12 w-3 h-1.5 bg-[#0DBCBA] rounded-sm -rotate-45" />
                <div className="absolute bottom-6 right-8 w-2 h-4 bg-[#A3E4D7] rounded-sm rotate-[30deg]" />
                <div className="absolute top-20 left-4 w-2 h-2 bg-[#1ABC9C] rounded-full" />
                <div className="absolute top-16 right-4 w-3 h-1 bg-[#0DBCBA] rounded-sm rotate-12" />
                <div className="absolute bottom-16 right-4 w-1.5 h-3 bg-[#A3E4D7] rounded-sm -rotate-45" />
                <div className="absolute top-2 left-20 w-3 h-1 bg-[#1ABC9C] rounded-sm -rotate-12" />
                <div className="absolute bottom-4 left-20 w-2 h-2 bg-[#0DBCBA] rounded-full" />
              </div>

              {/* Checkmark Circle */}
              <div className="w-[100px] h-[100px] rounded-full bg-[#0DBCBA] flex items-center justify-center z-10 shadow-lg shadow-[#0dbcba]/20">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h4 className="text-gray-800 font-bold text-[18px] mb-8">
              Confirmation sent to user!
            </h4>

            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full max-w-[240px] py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-md text-[14px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
            >
              Go back to refund
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Refund;
