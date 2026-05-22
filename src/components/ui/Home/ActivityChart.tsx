import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dataByRange: Record<
  string,
  {
    centerText: string;
    segments: { name: string; value: number; fill: string }[];
  }
> = {
  Yearly: {
    centerText: "20%",
    segments: [
      { name: "Unfilled", value: 20, fill: "#E0F7F6" },
      { name: "Filled", value: 80, fill: "#0DBCBA" },
    ],
  },
  Monthly: {
    centerText: "35%",
    segments: [
      { name: "Unfilled", value: 35, fill: "#E0F7F6" },
      { name: "Filled", value: 65, fill: "#0DBCBA" },
    ],
  },
  Weekly: {
    centerText: "12%",
    segments: [
      { name: "Unfilled", value: 12, fill: "#E0F7F6" },
      { name: "Filled", value: 88, fill: "#0DBCBA" },
    ],
  },
};

const ActivityChart = () => {
  const [range, setRange] = useState("Yearly");
  const ranges = ["Yearly", "Monthly", "Weekly"];
  const currentData = dataByRange[range] || dataByRange["Yearly"];

  return (
    <div className="w-full flex flex-col justify-between h-full">
      {/* Header section with title and select dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 font-sans tracking-wide">
          Total Swapper Growth
        </h2>

        {/* Custom styled select dropdown */}
        <div className="relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border border-[#0DBCBA] rounded-xl px-4 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer outline-none transition-all font-medium appearance-none pr-9 shadow-sm"
          >
            {ranges.map((r) => (
              <option key={r} value={r}>
                {r}
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

      {/* Radial Pie Chart container */}
      <div className="flex-1 w-full h-[250px] relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Center solid light-cyan circle */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius="38%"
              fill="#E0F7F6"
              isAnimationActive={false}
            />
            {/* Outer donut progress ring */}
            <Pie
              data={currentData.segments}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="88%"
              startAngle={-20}
              endAngle={340}
              isAnimationActive={true}
            >
              {currentData.segments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Text overlay exactly in the center of the solid circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            {currentData.centerText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
