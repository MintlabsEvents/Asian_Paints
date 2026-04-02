import React from "react";
import { motion } from "motion/react";
import { User, Phone, Mail, Briefcase, MapPin, Tag, Target, LayoutGrid } from "lucide-react";
import { FormData } from "../types";

interface FormPageProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (field: keyof FormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const segmentOptions = [
  "Industries",
  "Government",
  "Builders",
  "CHS",
  "Social",
  "Commercial & Residential Infrastructure",
];

const categoryOptions = [
  "Flooring",
  "Waterproofing",
  "Admixtures",
  "Powder Repair",
  "Special Repair",
  "Tile Adhesives",
  "Wood Coatings",
];

const agendaOptions = [
  "Dealer Profitability",
  "Expand Dealer Network",
  "Expand Contractor Network",
  "Engage Network",
  "Surface Share Gain",
];

export const FormPage: React.FC<FormPageProps> = ({
  formData,
  errors,
  updateField,
  onSubmit,
}) => {
  // Multi-select toggle
  const toggleMultiSelect = (field: "questionC" | "questionD", value: string) => {
    const current: string[] = formData[field] || [];
    if (current.includes(value)) {
      updateField(field, current.filter((item) => item !== value));
    } else {
      updateField(field, [...current, value]);
    }
  };

  // Strip non-digits, cap at 10 characters
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    updateField("mobile", digits);
  };

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gold">
          Goal Setting Exercise
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">

          {/* ── EMPLOYEE NAME ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Employee Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full bg-navy/50 border ${
                errors.fullName ? "border-red-500" : "border-white/20"
              } rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.fullName}</p>
            )}
          </div>

          {/* ── EMPLOYEE CODE ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={14} /> Employee Code
            </label>
            <input
              type="text"
              value={formData.employeeCode || ""}
              onChange={(e) => updateField("employeeCode", e.target.value)}
              placeholder="Enter your employee code"
              className={`w-full bg-navy/50 border ${
                errors.employeeCode ? "border-red-500" : "border-white/20"
              } rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.employeeCode && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.employeeCode}</p>
            )}
          </div>

          {/* ── MOBILE — digits only, max 10 ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Phone size={14} /> Mobile Number
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={handleMobileChange}
              placeholder="10-digit mobile number"
              maxLength={10}
              inputMode="numeric"
              className={`w-full bg-navy/50 border ${
                errors.mobile ? "border-red-500" : "border-white/20"
              } rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.mobile}</p>
            )}
          </div>

          {/* ── EMAIL ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="name@company.com"
              className={`w-full bg-navy/50 border ${
                errors.email ? "border-red-500" : "border-white/20"
              } rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>
            )}
          </div>

          {/* ── UNIT ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <LayoutGrid size={14} /> Unit
            </label>
            <input
              type="text"
              value={formData.unit || ""}
              onChange={(e) => updateField("unit", e.target.value)}
              placeholder="Enter your unit"
              className={`w-full bg-navy/50 border ${
                errors.unit ? "border-red-500" : "border-white/20"
              } rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.unit && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.unit}</p>
            )}
          </div>

          {/* ── TERRITORY ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin size={14} /> Territory
            </label>
            <input
              type="text"
              value={formData.territory || ""}
              onChange={(e) => updateField("territory", e.target.value)}
              placeholder="Enter your territory"
              className={`w-full bg-navy/50 border ${
                errors.territory ? "border-red-500" : "border-white/20"
              } rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.territory && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.territory}</p>
            )}
          </div>

          {/* ── SEGMENT (MULTI-SELECT) ── */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Tag size={14} /> Segment
              <span className="text-xs normal-case font-normal text-gray-500">(Select multiple)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {segmentOptions.map((opt) => {
                const isActive = formData.questionC?.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isActive
                        ? "bg-gold/20 border-gold text-gold"
                        : "bg-navy/50 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleMultiSelect("questionC", opt)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isActive ? "border-gold bg-gold/30" : "border-gray-500"
                      }`}
                    >
                      {isActive && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
            {errors.questionC && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.questionC}</p>
            )}
          </div>

          {/* ── CATEGORY (MULTI-SELECT) ── */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Tag size={14} /> Category
              <span className="text-xs normal-case font-normal text-gray-500">(Select multiple)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categoryOptions.map((opt) => {
                const isActive = formData.questionD?.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isActive
                        ? "bg-gold/20 border-gold text-gold"
                        : "bg-navy/50 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleMultiSelect("questionD", opt)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isActive ? "border-gold bg-gold/30" : "border-gray-500"
                      }`}
                    >
                      {isActive && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
            {errors.questionD && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.questionD}</p>
            )}
          </div>

          {/* ── AGENDA (SINGLE SELECT) ── */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Target size={14} /> Agenda
              <span className="text-xs normal-case font-normal text-gray-500">(Select one)</span>
            </label>
            <div className="space-y-2">
              {agendaOptions.map((opt) => {
                const isActive = formData.agenda === opt;
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isActive
                        ? "bg-gold/20 border-gold text-gold"
                        : "bg-navy/50 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="agenda"
                      checked={isActive}
                      onChange={() => updateField("agenda", opt)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isActive ? "border-gold" : "border-gray-500"
                      }`}
                    >
                      {isActive && (
                        <div className="w-2 h-2 bg-gold rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
            {errors.agenda && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.agenda}</p>
            )}
          </div>

          {/* ── SUBMIT ── */}
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-4 rounded-lg mt-4 transition-all shadow-lg shadow-gold/10"
          >
            Submit Application
          </button>

        </form>
      </div>
    </motion.div>
  );
};