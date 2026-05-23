import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-hot-toast";
import { FiShield } from "react-icons/fi";

const initialTerms = `<h2>Terms & Conditions</h2>
<p>Welcome to SwapFX. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>
<h3>1. Acceptance of Terms</h3>
<p>By creating an account, swapping currency, or using any services provided by SwapFX, you acknowledge that you have read, understood, and agree to these terms.</p>
<h3>2. Swapping Rules</h3>
<p>All swaps conducted on the platform are peer-to-peer or market-based. Ensure you verify the swapper details, exchange rates, and limits before confirming any transactions.</p>
<h3>3. Account Security</h3>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
<h3>4. Platform Fees</h3>
<p>Platform fees and safety shield fees are calculated dynamically based on transaction volume and country config. All fees are non-refundable.</p>`;

const initialPrivacy = `<h2>Privacy Policy</h2>
<p>Your privacy is important to us. This Privacy Policy explains how SwapFX collects, uses, protects, and shares your personal information.</p>
<h3>1. Information We Collect</h3>
<p>We collect personal information you provide when registering, such as your name, email, phone number, and identity verification documents (like NID cards).</p>
<h3>2. How We Use Information</h3>
<p>We use your information to facilitate currency swaps, process verification, improve platform security, and provide customer support.</p>
<h3>3. Security Measures</h3>
<p>We implement industry-standard encryption, firewalls, and security audits to protect your data from unauthorized access, disclosure, or alteration.</p>
<h3>4. Data Retention</h3>
<p>We retain your personal data only as long as necessary to provide services and comply with legal regulatory obligations.</p>`;

const Legal: React.FC = () => {
  // Tabs: terms | privacy
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  // Isolated states to preserve unsaved changes when switching tabs
  const [termsContent, setTermsContent] = useState(initialTerms);
  const [privacyContent, setPrivacyContent] = useState(initialPrivacy);

  const editorRef = useRef(null);

  // Configuration for Jodit Editor
  const config = {
    readonly: false,
    placeholder: "Start writing here...",
    height: 400,
  };

  const handleSave = () => {
    if (activeTab === "terms") {
      console.log("Saving Terms and Conditions:", termsContent);
      toast.success("Terms & Conditions saved successfully!");
    } else {
      console.log("Saving Privacy Policy:", privacyContent);
      toast.success("Privacy Policy saved successfully!");
    }
  };

  return (
    <div className="p-6 min-h-full bg-[#f1f1f9]">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Full-width Tabs at the very top of the page */}
        <div className="w-full flex border border-gray-200 rounded-t-xl overflow-hidden select-none bg-white">
          <button
            onClick={() => setActiveTab("terms")}
            className={`w-1/2 py-4 text-[15px] font-semibold transition-all flex items-center justify-center gap-2 focus:outline-none ${
              activeTab === "terms"
                ? "bg-[#0DBCBA] text-white"
                : "bg-white text-slate-500 hover:bg-slate-50/50"
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`w-1/2 py-4 text-[15px] font-semibold transition-all flex items-center justify-center gap-2 border-l border-gray-150 focus:outline-none ${
              activeTab === "privacy"
                ? "bg-[#0DBCBA] text-white"
                : "bg-white text-slate-400 hover:bg-slate-50/50"
            }`}
          >
            <FiShield size={16} className={activeTab === "privacy" ? "text-white" : "text-slate-400"} />
            Privacy Policy
          </button>
        </div>

        {/* Editor container */}
        <div className="p-6 flex flex-col gap-6">
          <div className="prose max-w-none border border-gray-200 rounded-b-xl overflow-hidden">
            {activeTab === "terms" ? (
              <JoditEditor
                ref={editorRef}
                value={termsContent}
                config={config}
                onBlur={(newContent) => setTermsContent(newContent)}
                onChange={() => {}}
              />
            ) : (
              <JoditEditor
                ref={editorRef}
                value={privacyContent}
                config={config}
                onBlur={(newContent) => setPrivacyContent(newContent)}
                onChange={() => {}}
              />
            )}
          </div>

          {/* Submit/Publish button right-aligned */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSave}
              className="px-8 py-2.5 bg-[#0DBCBA] text-white rounded-xl text-sm font-semibold hover:bg-[#0aa6a4] transition-all focus:outline-none shadow-md shadow-[#0dbebc]/10"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
