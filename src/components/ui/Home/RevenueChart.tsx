import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useOverAllStateQuery } from "@/redux/apiSlices/dashboardSlice";

const dummyData = [
  { month: "Jan", revenue: 4800 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 3200 },
  { month: "Apr", revenue: 4000 },
  { month: "May", revenue: 6400 },
  { month: "Jun", revenue: 3560 }, // Default active point matching the design screenshot
  { month: "Jul", revenue: 3000 },
  { month: "Aug", revenue: 5800 },
  { month: "Sep", revenue: 7500 },
  { month: "Oct", revenue: 5500 },
  { month: "Nov", revenue: 6200 },
  { month: "Dec", revenue: 8200 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative -translate-x-1/2 -translate-y-12">
        <div className="bg-[#0DBCBA] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-[0_4px_14px_rgba(13,188,186,0.3)] flex items-center justify-center relative">
          ${payload[0].value}
          {/* Caret pointing down */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0DBCBA] rotate-45" />
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = ["2026", "2025", "2024", "2023"];

  // API Call for overall stats
  const { data: overallStats, isLoading } = useOverAllStateQuery({
    range: selectedYear,
  });

  // Extract API data or fall back to dummyData
  const apiData = overallStats?.data || overallStats;
  const chartData = Array.isArray(apiData) && apiData.length > 0 ? apiData : dummyData;

  // Active tooltip index state (defaults to null, showing only on hover)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Sync activeIndex if chartData changes and has fewer elements
  useEffect(() => {
    if (chartData && chartData.length > 0 && activeIndex !== null) {
      if (activeIndex >= chartData.length) {
        setActiveIndex(chartData.length - 1);
      }
    }
  }, [chartData, activeIndex]);

  const handleMouseMove = (state: any) => {
    if (state && state.activeTooltipIndex !== undefined) {
      setActiveIndex(state.activeTooltipIndex);
    } else {
      setActiveIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const activeItem = activeIndex !== null ? chartData[activeIndex] : null;
  const firstMonth = chartData[0]?.month || "Jan";

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 w-full h-[380px] flex flex-col justify-between animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-9 bg-gray-200 rounded-xl w-24" />
        </div>
        <div className="flex-1 bg-gray-100 rounded-2xl w-full" />
      </div>
    );
  }

  const ActiveAreaChart = AreaChart as any;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 w-full h-[380px] flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#0DBCBA]">Revenue</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer outline-none transition-all font-medium"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <ActiveAreaChart
            data={chartData}
            activeTooltipIndex={activeIndex !== null ? activeIndex : undefined}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0DBCBA" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0DBCBA" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              dy={12}
              tick={{ fill: "#94A3B8", fontSize: 13, fontWeight: 500 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              dx={-8}
              tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
              tick={{ fill: "#94A3B8", fontSize: 13, fontWeight: 500 }}
              ticks={[0, 2000, 4000, 6000, 8000]}
              domain={[0, 9000]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              isAnimationActive={false}
            />

            {/* Custom dashed tracking lines for active point */}
            {activeItem && (
              <>
                {/* Horizontal line from left axis to active point */}
                <ReferenceLine
                  segment={[
                    { x: firstMonth, y: activeItem.revenue },
                    { x: activeItem.month, y: activeItem.revenue },
                  ]}
                  stroke="#0DBCBA"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
                {/* Vertical line from bottom axis to active point */}
                <ReferenceLine
                  segment={[
                    { x: activeItem.month, y: 0 },
                    { x: activeItem.month, y: activeItem.revenue },
                  ]}
                  stroke="#0DBCBA"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
              </>
            )}

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0DBCBA"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              isAnimationActive={false}
              activeDot={{
                r: 6,
                fill: "#0DBCBA",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </ActiveAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;