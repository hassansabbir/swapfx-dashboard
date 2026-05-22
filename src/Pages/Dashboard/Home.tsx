import { useState } from "react";
import ActivityChart from "@/components/ui/Home/ActivityChart";
import GeneralStateSection from "@/components/ui/Home/GeneralStateSection";
import RevenueChart from "@/components/ui/Home/RevenueChart";
import SalesTrackingChart from "@/components/ui/Home/SalesTrackingChart";
import SecurityAlerts from "@/components/ui/Home/SecurityAlerts";

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const countries = ["Pakistan", "United States", "United Kingdom", "Canada"];

  return (
    <div className="space-y-3 mb-3">
      {/* General state stats cards */}
      <GeneralStateSection />

      {/* Country selection dropdown positioned exactly like the image */}
      <div className="flex justify-end pr-1 -my-1">
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border border-[#0DBCBA] rounded-xl px-4 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer outline-none transition-all font-medium appearance-none pr-9 shadow-sm"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
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

      {/* Main Revenue Line/Area Chart */}
      <RevenueChart />

      {/* Sub-charts: Monthly Subscribers & Swapper Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 h-[350px] flex flex-col justify-between">
          <SalesTrackingChart />
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 h-[350px] flex flex-col justify-between">
          <ActivityChart />
        </div>
      </div>

      {/* Real-Time Security Alerts */}
      <SecurityAlerts />
    </div>
  );
};

export default Home;
