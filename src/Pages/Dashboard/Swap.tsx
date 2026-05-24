import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiArrowLeft,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

interface SwapTransaction {
  key: string;
  id: string;
  transactionId: string;
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  dateTime: string;
  fee: string;
  status: "Complete" | "Ongoing" | "Incomplete";
  swapperName: string;
  swapperReviews: string;
  swapperRating: string;
  swapperOffer: string;
  swapperWant: string;
  exchangeRate: string;
  timeWindow: string;
  note: string;
}

const generateMarketData = (): SwapTransaction[] => {
  const data: SwapTransaction[] = [
    {
      key: "m1",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Complete",
      swapperName: "John Doe",
      swapperReviews: "128 reviews",
      swapperRating: "4.9",
      swapperOffer: "£111,881.85",
      swapperWant: "Rs 150,000.00",
      exchangeRate: "1 GBP = 374.62PKR",
      timeWindow: "Next 2-4 Hours",
      note: "Need this swap urgently for a family matter. My funds are ready in the US bank, looking for an immediate PKR transfer.",
    },
    {
      key: "m2",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Ongoing",
      swapperName: "Alex Mercer",
      swapperReviews: "95 reviews",
      swapperRating: "4.8",
      swapperOffer: "£45,000.00",
      swapperWant: "Rs 60,000.00",
      exchangeRate: "1 GBP = 374.00PKR",
      timeWindow: "Next 1-2 Hours",
      note: "Standard transaction. Fast release.",
    },
    {
      key: "m3",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Complete",
      swapperName: "Sara Connor",
      swapperReviews: "245 reviews",
      swapperRating: "5.0",
      swapperOffer: "£89,500.00",
      swapperWant: "Rs 120,000.00",
      exchangeRate: "1 GBP = 375.10PKR",
      timeWindow: "Immediate",
      note: "Looking for direct bank transfers only. Serious buyers.",
    },
    {
      key: "m4",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Complete",
      swapperName: "John Doe",
      swapperReviews: "128 reviews",
      swapperRating: "4.9",
      swapperOffer: "£111,881.85",
      swapperWant: "Rs 150,000.00",
      exchangeRate: "1 GBP = 374.62PKR",
      timeWindow: "Next 2-4 Hours",
      note: "Need this swap urgently for a family matter.",
    },
    {
      key: "m5",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Complete",
      swapperName: "John Doe",
      swapperReviews: "128 reviews",
      swapperRating: "4.9",
      swapperOffer: "£111,881.85",
      swapperWant: "Rs 150,000.00",
      exchangeRate: "1 GBP = 374.62PKR",
      timeWindow: "Next 2-4 Hours",
      note: "My funds are ready in the US bank, looking for an immediate PKR transfer.",
    },
    {
      key: "m6",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Incomplete",
      swapperName: "David Miller",
      swapperReviews: "14 reviews",
      swapperRating: "4.2",
      swapperOffer: "£12,000.00",
      swapperWant: "Rs 16,000.00",
      exchangeRate: "1 GBP = 372.50PKR",
      timeWindow: "Next 24 Hours",
      note: "Flexible swap timeline.",
    },
    {
      key: "m7",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Incomplete",
      swapperName: "John Doe",
      swapperReviews: "128 reviews",
      swapperRating: "4.9",
      swapperOffer: "£111,881.85",
      swapperWant: "Rs 150,000.00",
      exchangeRate: "1 GBP = 374.62PKR",
      timeWindow: "Next 2-4 Hours",
      note: "Urgent transfer.",
    },
    {
      key: "m8",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Incomplete",
      swapperName: "John Doe",
      swapperReviews: "128 reviews",
      swapperRating: "4.9",
      swapperOffer: "£111,881.85",
      swapperWant: "Rs 150,000.00",
      exchangeRate: "1 GBP = 374.62PKR",
      timeWindow: "Next 2-4 Hours",
      note: "Standard swap.",
    },
    {
      key: "m9",
      id: "01",
      transactionId: "TRX-8921",
      fromAmount: "5.000",
      fromCurrency: "GBP",
      toAmount: "6,340.20",
      toCurrency: "USD",
      dateTime: "Oct 24, 2026 14:32:01 UTC",
      fee: "$12.00",
      status: "Complete",
      swapperName: "John Doe",
      swapperReviews: "128 reviews",
      swapperRating: "4.9",
      swapperOffer: "£111,881.85",
      swapperWant: "Rs 150,000.00",
      exchangeRate: "1 GBP = 374.62PKR",
      timeWindow: "Next 2-4 Hours",
      note: "Family assistance swap.",
    },
  ];

  for (let i = 10; i <= 25; i++) {
    data.push({
      key: `m${i}`,
      id: "01",
      transactionId: `TRX-${9000 + i}`,
      fromAmount: "10.000",
      fromCurrency: "GBP",
      toAmount: "12,680.40",
      toCurrency: "USD",
      dateTime: "Oct 25, 2026 10:15:45 UTC",
      fee: "$24.00",
      status: i % 2 === 0 ? "Complete" : i % 3 === 0 ? "Ongoing" : "Incomplete",
      swapperName: `Market Swapper ${i}`,
      swapperReviews: `${20 + i} reviews`,
      swapperRating: "4.7",
      swapperOffer: `£${i * 1000}.00`,
      swapperWant: `Rs ${i * 1350}.00`,
      exchangeRate: "1 GBP = 374.00PKR",
      timeWindow: "Next 1 Hour",
      note: "Looking for reliable counterparty.",
    });
  }
  return data;
};

const generatePeerData = (): SwapTransaction[] => {
  const data: SwapTransaction[] = [
    {
      key: "p1",
      id: "01",
      transactionId: "TRX-4200",
      fromAmount: "8.500",
      fromCurrency: "EUR",
      toAmount: "9,200.00",
      toCurrency: "USD",
      dateTime: "Nov 02, 2026 12:45:10 UTC",
      fee: "$8.50",
      status: "Complete",
      swapperName: "Bruce Wayne",
      swapperReviews: "540 reviews",
      swapperRating: "5.0",
      swapperOffer: "€8,500.00",
      swapperWant: "Rs 2,500,000.00",
      exchangeRate: "1 EUR = 300.00PKR",
      timeWindow: "Next 30 Mins",
      note: "Urgent P2P swap for local business funds release.",
    },
    {
      key: "p2",
      id: "01",
      transactionId: "TRX-4201",
      fromAmount: "1.200",
      fromCurrency: "GBP",
      toAmount: "1,550.00",
      toCurrency: "USD",
      dateTime: "Nov 02, 2026 14:10:32 UTC",
      fee: "$15.00",
      status: "Ongoing",
      swapperName: "Clark Kent",
      swapperReviews: "12 reviews",
      swapperRating: "4.5",
      swapperOffer: "£1,200.00",
      swapperWant: "Rs 450,000.00",
      exchangeRate: "1 GBP = 375.00PKR",
      timeWindow: "Next 3 Hours",
      note: "Looking for immediate transfer.",
    },
    {
      key: "p3",
      id: "01",
      transactionId: "TRX-4202",
      fromAmount: "4.500",
      fromCurrency: "GBP",
      toAmount: "5,700.00",
      toCurrency: "USD",
      dateTime: "Nov 03, 2026 09:12:00 UTC",
      fee: "$10.00",
      status: "Incomplete",
      swapperName: "Diana Prince",
      swapperReviews: "32 reviews",
      swapperRating: "4.9",
      swapperOffer: "£4,500.00",
      swapperWant: "Rs 1,680,000.00",
      exchangeRate: "1 GBP = 373.30PKR",
      timeWindow: "Next 6 Hours",
      note: "P2P transaction swap setup.",
    },
  ];

  for (let i = 4; i <= 20; i++) {
    data.push({
      key: `p${i}`,
      id: "01",
      transactionId: `TRX-${4200 + i}`,
      fromAmount: "3.200",
      fromCurrency: "EUR",
      toAmount: "3,480.00",
      toCurrency: "USD",
      dateTime: "Nov 04, 2026 08:30:00 UTC",
      fee: "$6.00",
      status: i % 2 === 0 ? "Complete" : i % 3 === 0 ? "Ongoing" : "Incomplete",
      swapperName: `Peer Swapper ${i}`,
      swapperReviews: `${10 + i} reviews`,
      swapperRating: "4.6",
      swapperOffer: `€${i * 500}.00`,
      swapperWant: `Rs ${i * 15000}.00`,
      exchangeRate: "1 EUR = 300.00PKR",
      timeWindow: "Next 2 Hours",
      note: "Fast release swap transaction.",
    });
  }
  return data;
};

const Swap: React.FC = () => {
  // Tabs: market | peer
  const [activeTab, setActiveTab] = useState<"market" | "peer">("market");

  // Data states
  const [marketSwaps, setMarketSwaps] = useState<SwapTransaction[]>(generateMarketData());
  const [peerSwaps, setPeerSwaps] = useState<SwapTransaction[]>(generatePeerData());

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("All");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All"); // Matches Complete/Ongoing/Incomplete
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Row Action Dropdown open states
  const [activeDropdownRowKey, setActiveDropdownRowKey] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // View details popup modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<SwapTransaction | null>(null);

  // Cancel Confirmation Modal state
  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean;
    targetKey: string | null;
  }>({
    isOpen: false,
    targetKey: null,
  });

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdownRowKey(null);
      setIsCountryDropdownOpen(false);
      setIsStatusDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const currentSwaps = activeTab === "market" ? marketSwaps : peerSwaps;

  // Filtered swaps list
  const filteredSwaps = currentSwaps.filter((swap) => {
    const matchesSearch =
      searchQuery === "" ||
      swap.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.fromCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.toCurrency.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "All" || swap.status === selectedStatusFilter;

    // Filter by country in swapper wants or notes in real system, matchesSearch is core filter here.
    return matchesSearch && matchesStatus;
  });

  // Reset page when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, selectedStatusFilter]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSwaps = filteredSwaps.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredSwaps.length / pageSize);

  const handleUpdateStatus = (
    key: string,
    status: "Complete" | "Ongoing" | "Incomplete"
  ) => {
    const updater = (prevList: SwapTransaction[]) =>
      prevList.map((item) => (item.key === key ? { ...item, status } : item));

    if (activeTab === "market") {
      setMarketSwaps(updater);
    } else {
      setPeerSwaps(updater);
    }
  };

  const handleCancelClick = (key: string) => {
    setCancelModal({
      isOpen: true,
      targetKey: key,
    });
  };

  const confirmCancelSwap = () => {
    if (cancelModal.targetKey) {
      handleUpdateStatus(cancelModal.targetKey, "Incomplete");
      toast.success("Swap cancelled successfully!");
    }
    setCancelModal({ isOpen: false, targetKey: null });
  };

  const columns: ColumnsType<SwapTransaction> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text: string) => (
        <span className="text-gray-500 font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text: string) => (
        <span className="text-gray-600 font-medium text-[13px]">{text}</span>
      ),
    },
    {
      title: "Transaction",
      key: "transection",
      render: (_, record: SwapTransaction) => (
        <div className="flex items-center gap-3 text-xs">
          <div className="text-right">
            <div className="font-bold text-[#1A1C1E]">{record.fromAmount}</div>
            <div className="text-gray-400 text-[10px] font-semibold">{record.fromCurrency}</div>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#CFF2F1]/60 text-[#0DBCBA] flex items-center justify-center border border-[#0DBCBA]/20 shrink-0 font-bold">
            ⇄
          </div>
          <div className="text-left">
            <div className="font-bold text-[#1A1C1E]">{record.toAmount}</div>
            <div className="text-gray-400 text-[10px] font-semibold">{record.toCurrency}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text: string) => (
        <span className="text-[#4E4E4E] text-[13px]">{text}</span>
      ),
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (text: string) => (
        <span className="text-gray-600 text-[13px] font-medium">{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let bgClass = "";
        if (status === "Complete") bgClass = "bg-[#0DBCBA]";
        else if (status === "Ongoing") bgClass = "bg-[#F97316]";
        else if (status === "Incomplete") bgClass = "bg-[#4B5563]";

        return (
          <span
            className={`inline-block text-center text-[12px] font-medium px-4 py-1 rounded-[6px] text-white min-w-[76px] ${bgClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "",
      key: "actions",
      align: "right",
      width: 60,
      render: (_: any, record: SwapTransaction) => {
        const isOpen = activeDropdownRowKey === record.key;
        return (
          <div className="relative flex justify-end" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setActiveDropdownRowKey(isOpen ? null : record.key);
                setIsCountryDropdownOpen(false);
                setIsStatusDropdownOpen(false);
              }}
              className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-50 transition-all focus:outline-none"
            >
              <FiMoreVertical size={20} />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-8 w-44 bg-white border border-gray-100 rounded-xl shadow-xl py-2 px-1 z-50 flex flex-col gap-0.5 text-left text-xs font-semibold">
                <button
                  onClick={() => {
                    setSelectedSwap(record);
                    setIsDetailModalOpen(true);
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-gray-700 rounded-lg transition-all"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(record.key, "Complete");
                    toast.success("Swap status reinstated successfully!");
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-gray-700 rounded-lg transition-all"
                >
                  Reinstate Swap
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(record.key, "Ongoing");
                    toast.success("Swap paused successfully!");
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-orange-500 rounded-lg transition-all"
                >
                  Pause Swap
                </button>
                <button
                  onClick={() => {
                    handleCancelClick(record.key);
                    setActiveDropdownRowKey(null);
                  }}
                  className="w-full text-left py-2.5 px-4 hover:bg-gray-50 text-red-500 rounded-lg transition-all"
                >
                  Cancel Swap
                </button>
              </div>
            )}
          </div>
        );
      },
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
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${currentPage === pageNumber
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

  return (
    <div className="p-6 min-h-full bg-[#f1f1f9]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Top Filters & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4 mb-5">
          {/* Market & Peer Swaps navigation */}
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setActiveTab("market")}
              className={`pb-2 text-[14px] font-semibold transition-all relative ${activeTab === "market" ? "text-[#1A1C1E]" : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Market Swaps
              {activeTab === "market" && (
                <div className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-black rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("peer")}
              className={`pb-2 text-[14px] font-semibold transition-all relative ${activeTab === "peer" ? "text-[#1A1C1E]" : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Peer Swaps
              {activeTab === "peer" && (
                <div className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-black rounded-full" />
              )}
            </button>
          </div>

          {/* Right aligned Search, Country Dropdown & Status Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <FiSearch size={16} />
              </span>
              <input
                type="text"
                placeholder="Search here......."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl bg-white text-xs text-[#4E4E4E] placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all"
              />
            </div>

            {/* Country Dropdown Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-[#4E4E4E] font-semibold hover:border-[#0DBCBA] transition-all focus:outline-none"
              >
                <span>{selectedCountryFilter === "All" ? "Pakistan" : selectedCountryFilter}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Pakistan", "Bangladesh", "United States", "China"].map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountryFilter(country);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${selectedCountryFilter === country ? "bg-[#0DBCBA] text-white" : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Dropdown Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-[#4E4E4E] font-semibold hover:border-[#0DBCBA] transition-all focus:outline-none"
              >
                <span>{selectedStatusFilter === "All" ? "Ongoing" : selectedStatusFilter}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-0.5">
                  {["All", "Complete", "Ongoing", "Incomplete"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatusFilter(status);
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${selectedStatusFilter === status
                          ? "bg-[#0DBCBA] text-white font-bold shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-[#0DBCBA] hover:text-white"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ant Design Table */}
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
            dataSource={paginatedSwaps}
            rowKey="key"
            pagination={false}
            className="border-none font-sans"
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

      {/* Swap Detail Pop Up Modal */}
      {isDetailModalOpen && selectedSwap && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 backdrop-blur-[1.5px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[720px] w-full mx-4 relative flex flex-col gap-6 border border-gray-100/50">
            {/* Header section with Back Button, User Details, rating and blue checkmark */}
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all focus:outline-none"
              >
                <FiArrowLeft size={18} />
              </button>

              {/* User Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
                  alt="Swapper avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Rating */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-900 font-bold text-[15px] font-sans">{selectedSwap.swapperName}</span>
                  {/* Verified blue checkmark badge */}
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold">
                  <span className="text-amber-500">★</span>
                  <span>{selectedSwap.swapperRating} ({selectedSwap.swapperReviews})</span>
                </div>
              </div>

              {/* Top Right Close button */}
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-all focus:outline-none"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Split layout: Swapper offering / wants on left, stats/notes on right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
              {/* Left Column: Offering/Want Card */}
              <div className="border border-gray-100 bg-[#FAFAFA] rounded-2xl p-6 relative flex flex-col justify-between min-h-[220px]">
                {/* Offering block */}
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wide">Swapper is offering</span>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-extrabold text-[22px] font-sans">{selectedSwap.swapperOffer}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-150 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                      <span className="text-xs">🇺🇸</span> USD
                    </span>
                  </div>
                </div>

                {/* Divider arrow icon */}
                <div className="my-3 flex justify-center relative w-full">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200 -translate-y-1/2" />
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0DBCBA] shadow-sm z-10 relative">
                    ↓
                  </div>
                </div>

                {/* Want block */}
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wide">Swapper wants to receive</span>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0DBCBA] font-extrabold text-[22px] font-sans">{selectedSwap.swapperWant}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-150 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                      <span className="text-xs">🇵🇰</span> PKR
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Rate, Window, Notes */}
              <div className="flex flex-col gap-5">
                {/* Exchange Rate */}
                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                  <span className="text-gray-500 font-semibold text-[13px]">Exchange Rate</span>
                  <span className="text-gray-800 font-bold text-[13px]">{selectedSwap.exchangeRate}</span>
                </div>

                {/* Time Window */}
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-100">
                  <span className="text-gray-500 font-semibold text-[13px]">Time Window</span>
                  <span className="text-gray-800 font-bold text-[13px]">{selectedSwap.timeWindow}</span>
                </div>

                {/* Note from Swapper */}
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-gray-500 font-semibold text-[13px]">Note from Swapper</span>
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-3 relative shadow-sm min-h-[100px] flex-1">
                    {/* Double quotes icon */}
                    <span className="text-gray-300 text-3xl font-serif leading-none select-none">“</span>
                    <p className="text-gray-600 text-xs font-medium leading-relaxed italic pr-2">
                      {selectedSwap.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[420px] w-full mx-4 relative flex flex-col items-center border border-gray-100/50">
            {/* Close Button */}
            <button
              onClick={() => setCancelModal({ isOpen: false, targetKey: null })}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-500 transition-all focus:outline-none"
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
              Are you sure you want to cancel this swap?
            </h3>

            {/* Confirm Button */}
            <button
              onClick={confirmCancelSwap}
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

export default Swap;
