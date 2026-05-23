import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-hot-toast";
import { FiEye, FiEdit2, FiX, FiArrowLeft } from "react-icons/fi";

interface WarningMessageItem {
  id: string;
  title: string;
  shortText: string; // The preview text shown on the card
  fullHtml: string;  // The full editable HTML content
}

const initialWarnings: WarningMessageItem[] = [
  {
    id: "1",
    title: "Swap Agreement Confirmation",
    shortText: "Before proceeding, please confirm that you understand and agree to the following:\nBoth parties must complete their swap within the agreed time limit.\nThe swap timer will start only after both Swappers have paid the required swap fee.",
    fullHtml: `<h2>Swap Agreement Confirmation</h2>
<p>Before proceeding, please confirm that you understand and agree to the following:</p>
<ul>
  <li>Both parties must complete their swap within the agreed time limit.</li>
  <li>The swap timer will start only after both Swappers have paid the required swap fee.</li>
  <li>Swap fees are non-refundable once the timer starts.</li>
  <li>You are responsible for sending funds to the correct details provided.</li>
  <li>If one party fails to complete the swap within the time limit, the case may be reviewed and appropriate action taken.</li>
  <li>Any dispute must be raised before the timer expires.</li>
  <li>Providing false payment proof may result in account suspension.</li>
</ul>`,
  },
  {
    id: "2",
    title: "Request Extension Pop Up",
    shortText: "Need a little more time? You can extend your session by 30 minutes to complete this swap. This helps keep your transaction active and prevents it from expiring.",
    fullHtml: `<h2>Request Extension Pop Up</h2>
<p>Need a little more time? You can extend your session by 30 minutes to complete this swap. This helps keep your transaction active and prevents it from expiring.</p>`,
  },
  {
    id: "3",
    title: "Cancel This Swap Pop Up",
    shortText: "If you cancel this swap, the admin fee will not be refunded, and the transaction will be permanently terminated. Are you sure you want to proceed?",
    fullHtml: `<h2>Cancel This Swap Pop Up</h2>
<p>If you cancel this swap, the admin fee will not be refunded, and the transaction will be permanently terminated. Are you sure you want to proceed?</p>`,
  },
  {
    id: "4",
    title: "Log Out Pop Up",
    shortText: "Are you sure you want to log out?",
    fullHtml: `<h2>Log Out Pop Up</h2>
<p>Are you sure you want to log out?</p>`,
  },
  {
    id: "5",
    title: "Enquiry Pop Up",
    shortText: "Thanks for getting in touch. Our support team has received your request and will get back to you within 72 hours. We'll notify you as soon as there's an update.",
    fullHtml: `<h2>Enquiry Pop Up</h2>
<p>Thanks for getting in touch. Our support team has received your request and will get back to you within 72 hours. We'll notify you as soon as there's an update.</p>`,
  },
  {
    id: "6",
    title: "Profile Incomplete Pop Up",
    shortText: "Thanks for getting in touch. Our support team has received your request and will get back to you within 72 hours. We'll notify you as soon as there's an update.",
    fullHtml: `<h2>Profile Incomplete Pop Up</h2>
<p>Thanks for getting in touch. Our support team has received your request and will get back to you within 72 hours. We'll notify you as soon as there's an update.</p>`,
  },
];

const WarningMessage: React.FC = () => {
  const [warnings, setWarnings] = useState<WarningMessageItem[]>(initialWarnings);
  
  // Views: list | edit
  const [view, setView] = useState<"list" | "edit">("list");
  const [editingWarning, setEditingWarning] = useState<WarningMessageItem | null>(null);
  
  // Edit Form State
  const [editHtml, setEditHtml] = useState("");
  const editorRef = useRef(null);

  // Preview Modal State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<WarningMessageItem | null>(null);

  const editorConfig = {
    readonly: false,
    placeholder: "Start editing warning message...",
    height: 400,
  };

  const handleEditClick = (item: WarningMessageItem) => {
    setEditingWarning(item);
    setEditHtml(item.fullHtml);
    setView("edit");
  };

  const handlePreviewClick = (item: WarningMessageItem) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const handlePublish = () => {
    if (!editingWarning) return;

    // Helper to strip HTML tags for card preview text
    const stripHtml = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };

    const newShortText = stripHtml(editHtml);

    setWarnings((prev) =>
      prev.map((item) =>
        item.id === editingWarning.id
          ? {
              ...item,
              fullHtml: editHtml,
              shortText: newShortText,
            }
          : item
      )
    );

    toast.success(`${editingWarning.title} updated successfully!`);
    setView("list");
    setEditingWarning(null);
  };

  if (view === "edit" && editingWarning) {
    return (
      <div className="p-6 min-h-full bg-[#f1f1f9]">
        {/* Editor Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <button
              onClick={() => setView("list")}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all focus:outline-none shadow-sm"
              title="Back"
            >
              <FiArrowLeft size={18} />
            </button>
            <span className="text-[17px] font-semibold text-[#4E4E4E]">
              Edit {editingWarning.title}
            </span>
          </div>

          <div className="prose max-w-none border border-gray-200 rounded-xl overflow-hidden">
            <JoditEditor
              ref={editorRef}
              value={editHtml}
              config={editorConfig}
              onBlur={(newContent) => setEditHtml(newContent)}
              onChange={() => {}}
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setView("list")}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-8 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/10"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full bg-[#f1f1f9]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-[#1A1C1E] text-2xl font-bold mb-8 text-center relative pb-2 inline-block">
          Warning Messages
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-full" />
        </h2>

        {/* Warning Cards List */}
        <div className="w-full flex flex-col gap-6">
          {warnings.map((item) => (
            <div key={item.id} className="flex flex-col gap-3.5 bg-transparent">
              <span className="text-gray-900 font-bold text-[15px] font-sans">{item.title}</span>
              
              {/* Short Preview text container */}
              <div className="bg-[#F9FAFB] border border-gray-200/50 rounded-xl p-5 text-gray-400 text-xs leading-relaxed font-sans min-h-[90px] whitespace-pre-line shadow-sm">
                {item.shortText}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 justify-end">
                <button
                  onClick={() => handlePreviewClick(item)}
                  className="w-10 h-8 rounded-lg border border-[#0DBCBA]/30 hover:border-[#0DBCBA] text-[#0DBCBA] flex items-center justify-center transition-all bg-white hover:bg-slate-50 focus:outline-none shadow-sm"
                  title="Preview"
                >
                  <FiEye size={16} />
                </button>
                <button
                  onClick={() => handleEditClick(item)}
                  className="w-10 h-8 rounded-lg border border-[#0DBCBA]/30 hover:border-[#0DBCBA] text-[#0DBCBA] flex items-center justify-center transition-all bg-white hover:bg-slate-50 focus:outline-none shadow-sm"
                  title="Edit"
                >
                  <FiEdit2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal Overlay */}
      {isPreviewOpen && previewItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[560px] w-full mx-4 relative flex flex-col items-center border border-gray-100/50">
            {/* Close Button X */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 text-red-500 hover:text-red-700 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {/* Modal Title */}
            <h3 className="text-[#0DBCBA] text-[18px] font-bold mb-6 text-center leading-snug">
              {previewItem.title}
            </h3>

            {/* Modal Content */}
            <div className="w-full text-slate-500 text-xs leading-relaxed font-medium text-center mb-8 px-4 max-h-72 overflow-y-auto whitespace-pre-line">
              {previewItem.shortText}
            </div>

            {/* Continue Button */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="w-full max-w-[240px] py-3 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/15"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarningMessage;
