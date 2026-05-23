import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiMoreVertical,
  FiX,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { toast } from "react-hot-toast";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ReviewItem {
  key: string;
  id: string;
  reviewerName: string;
  reviewedName: string;
  rating: number;
  comment: string;
  reviewDate: string;
  status: "Approved" | "Pending" | "Rejected";
  country: string;
  flagged: boolean;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const statusOptions: ("Approved" | "Pending" | "Rejected")[] = [
  "Pending",
  "Pending",
  "Pending",
  "Rejected",
  "Approved",
  "Approved",
  "Approved",
  "Approved",
  "Pending",
];

const mockReviews: ReviewItem[] = Array.from({ length: 45 }, (_, i) => ({
  key: String(i + 1),
  id: "01",
  reviewerName: "Alice Johnson",
  reviewedName: "Bob Smith",
  rating: i === 0 ? 1 : 4,
  comment: i === 0 ? "Scammer Do Not Trust" : "Great Swap Experience!",
  reviewDate: "2026-03-28",
  status: statusOptions[i % statusOptions.length],
  country: i % 3 === 0 ? "Pakistan" : i % 3 === 1 ? "USA" : "UK",
  flagged: i === 0,
}));

// ─── Star Rating Component ───────────────────────────────────────────────────

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-[18px] h-[18px] ${
          star <= rating ? "text-[#F5A623]" : "text-[#F5A623] opacity-30"
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

const ReputationTrust: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("2026-03-28");
  const [toDate, setToDate] = useState("2026-03-28");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [activeDropdownRowKey, setActiveDropdownRowKey] = useState<
    string | null
  >(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject";
    review: ReviewItem;
  } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Close dropdowns on outside click
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

  // ── Filtering ───────────────────────────────────────────────────────

  const filteredReviews = mockReviews.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reviewedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      countryFilter === "All" || r.country === countryFilter;

    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;

    return matchesSearch && matchesCountry && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, countryFilter, statusFilter]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredReviews.length / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    toast.success(
      `Review ${
        confirmAction.type === "approve" ? "approved" : "rejected"
      } successfully!`
    );
    setConfirmAction(null);
    setIsSuccessOpen(true);
  };

  // ── Pagination ──────────────────────────────────────────────────────

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

  // ── Status Badge ────────────────────────────────────────────────────

  const getStatusBadge = (status: string) => {
    const colorMap: Record<string, string> = {
      Approved: "bg-[#0DBCBA] text-white",
      Pending: "bg-[#F5A623] text-white",
      Rejected: "bg-[#FF4D4F] text-white",
    };
    return (
      <span
        className={`px-4 py-1 rounded-full text-[12px] font-semibold ${
          colorMap[status] || "bg-gray-200 text-gray-700"
        }`}
      >
        {status === "Approved" ? "Aproved" : status}
      </span>
    );
  };

  // ── Main Render ─────────────────────────────────────────────────────

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        {/* ── Top Filters ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Search */}
          <div className="relative w-full max-w-[240px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search here......"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
            {/* Date Range */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <FiCalendar size={16} className="text-gray-400" />
              <span className="text-[13px] text-gray-600 font-medium">
                From :
              </span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="text-[13px] text-gray-700 font-medium bg-transparent border-none focus:outline-none"
              />
              <span className="text-[13px] text-gray-600 font-medium ml-1">
                To :
              </span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="text-[13px] text-gray-700 font-medium bg-transparent border-none focus:outline-none"
              />
            </div>

            {/* Country Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsCountryOpen(!isCountryOpen);
                  setIsStatusOpen(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm"
              >
                <span>
                  {countryFilter === "All" ? "Pakistan" : countryFilter}
                </span>
                <HiOutlineChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isCountryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCountryOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Pakistan", "USA", "UK"].map((c) => (
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
                      {c === "All" ? "All Countries" : c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsCountryOpen(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#4E4E4E] font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm"
              >
                <span>{statusFilter === "All" ? "All" : statusFilter}</span>
                <HiOutlineChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isStatusOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isStatusOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Approved", "Pending", "Rejected"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setIsStatusOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                        statusFilter === s
                          ? "bg-[#0DBCBA] text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {s}
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

        {/* ── Table Card ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#CFF2F1]">
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap">
                    Id
                  </th>
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap">
                    Review
                  </th>
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap">
                    Rating
                  </th>
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap">
                    Comment
                  </th>
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap">
                    Review Date
                  </th>
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap text-center">
                    {/* Status - no header label in design */}
                  </th>
                  <th className="px-5 py-4 text-[13px] font-bold text-gray-700 whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReviews.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-20 text-center text-gray-400 text-sm"
                    >
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  paginatedReviews.map((review) => {
                    const isOpen = activeDropdownRowKey === review.key;
                    return (
                      <tr
                        key={review.key}
                        className="border-t border-gray-100 hover:bg-[#fafbfc] transition-colors"
                      >
                        {/* Id */}
                        <td className="px-5 py-4 text-[13px] text-gray-600 font-medium">
                          {review.id}
                        </td>

                        {/* Review (Reviewer + Reviewed) */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                            <div>
                              <p className="text-[13px] text-gray-800 font-semibold leading-tight">
                                {review.reviewerName}
                              </p>
                              <p className="text-[12px] text-gray-400 leading-tight">
                                -{review.reviewedName}
                              </p>
                            </div>
                            {review.flagged && (
                              <span className="text-red-500 text-[14px] ml-1">
                                🚩
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} />
                            <FiEdit
                              size={14}
                              className="text-[#0DBCBA] cursor-pointer hover:text-[#0aa6a4] transition-colors"
                            />
                          </div>
                        </td>

                        {/* Comment */}
                        <td className="px-5 py-4 text-[13px] text-gray-600 max-w-[220px]">
                          {review.comment}
                        </td>

                        {/* Review Date */}
                        <td className="px-5 py-4 text-[13px] text-gray-600 whitespace-nowrap">
                          {review.reviewDate}
                        </td>

                        {/* Status Badge */}
                        <td className="px-5 py-4 text-center">
                          {getStatusBadge(review.status)}
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-center relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdownRowKey(
                                isOpen ? null : review.key
                              );
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-all focus:outline-none"
                          >
                            <FiMoreVertical size={16} />
                          </button>
                          {isOpen && (
                            <div className="absolute right-8 top-6 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-xl py-2 px-1.5 z-[100] flex flex-col gap-0.5 text-left text-xs font-semibold">
                              <button
                                onClick={() => {
                                  setConfirmAction({
                                    type: "approve",
                                    review,
                                  });
                                  setActiveDropdownRowKey(null);
                                }}
                                className="w-full text-left py-2 px-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-all"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmAction({
                                    type: "reject",
                                    review,
                                  });
                                  setActiveDropdownRowKey(null);
                                }}
                                className="w-full text-left py-2 px-3 hover:bg-red-50 text-red-500 rounded-lg transition-all"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Pagination ───────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-2">
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

      {/* ── Confirm Modal ────────────────────────────────────────── */}
      {confirmAction && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-[460px] w-full relative flex flex-col items-center text-center animate-scaleUp">
            {/* Close */}
            <button
              onClick={() => setConfirmAction(null)}
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
            <h4 className="text-gray-800 font-bold text-[19px] mb-8">
              Are you sure you want to{" "}
              {confirmAction.type === "approve" ? "approve" : "reject"} this
              Review ?
            </h4>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full max-w-[300px] py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-md text-[15px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* ── Success Modal ────────────────────────────────────────── */}
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

              {/* Checkmark */}
              <div className="w-[100px] h-[100px] rounded-full bg-[#0DBCBA] flex items-center justify-center z-10 shadow-lg shadow-[#0dbcba]/20">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-gray-800 font-bold text-[18px] mb-8">
              Action completed successfully!
            </h4>

            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full max-w-[240px] py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-md text-[14px] font-bold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReputationTrust;
