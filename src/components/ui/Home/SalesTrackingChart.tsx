import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataByYear: Record<string, { month: string; value: number }[]> = {
  "2025": [
    { month: "Jan", value: 42 },
    { month: "Feb", value: 63 },
    { month: "Mar", value: 82 },
    { month: "Apr", value: 45 },
    { month: "May", value: 80 },
    { month: "Jun", value: 52 },
    { month: "Jul", value: 92 },
    { month: "Aug", value: 56 },
    { month: "Sep", value: 92 },
    { month: "Oct", value: 57 },
    { month: "Nov", value: 83 },
    { month: "Dec", value: 47 },
  ],
  "2024": [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 70 },
    { month: "Apr", value: 40 },
    { month: "May", value: 65 },
    { month: "Jun", value: 48 },
    { month: "Jul", value: 80 },
    { month: "Aug", value: 50 },
    { month: "Sep", value: 85 },
    { month: "Oct", value: 60 },
    { month: "Nov", value: 75 },
    { month: "Dec", value: 55 },
  ],
  "2026": [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 70 },
    { month: "Mar", value: 90 },
    { month: "Apr", value: 60 },
    { month: "May", value: 85 },
    { month: "Jun", value: 65 },
    { month: "Jul", value: 95 },
    { month: "Aug", value: 70 },
    { month: "Sep", value: 98 },
    { month: "Oct", value: 75 },
    { month: "Nov", value: 90 },
    { month: "Dec", value: 60 },
  ],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0DBCBA] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(13,188,186,0.25)] border border-white/20">
        {payload[0].value}%
      </div>
    );
  }
  return null;
};

const SalesTrackingChart = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const years = ["2025", "2024", "2026"];
  const currentData = dataByYear[selectedYear] || dataByYear["2025"];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header section with title and Year dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 font-sans tracking-wide">
          Total Subscriber Monthly
        </h2>
        
        {/* Custom styled select dropdown */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-[#0DBCBA] rounded-xl px-4 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer outline-none transition-all font-medium appearance-none pr-9 shadow-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#0DBCBA]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="flex-1 w-full h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
            barGap={0}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tickFormatter={(val) => `${val}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              dx={-5}
            />
            <Tooltip
              cursor={false}
              content={<CustomTooltip />}
              isAnimationActive={false}
            />
            <Bar
              dataKey="value"
              fill="#0DBCBA"
              barSize={18}
              radius={20}
              background={{ fill: "#E0F7F6", radius: 20 }}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrackingChart;
