import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface AlertItem {
  id: string;
  title: string;
  severity: "high" | "medium";
  name: string;
  userId: string;
  details: string;
  time: string;
}

const initialAlerts: AlertItem[] = [
  {
    id: "alert-1",
    title: "Rapid Swaps",
    severity: "high",
    name: "John Doe",
    userId: "USR-007",
    details: "5 swaps in 10 minutes",
    time: "2 hours ago",
  },
  {
    id: "alert-2",
    title: "High-Value Swap",
    severity: "medium",
    name: "Jane Smith",
    userId: "USR-008",
    details: "$25,000 USD → EUR",
    time: "4 hours ago",
  },
];

const SecurityAlerts = () => {
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const handleBlockUser = (userId: string, userName: string) => {
    if (blockedUsers.includes(userId)) return;

    setBlockedUsers((prev) => [...prev, userId]);
    toast.success(`${userName} (${userId}) has been blocked successfully!`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50 w-full">
      {/* Header section */}
      <h2 className="text-lg font-bold text-gray-800 font-sans tracking-wide mb-4">
        Real-Time Security Alerts
      </h2>

      {initialAlerts.map((alert) => {
        const isHigh = alert.severity === "high";
        const isBlocked = blockedUsers.includes(alert.userId);

        return (
          <div key={alert.id}>
            {/* Divider line before items and between items */}
            <div className="border-b border-gray-100 -mx-6 mb-4" />

            <div className="flex items-start justify-between px-2 pb-2">
              <div className="flex items-start gap-4">
                {/* Warning Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isHigh
                      ? "bg-red-50 text-red-500 border border-red-100/30"
                      : "bg-amber-50 text-amber-500 border border-amber-100/30"
                  }`}
                >
                  <FiAlertTriangle size={20} />
                </div>

                {/* Text details */}
                <div className="flex flex-col">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-bold text-gray-800 text-[15px] font-sans">
                      {alert.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase ${
                        isHigh
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {alert.severity} severity
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1 font-medium font-sans">
                    {alert.name}{" "}
                    <span className="text-gray-400 font-normal">
                      ({alert.userId})
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5 font-sans font-normal">
                    {alert.details}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-sans font-normal">
                    {alert.time}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBlockUser(alert.userId, alert.name)}
                disabled={isBlocked}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isBlocked
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/50"
                    : "bg-red-50 text-red-500 hover:bg-red-100/80 hover:text-red-600 border border-red-100/50 active:scale-95"
                }`}
              >
                {isBlocked ? "Blocked" : "Block User"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecurityAlerts;
