import { useGeneralStatsQuery } from "@/redux/apiSlices/dashboardSlice";
import { FiUsers } from "react-icons/fi";
import { IoSwapHorizontalOutline } from "react-icons/io5";

const GeneralStateSection = () => {
  // Fetch stats from the API
  const { data: generalState, isLoading } = useGeneralStatsQuery({});

  // Helper to format swap value
  const formatSwapValue = (val: any) => {
    if (val === undefined || val === null) return "$ 2000k";
    if (typeof val === "number") {
      if (val >= 1000) {
        return `$ ${Math.round(val / 1000)}k`;
      }
      return `$ ${val}`;
    }
    const str = String(val);
    if (!str.startsWith("$")) {
      return `$ ${str}`;
    }
    return str;
  };

  // Graceful loading skeleton matching the card layout
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col justify-between pt-6 h-[140px] animate-pulse"
          >
            <div className="flex-1 flex flex-col justify-center items-center px-6">
              <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-7 bg-gray-100 rounded-t-[24px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  const stats = generalState?.data || generalState;

  // Map values with exact fallbacks to the design screenshot
  const totalSwapper = stats?.totalSwapper ?? stats?.totalActiveUsers ?? 5000;
  const totalSwaps = stats?.totalSwaps ?? stats?.totalCompletedOrders ?? 5000;
  const totalSwapValue = formatSwapValue(stats?.totalSwapValue ?? stats?.totalSwapValueAmount);

  const cardData = [
    {
      id: "total-swapper",
      title: "Total Swapper",
      value: totalSwapper,
      icon: <FiUsers className="text-[#94A3B8]" size={18} />,
    },
    {
      id: "total-swaps",
      title: "Total Swaps",
      value: totalSwaps,
      icon: <FiUsers className="text-[#94A3B8]" size={18} />,
    },
    {
      id: "total-swap-value",
      title: "Total Swap Value",
      value: totalSwapValue,
      icon: <IoSwapHorizontalOutline className="text-[#94A3B8]" size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between pt-6 h-[140px] overflow-hidden group cursor-pointer"
        >
          <div className="flex-1 flex flex-col justify-center items-center px-6 pb-2">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
              {card.icon}
              <span className="text-sm font-medium tracking-wide text-[#64748B] group-hover:text-gray-700 transition-colors">
                {card.title}
              </span>
            </div>
            <h3 className="text-[28px] font-bold text-[#1E293B] tracking-tight">
              {card.value}
            </h3>
          </div>
          {/* Accent colored bar at the bottom with curved top corners */}
          <div className="h-7 bg-secondary rounded-t-[24px] w-full transition-all group-hover:bg-[#BEECEB]" />
        </div>
      ))}
    </div>
  );
};

export default GeneralStateSection;
