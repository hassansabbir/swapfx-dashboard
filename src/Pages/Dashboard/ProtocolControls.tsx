import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { toast } from "react-hot-toast";

// ─── Data ────────────────────────────────────────────────────────────────────

const allCountries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "India", flag: "🇮🇳" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "London", flag: "🇬🇧" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "China", flag: "🇨🇳" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Italy", flag: "🇮🇹" },
];

const allCurrencies = [
  "USD",
  "PKR",
  "RUPEE",
  "TAKA",
  "GBP",
  "EUR",
  "CAD",
  "AUD",
  "JPY",
  "CNY",
  "BRL",
  "MXN",
  "NGN",
  "ZAR",
  "TRY",
  "SAR",
  "AED",
];

// ─── Unblock Icon ────────────────────────────────────────────────────────────

const UnblockIcon: React.FC = () => (
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

// ─── Component ───────────────────────────────────────────────────────────────

const ProtocolControls: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"corridor" | "currency">(
    "corridor"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Country state
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [blockedCountries, setBlockedCountries] = useState<string[]>([
    "USA",
    "India",
    "Pakistan",
    "Afghanistan",
    "London",
    "Bangladesh",
    "Canada",
    "France",
    "Germany",
    "Australia",
    "Japan",
    "China",
    "Brazil",
    "Mexico",
    "Nigeria",
    "South Africa",
    "Turkey",
    "Saudi Arabia",
    "UAE",
    "Italy",
  ]);

  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [blockedCurrencies, setBlockedCurrencies] = useState<string[]>([
    "USD",
    "PKR",
    "RUPEE",
    "TAKA",
    "GBP",
    "EUR",
    "CAD",
    "AUD",
    "JPY",
    "CNY",
    "BRL",
    "MXN",
    "NGN",
    "ZAR",
    "TRY",
    "SAR",
    "AED",
  ]);

  // Modal state
  const [confirmModal, setConfirmModal] = useState<{
    type: "block-country" | "block-currency" | "unblock-country" | "unblock-currency";
    value: string;
  } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
  }, [activeTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setIsCountryDropdownOpen(false);
      setIsCurrencyDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ── Filtered lists ──────────────────────────────────────────────────

  const filteredBlockedCountries = blockedCountries.filter(
    (c) =>
      searchQuery === "" || c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlockedCurrencies = blockedCurrencies.filter(
    (c) =>
      searchQuery === "" || c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentList =
    activeTab === "corridor"
      ? filteredBlockedCountries
      : filteredBlockedCurrencies;

  const totalPages = Math.ceil(currentList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedList = currentList.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ── Actions ─────────────────────────────────────────────────────────

  const handleConfirm = () => {
    if (!confirmModal) return;

    if (confirmModal.type === "block-country") {
      if (!blockedCountries.includes(confirmModal.value)) {
        setBlockedCountries((prev) => [...prev, confirmModal.value]);
        toast.success(`${confirmModal.value} blocked successfully!`);
      } else {
        toast.error(`${confirmModal.value} is already blocked.`);
      }
    } else if (confirmModal.type === "block-currency") {
      if (!blockedCurrencies.includes(confirmModal.value)) {
        setBlockedCurrencies((prev) => [...prev, confirmModal.value]);
        toast.success(`${confirmModal.value} blocked successfully!`);
      } else {
        toast.error(`${confirmModal.value} is already blocked.`);
      }
    } else if (confirmModal.type === "unblock-country") {
      setBlockedCountries((prev) =>
        prev.filter((c) => c !== confirmModal.value)
      );
      toast.success(`${confirmModal.value} unblocked successfully!`);
    } else if (confirmModal.type === "unblock-currency") {
      setBlockedCurrencies((prev) =>
        prev.filter((c) => c !== confirmModal.value)
      );
      toast.success(`${confirmModal.value} unblocked successfully!`);
    }

    setConfirmModal(null);
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
        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("corridor")}
            className={`text-[15px] font-semibold pb-1 transition-all focus:outline-none ${
              activeTab === "corridor"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Corridor
          </button>
          <button
            onClick={() => setActiveTab("currency")}
            className={`text-[15px] font-semibold pb-1 transition-all focus:outline-none ${
              activeTab === "currency"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Currency
          </button>
        </div>

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

        {/* ── Country Tab Content ──────────────────────────────── */}
        {activeTab === "corridor" && (
          <>
            <div>
              <h2 className="text-[16px] font-bold text-gray-900 mb-3">
                Country Management
              </h2>
              <p className="text-[13px] text-gray-500 font-medium mb-2">
                Country
              </p>
              <div className="flex items-center gap-3">
                {/* Country Dropdown */}
                <div
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm min-w-[130px]"
                  >
                    <span>
                      {selectedCountry}
                    </span>
                    <HiOutlineChevronDown
                      size={16}
                      className={`transition-transform duration-200 ml-auto ${
                        isCountryDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isCountryDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5 max-h-[260px] overflow-y-auto">
                      {allCountries.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            setSelectedCountry(c.name);
                            setIsCountryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                            selectedCountry === c.name
                              ? "bg-[#0DBCBA] text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Block Button */}
                <button
                  onClick={() =>
                    setConfirmModal({
                      type: "block-country",
                      value: selectedCountry,
                    })
                  }
                  className="px-8 py-2.5 bg-[#0DBCBA] text-white rounded-lg text-[14px] font-bold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
                >
                  Block
                </button>
              </div>
            </div>

            {/* Blocked Countries Table */}
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-3">
                Blocked Countries
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#CFF2F1]">
                      <th className="px-6 py-4 text-[13px] font-bold text-gray-700">
                        Countries
                      </th>
                      <th className="px-6 py-4 text-[13px] font-bold text-gray-700 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedList.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="py-16 text-center text-gray-400 text-sm"
                        >
                          No blocked countries found.
                        </td>
                      </tr>
                    ) : (
                      paginatedList.map((country) => (
                        <tr
                          key={country}
                          className="border-t border-gray-100 hover:bg-[#fafbfc] transition-colors"
                        >
                          <td className="px-6 py-4 text-[14px] text-gray-700 font-medium">
                            {country}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                setConfirmModal({
                                  type: "unblock-country",
                                  value: country,
                                })
                              }
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all focus:outline-none inline-flex"
                            >
                              <UnblockIcon />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── Currency Tab Content ─────────────────────────────── */}
        {activeTab === "currency" && (
          <>
            <div>
              <h2 className="text-[16px] font-bold text-gray-900 mb-3">
                Currency Management
              </h2>
              <p className="text-[13px] text-gray-500 font-medium mb-2">
                Currency
              </p>
              <div className="flex items-center gap-3">
                {/* Currency Dropdown */}
                <div
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() =>
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                    }
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:border-[#0DBCBA] transition-all focus:outline-none shadow-sm min-w-[120px]"
                  >
                    <span>{selectedCurrency}</span>
                    <HiOutlineChevronDown
                      size={16}
                      className={`transition-transform duration-200 ml-auto ${
                        isCurrencyDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isCurrencyDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5 max-h-[260px] overflow-y-auto">
                      {allCurrencies.map((cur) => (
                        <button
                          key={cur}
                          onClick={() => {
                            setSelectedCurrency(cur);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                            selectedCurrency === cur
                              ? "bg-[#0DBCBA] text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Block Button */}
                <button
                  onClick={() =>
                    setConfirmModal({
                      type: "block-currency",
                      value: selectedCurrency,
                    })
                  }
                  className="px-8 py-2.5 bg-[#0DBCBA] text-white rounded-lg text-[14px] font-bold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/20"
                >
                  Block
                </button>
              </div>
            </div>

            {/* Blocked Currencies Table */}
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-3">
                Blocked Currencies
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#CFF2F1]">
                      <th className="px-6 py-4 text-[13px] font-bold text-gray-700">
                        Currency
                      </th>
                      <th className="px-6 py-4 text-[13px] font-bold text-gray-700 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedList.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="py-16 text-center text-gray-400 text-sm"
                        >
                          No blocked currencies found.
                        </td>
                      </tr>
                    ) : (
                      paginatedList.map((currency) => (
                        <tr
                          key={currency}
                          className="border-t border-gray-100 hover:bg-[#fafbfc] transition-colors"
                        >
                          <td className="px-6 py-4 text-[14px] text-gray-700 font-medium">
                            {currency}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                setConfirmModal({
                                  type: "unblock-currency",
                                  value: currency,
                                })
                              }
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all focus:outline-none inline-flex"
                            >
                              <UnblockIcon />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── Pagination ───────────────────────────────────────── */}
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

      {/* ── Confirm Modal ──────────────────────────────────────── */}
      {confirmModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-[460px] w-full relative flex flex-col items-center text-center animate-scaleUp">
            {/* Close */}
            <button
              onClick={() => setConfirmModal(null)}
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
              {confirmModal.type.startsWith("block") ? "block" : "unblock"} this{" "}
              {confirmModal.type.includes("country") ? "Corridor" : "Currency"}{" "}
              ?
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
    </div>
  );
};

export default ProtocolControls;
