import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiEye,
  FiEdit,
  FiTrash2,
  FiX,
  FiArrowLeft,
  FiArrowRight,
  FiUserPlus,
  FiAlertTriangle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import defaultAvatar from "../../assets/randomProfile2.jpg";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  adminId: string;
  avatar?: string;
}

const initialAdmins: AdminUser[] = [
  { id: "1", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Super Admin", phone: "+1 (555) 012-3456", adminId: "ADM-992-01" },
  { id: "2", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Admin", phone: "+1 (555) 012-3457", adminId: "ADM-992-02" },
  { id: "3", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Support Agent", phone: "+1 (555) 012-3458", adminId: "ADM-992-03" },
  { id: "4", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Support Agent", phone: "+1 (555) 012-3459", adminId: "ADM-992-04" },
  { id: "5", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Support Agent", phone: "+1 (555) 012-3460", adminId: "ADM-992-05" },
  { id: "6", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Support Agent", phone: "+1 (555) 012-3461", adminId: "ADM-992-06" },
  { id: "7", name: "Md Shakir Ahmed", email: "Example@Gmail.Com", role: "Admin", phone: "+1 (555) 012-3462", adminId: "ADM-992-07" },
  { id: "8", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Admin", phone: "+1 (555) 012-3463", adminId: "ADM-992-08" },
  { id: "9", name: "Sarah Admin", email: "Example@Gmail.Com", role: "Admin", phone: "+1 (555) 012-3464", adminId: "ADM-992-09" }
];

// Add dummy data for pagination testing
for (let i = 10; i <= 20; i++) {
  initialAdmins.push({
    id: String(i),
    name: i % 2 === 0 ? "Sarah Admin" : "Alex Admin",
    email: `admin${i}@gmail.com`,
    role: i % 3 === 0 ? "Super Admin" : i % 2 === 0 ? "Admin" : "Support Agent",
    phone: `+1 (555) 012-34${50 + i}`,
    adminId: `ADM-992-${i}`
  });
}

const Vendors: React.FC = () => {
  // Main data state
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);

  // View state machine: list | create | edit
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  // Modal states: view details | delete confirmation
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Form Fields states
  const [fullName, setFullName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [assignedRole, setAssignedRole] = useState("Support Agent");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter search queries
  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAdmins = filteredAdmins.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredAdmins.length / pageSize);

  // Trigger create flow
  const handleAddNewClick = () => {
    setFullName("");
    setAdminId(`ADM-992-${admins.length + 1}`);
    setEmailAddress("");
    setContactNumber("");
    setAssignedRole("Support Agent");
    setAvatarUrl(null);
    setViewMode("create");
  };

  // Trigger edit flow
  const handleEditClick = (admin: AdminUser, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAdmin(admin);
    setFullName(admin.name);
    setAdminId(admin.adminId);
    setEmailAddress(admin.email);
    setContactNumber(admin.phone);
    setAssignedRole(admin.role);
    setAvatarUrl(admin.avatar || null);
    setViewMode("edit");
  };

  // Trigger view details dialog
  const handleViewClick = (admin: AdminUser, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAdmin(admin);
    setIsViewModalOpen(true);
  };

  // Trigger delete dialog
  const handleDeleteClick = (admin: AdminUser, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAdmin(admin);
    setIsDeleteConfirmOpen(true);
  };

  // Handle avatar upload preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // Create admin form submit
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim() || !contactNumber.trim()) {
      toast.error("Please fill in all connectivity and identity fields.");
      return;
    }

    const newAdmin: AdminUser = {
      id: String(admins.length + 1),
      name: fullName,
      email: emailAddress,
      role: assignedRole,
      phone: contactNumber,
      adminId: adminId,
      avatar: avatarUrl || undefined,
    };

    setAdmins((prev) => [newAdmin, ...prev]);
    toast.success("Admin Profile created successfully!");
    setViewMode("list");
  };

  // Edit admin form submit
  const handleEditAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim() || !contactNumber.trim() || !selectedAdmin) {
      toast.error("Please fill in all connectivity and identity fields.");
      return;
    }

    setAdmins((prev) =>
      prev.map((adm) =>
        adm.id === selectedAdmin.id
          ? {
              ...adm,
              name: fullName,
              email: emailAddress,
              role: assignedRole,
              phone: contactNumber,
              adminId: adminId,
              avatar: avatarUrl || undefined,
            }
          : adm
      )
    );
    toast.success("Admin Profile updated successfully!");
    setViewMode("list");
  };

  // Delete admin confirmation
  const handleConfirmDelete = () => {
    if (!selectedAdmin) return;
    setAdmins((prev) => prev.filter((adm) => adm.id !== selectedAdmin.id));
    toast.success(`Admin ${selectedAdmin.name} deleted successfully!`);
    setIsDeleteConfirmOpen(false);
  };

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
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
          currentPage === pageNumber
            ? "bg-[#0DBCBA] text-white shadow-md shadow-[#0dbcba]/25"
            : "bg-white border border-gray-150 text-gray-500 hover:bg-gray-50 shadow-sm"
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
          <span key="dots" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      } else if (currentPage >= totalPages - 3) {
        items.push(renderButton(1));
        items.push(
          <span key="dots" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        for (let i = totalPages - 5; i <= totalPages; i++) {
          items.push(renderButton(i));
        }
      } else {
        items.push(renderButton(1));
        items.push(
          <span key="dots1" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(renderButton(i));
        }
        items.push(
          <span key="dots2" className="w-10 h-10 flex items-end justify-center text-gray-400 pb-2.5 font-bold">
            ...
          </span>
        );
        items.push(renderButton(totalPages));
      }
    }

    return items;
  };

  return (
    <div className="p-8 min-h-full bg-[#f5f6f8]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* VIEW MODE: TICKET/STAFF LIST */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-5">
            {/* Top Bar search and action button */}
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <FiSearch size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0DBCBA] focus:ring-1 focus:ring-[#0DBCBA] transition-all shadow-sm"
                />
              </div>

              <button
                onClick={handleAddNewClick}
                className="py-2.5 px-5 bg-[#0DBCBA] text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-[#0aa6a4] transition-all shadow-sm shadow-[#0dbcba]/10 focus:outline-none"
              >
                <FiUserPlus size={16} /> Add New Admin
              </button>
            </div>

            {/* Custom Table element (matching CFF2F1 header color and styling) */}
            <div className="w-full bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#CFF2F1] text-[#4E4E4E] font-bold text-xs">
                    <th className="py-4 px-6 uppercase tracking-wider text-center w-48">Admin Name</th>
                    <th className="py-4 px-6 uppercase tracking-wider text-center w-64">Admin Email</th>
                    <th className="py-4 px-6 uppercase tracking-wider text-center w-48">Role</th>
                    <th className="py-4 px-6 uppercase tracking-wider text-center w-48">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
                  {paginatedAdmins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 text-center font-bold text-gray-800">{admin.name}</td>
                      <td className="py-4 px-6 text-center font-medium text-gray-500">{admin.email}</td>
                      <td className="py-4 px-6 text-center font-bold text-gray-800">{admin.role}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center items-center gap-2.5">
                          {/* View button */}
                          <button
                            onClick={(e) => handleViewClick(admin, e)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#0DBCBA]/30 text-[#0DBCBA] flex items-center justify-center hover:bg-slate-50 transition-all focus:outline-none shadow-sm"
                            title="View Profile Details"
                          >
                            <FiEye size={15} />
                          </button>
                          {/* Edit button */}
                          <button
                            onClick={(e) => handleEditClick(admin, e)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#0DBCBA]/30 text-[#0DBCBA] flex items-center justify-center hover:bg-slate-50 transition-all focus:outline-none shadow-sm"
                            title="Edit Admin Details"
                          >
                            <FiEdit size={15} />
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={(e) => handleDeleteClick(admin, e)}
                            className="w-8 h-8 rounded-lg bg-white border border-[#0DBCBA]/30 text-[#0DBCBA] flex items-center justify-center hover:bg-slate-50 transition-all focus:outline-none shadow-sm"
                            title="Delete Admin Profile"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAdmins.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400 text-sm">
                        No admin accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination custom centered circles */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiArrowLeft size={20} />
                </button>

                {renderPaginationItems()}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE: CREATE ADMIN PAGE VIEW (Image 2 style) */}
        {viewMode === "create" && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-scaleUp">
            {/* Header section */}
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-gray-900 font-bold text-2xl">Create Admin</h2>
              <button
                onClick={() => setViewMode("list")}
                className="w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Left Profile Avatar Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm w-full sm:w-[240px] flex flex-col items-center gap-4 text-center shrink-0">
                <div className="relative w-28 h-28">
                  <img
                    src={avatarUrl || defaultAvatar}
                    alt="Upload Avatar"
                    className="w-full h-full object-cover rounded-full border border-gray-100 shadow-sm"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#eef0f2] border-2 border-white flex items-center justify-center text-gray-600 hover:bg-gray-200 shadow-sm cursor-pointer"
                  >
                    <FiEye size={13} className="hidden" />
                    <span className="font-bold text-sm">+</span>
                  </button>
                </div>
                <h4 className="text-gray-900 font-bold text-sm tracking-wide truncate max-w-full">
                  {fullName || "Sarah Mitchell"}
                </h4>
              </div>

              {/* Right Profile Fields Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-150 shadow-sm flex-1 flex flex-col gap-6 w-full">
                {/* Section 1: Primary Identity */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-sm tracking-wide leading-none">
                    Primary Identity
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="Sarah Mitchell"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Admin ID</label>
                      <input
                        type="text"
                        placeholder="ADM-992-01"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-55 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Connectivity */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-sm tracking-wide leading-none">
                    Connectivity
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="s.mitchell@curator.io"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                    />
                    <span className="text-[10px] text-gray-400 font-medium">Used for primary system notifications and recovery.</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Contact Number</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 012-3456"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                    />
                  </div>
                </div>

                {/* Section 3: Administrative Scope */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-sm tracking-wide leading-none">
                    Administrative Scope
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Assigned Role</label>
                    <select
                      value={assignedRole}
                      onChange={(e) => setAssignedRole(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all cursor-pointer"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Support Agent">Support Agent</option>
                    </select>
                  </div>
                </div>

                {/* Action buttons footer */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-xs font-semibold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/15"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* VIEW MODE: EDIT ADMIN DETAILS PAGE VIEW (Image 4 style) */}
        {viewMode === "edit" && selectedAdmin && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-scaleUp">
            {/* Header section */}
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-gray-900 font-bold text-2xl">Edit Admin Details</h2>
              <button
                onClick={() => setViewMode("list")}
                className="w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleEditAdmin} className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Left Profile Avatar Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm w-full sm:w-[240px] flex flex-col items-center gap-4 text-center shrink-0">
                <div className="relative w-28 h-28">
                  <img
                    src={avatarUrl || defaultAvatar}
                    alt="Upload Avatar"
                    className="w-full h-full object-cover rounded-full border border-gray-100 shadow-sm"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#eef0f2] border-2 border-white flex items-center justify-center text-gray-600 hover:bg-gray-200 shadow-sm cursor-pointer"
                  >
                    <span className="font-bold text-sm">+</span>
                  </button>
                </div>
                <h4 className="text-gray-900 font-bold text-sm tracking-wide truncate max-w-full">
                  {fullName}
                </h4>
              </div>

              {/* Right Profile Fields Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-155 shadow-sm flex-1 flex flex-col gap-6 w-full">
                {/* Section 1: Primary Identity */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-sm tracking-wide leading-none">
                    Primary Identity
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="Sarah Mitchell"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Admin ID</label>
                      <input
                        type="text"
                        placeholder="ADM-992-01"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-55 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Connectivity */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-sm tracking-wide leading-none">
                    Connectivity
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="s.mitchell@curator.io"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                    />
                    <span className="text-[10px] text-gray-400 font-medium">Used for primary system notifications and recovery.</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Contact Number</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 012-3456"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all"
                    />
                  </div>
                </div>

                {/* Section 3: Administrative Scope */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-sm tracking-wide leading-none">
                    Administrative Scope
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Assigned Role</label>
                    <select
                      value={assignedRole}
                      onChange={(e) => setAssignedRole(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:border-[#0DBCBA] transition-all cursor-pointer"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Support Agent">Support Agent</option>
                    </select>
                  </div>
                </div>

                {/* Action buttons footer */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-xs font-semibold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/15"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* VIEW ADMIN DETAILS MODAL POPUP (Image 3 style) */}
      {isViewModalOpen && selectedAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[720px] w-full mx-4 relative flex flex-col gap-6 border border-gray-100">
            {/* Header section with close */}
            <div className="flex justify-between items-center">
              <h3 className="text-gray-900 font-bold text-xl leading-none">Admin Profile Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Split layout inside View Details */}
            <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
              {/* Left card */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 w-full sm:w-[220px] flex flex-col items-center gap-4 text-center shrink-0">
                <img
                  src={selectedAdmin.avatar || defaultAvatar}
                  alt="Admin Avatar"
                  className="w-28 h-28 object-cover rounded-full border border-gray-250 shadow-sm"
                />
                <h4 className="text-gray-900 font-bold text-sm tracking-wide truncate max-w-full">
                  {selectedAdmin.name}
                </h4>
              </div>

              {/* Right card displaying detailed properties */}
              <div className="flex-1 flex flex-col gap-5 w-full">
                {/* Section 1: Identity Profile */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-xs uppercase tracking-wide leading-none select-none">
                    Identity Profile
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Full Name</span>
                      <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 font-medium select-all">
                        {selectedAdmin.name}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Admin ID</span>
                      <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 font-medium select-all">
                        {selectedAdmin.adminId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Points */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-xs uppercase tracking-wide leading-none select-none">
                    Contact Points
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Primary Email</span>
                    <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 font-medium select-all">
                      {selectedAdmin.email}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Contact Number</span>
                    <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 font-medium select-all">
                      {selectedAdmin.phone}
                    </div>
                  </div>
                </div>

                {/* Section 3: Permissions Scope */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2 border-l-[3px] border-[#0DBCBA] pl-2 text-gray-900 font-bold text-xs uppercase tracking-wide leading-none select-none">
                    Permissions Scope
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Assigned Role</span>
                    <div className="px-4 py-2 bg-gray-55 border border-gray-200 rounded-xl text-xs text-gray-850 font-bold select-all">
                      {selectedAdmin.role === "Super Admin" ? "Global Administrator" : selectedAdmin.role === "Admin" ? "System Administrator" : "Support Associate"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION WARNING MODAL (Image 5 style) */}
      {isDeleteConfirmOpen && selectedAdmin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[420px] w-full mx-4 relative flex flex-col items-center text-center border border-gray-100">
            {/* Close button top right */}
            <button
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#8E8E93] text-white flex items-center justify-center hover:bg-gray-600 transition-all focus:outline-none shadow-sm"
            >
              <FiX size={18} />
            </button>

            {/* Warning triangle in pink square */}
            <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] flex items-center justify-center mb-6 mt-2">
              <FiAlertTriangle size={28} className="text-[#EF4444]" />
            </div>

            {/* Confirmation query */}
            <h4 className="text-gray-900 font-bold text-lg mb-6 leading-snug">
              Are you sure you want to Delete {selectedAdmin.name} ?
            </h4>

            {/* Confirm button */}
            <button
              onClick={handleConfirmDelete}
              className="w-full py-3 bg-[#0DBCBA] hover:bg-[#0aa6a4] text-white rounded-xl text-sm font-semibold transition-all focus:outline-none shadow-sm shadow-[#0dbcba]/15"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
