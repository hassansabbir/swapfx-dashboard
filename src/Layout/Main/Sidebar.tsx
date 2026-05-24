import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.png";

import {
  FiGrid,
  FiUser,
  FiPlusCircle,
  FiCreditCard,
  FiRotateCcw,
  FiFileText,
  FiShield,
  FiMessageSquare,
  FiAlertTriangle,
  FiSend,
  FiGlobe,
  FiLock,
  FiMonitor,
  FiLogOut,
  FiMessageCircle,
} from "react-icons/fi";
import { IoSwapHorizontalOutline } from "react-icons/io5";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const menuItems: SidebarItem[] = [
    {
      name: "Overview",
      path: "/",
      icon: <FiGrid size={18} />,
    },
    {
      name: "Swapper Management",
      path: "/swappers-management",
      icon: <FiUser size={18} />,
    },
    {
      name: "Platform Fee",
      path: "/platform-fee",
      icon: <FiPlusCircle size={18} />,
    },
    {
      name: "Membership",
      path: "/membership",
      icon: <FiCreditCard size={18} />,
    },
    {
      name: "Swap",
      path: "/swap",
      icon: <IoSwapHorizontalOutline size={18} />,
    },
    {
      name: "Refund",
      path: "/refund",
      icon: <FiRotateCcw size={18} />,
    },
    {
      name: "Legal",
      path: "/terms-and-condition",
      icon: <FiFileText size={18} />,
    },
    {
      name: "Support & Dispute",
      path: "/support-dispute",
      icon: <FiShield size={18} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <FiMessageSquare size={18} />,
    },
    {
      name: "Warning Message",
      path: "/warning-message",
      icon: <FiAlertTriangle size={18} />,
    },
    {
      name: "Main Admin",
      path: "/personal-information",
      icon: <FiUser size={18} />,
    },
    {
      name: "Admin Users",
      path: "/staff-list",
      icon: <FiSend size={18} />,
    },
    {
      name: "Reputation & Trust",
      path: "/reputation-trust",
      icon: <FiShield size={18} />,
    },
    {
      name: "Protocol Controls",
      path: "/protocol-controls",
      icon: <FiGlobe size={18} />,
    },
    {
      name: "Security & Fraud Controls",
      path: "/security-fraud",
      icon: <FiLock size={18} />,
    },
    {
      name: "Monitoring & Audit Controls",
      path: "/monitoring-audit",
      icon: <FiMonitor size={18} />,
    },
    {
      name: "Chat Logs",
      path: "/chat-logs",
      icon: <FiMessageCircle size={18} />,
    },
  ];

  const handleItemClick = (item: SidebarItem) => {
    if (item.path.startsWith("coming-soon")) {
      toast(`${item.name} is coming soon!`, {
        icon: "🚀",
      });
      return;
    }
    navigate(item.path);
  };

  return (
    <div className="h-full flex flex-col justify-between py-6 px-4 bg-white select-none">
      <div>
        {/* Logo Section */}
        <div className="mb-6 flex items-center justify-center">
          <Link to="/" className="py-2">
            <img src={logo} alt="SwapFX Logo" className="h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* Menu Items List */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            // Check active state
            const isActive =
              item.path === "/"
                ? path === "/"
                : !item.path.startsWith("coming-soon") && path.startsWith(item.path);

            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-sans font-medium transition-all ${isActive
                    ? "bg-[#0DBCBA] text-white shadow-sm font-semibold animate-none"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <div className={`transition-colors ${isActive ? "text-white" : "text-[#94A3B8]"}`}>
                  {item.icon}
                </div>
                <span className="text-[13px] tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 border-t border-slate-100 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-sans font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
        >
          <FiLogOut size={18} className="text-red-500" />
          <span className="text-[13px] tracking-wide">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
