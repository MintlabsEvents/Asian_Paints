import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { FormData } from "../types";
import LeftLogo from '../assets/saless800.png';
import RightLogo from '../assets/ops800.png';
import LapBg from '../assets/images/laptop/bg.png';
import LapBg2 from '../assets/images/laptop/bg1.png';
import MobBg from '../assets/images/mobile/bg.png';
import MobBg2 from '../assets/images/mobile/bg1.png';
import { useImages } from '../context/ImageContext';


interface FormPageProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (field: keyof FormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const segmentOptions = [
  { value: "Factories", label: "Factories" },
  { value: "Government", label: "Government" },
  { value: "Builders", label: "Builders" },
  { value: "CHS", label: "CHS" },
  { value: "Hotels", label: "Hotels" },
  { value: "Educational institutions", label: "Educational institutions" },
];

const categoryOptions = [
  { value: "Flooring",        label: "Flooring",           sub: "Epoxy and PU range of products" },
  { value: "Waterproofing",   label: "Waterproofing Cat2", sub: "PU range, Polyurea, APP Membranes, HDPE membranes etc." },
  { value: "Admixtures",      label: "Admixtures",         sub: "Cement additives, superplasticizers, water reducers, slump reducers etc." },
  { value: "Powder Repair",   label: "Powder Repair",      sub: "Repair Mortar, Micro Concrete etc." },
  { value: "Special Repair",  label: "Special Repair",     sub: "Grouts, Rust Removers for Steel, Protective Coatings" },
  { value: "Tile Adhesives",  label: "Tile Adhesives",     sub: "Regular, tile-on-tile" },
  { value: "Wood Coatings",   label: "Wood Coatings",      sub: "Products for furniture manufacturer supply (non-retail)" },
];

// ⚠️ Values here MUST match keys in AGENDA_PDF_MAPPING in constants.ts exactly
const agendaOptions = [
  { value: "Dealer Profitability",      label: "Dealer profitability:",                           sub: "Improve Suprema ratios and product in relevant categories and work on dealer profitability" },
  { value: "Expand Dealer Network",     label: "Expand dealer network:",                          sub: "Increase LUB dealers in the network and hence improve projects servicing" },
  { value: "Expand Contractor Network", label: "Expand contractor network:",                      sub: "Identify contractors with capability to take up work in larger products" },
  { value: "Engage Network",            label: "Engage network into more categories for growth:", sub: "Increase engagements of current set of dealers/contractors into more categories and products on offer" },
  { value: "Surface Share Gain",        label: "Surface share & segemnt share gain:",             sub: "Identify and work on underpenetrated segments like factories, Govt. and PSUs in collaboration with network to expand business" },
];

const optionBase: React.CSSProperties = { background: '#00ddff', border: '2px solid transparent', transition: 'all 0.15s ease' };
const optionActive: React.CSSProperties = { border: '2px solid white', boxShadow: '0 0 18px rgba(0,221,255,0.7)' };

export const FormPage: React.FC<FormPageProps> = ({ formData, errors, updateField, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [localError, setLocalError]   = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const { images } = useImages();
  type StepType = "multi-text" | "single-select-3col" | "single-select-custom" | "single-select-agenda";

  interface Step {
    id: string;
    section: string;
    subLabel: string;
    type: StepType;
    fields?: { id: keyof FormData; placeholder: string }[];
    options?: { value: string; label: string; sub?: string }[];
    validate: () => string | null;
  }

  const steps: Step[] = [
    /* ── A ── */
    {
      id: "stepA",
     section: "Please enter your details",
      subLabel: "Fill in both fields below",
      type: "multi-text",
      fields: [
        { id: "fullName",     placeholder: "Agent Name" },
        { id: "employeeCode", placeholder: "Agent Code" },
      ],
      validate: () => {
        if (!formData.fullName?.trim())     return "Employee Name is required";
        if (!formData.employeeCode?.trim()) return "Employee Code is required";
        return null;
      },
    },
    /* ── B ── */
    {
      id: "stepB",
      section: "Market Cluster Identification",
      subLabel: "Identify the cluster in your respective market",
      type: "multi-text",
      fields: [
        { id: "unit",      placeholder: "Unit" },
        { id: "territory", placeholder: "Territory" },
      ],
      validate: () => {
        if (!formData.unit?.trim())      return "Unit is required";
        if (!formData.territory?.trim()) return "Territory is required";
        return null;
      },
    },
    /* ── C ── */
    {
      id: "stepC",
      section: "Segment Identification",
subLabel: (
  <>
    Identify the segment that has the most potential in your territory:
    <br />
    (Select any one from the following options)
  </>
),
      type: "single-select-3col",
      options: segmentOptions,
      validate: () => (!formData.questionC || (formData.questionC as string[]).length === 0)
        ? "Please select a segment" : null,
    },
    /* ── D ── */
    {
      id: "stepD",
      section: "Category Identification",
     subLabel: (
  <>
    Which non-paint categories basis your market observation can be taken up as a focused objective in your territory?
    <br />
    (Select any one from the following options)
  </>
),
      type: "single-select-custom",
      options: categoryOptions,
      validate: () => (!formData.questionD || (formData.questionD as string[]).length === 0)
        ? "Please select a category" : null,
    },
    /* ── E ── */
    {
      id: "stepE",
      section: "Mission Objectives",
     subLabel: (
  <>
    Choose the Agenda you want to drive in your territory basis the presentation today
    <br />
    (Select any one from the following options)
  </>
),
      type: "single-select-agenda",
      options: agendaOptions,
      validate: () => !formData.agenda ? "Please select an agenda" : null,
    },
  ];

  const step = steps[currentStep];

  /* ── Navigation ── */
  const handleNext = async () => {
    const err = step.validate();
    if (err) { setLocalError(err); return; }
    setLocalError(null);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsSubmitting(true);
        const submitEvent = { preventDefault: () => {} } as React.FormEvent;
        await onSubmit(submitEvent);
      } catch (error) {
        console.error("Submit failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    setLocalError(null);
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  /* ── Option helpers ── */
  const selectGrid   = (fieldId: keyof FormData, val: string) => updateField(fieldId, [val]);
  const isGridActive = (fieldId: keyof FormData, val: string) => {
    const v = formData[fieldId];
    return Array.isArray(v) ? v[0] === val : false;
  };

  /* ── Pill component ── */
  const Pill = ({ opt, active, onClick }: {
    opt: { value: string; label: string; sub?: string };
    active: boolean;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-2xl cursor-pointer h-auto "
      style={{ ...optionBase, ...(active ? optionActive : {}) }}
    >
      <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-0.5">
        {active && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>
      <div>
        <span className="font-bold text-sm md:text-base text-white block">{opt.label}</span>
        {opt.sub && <span className="text-white/80 text-xs md:text-sm mt-0.5 block">{opt.sub}</span>}
      </div>
    </div>
  );

  /* ── Render step body ── */
  const renderBody = () => {
    /* A & B — two text inputs, stacked mobile / side-by-side desktop */
    if (step.type === "multi-text") {
      return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {step.fields!.map((f) => (
            <div key={f.id} className="flex-1 flex flex-col gap-1">
              <label className="text-[#00ddff] text-sm font-semibold">{f.placeholder}</label>
              <input
                type="text"
                value={(formData[f.id] as string) || ""}
                onChange={(e) => updateField(f.id, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-white/5 border-2 border-[#00ddff]/50 rounded-xl p-4 text-white text-base focus:outline-none focus:border-[#00ddff] transition-all placeholder:text-gray-500"
              />
            </div>
          ))}
        </div>
      );
    }

    /* C — 3 col desktop, 1 col mobile */
    if (step.type === "single-select-3col") {
      return (
        <>
          <div className="flex flex-col gap-3 md:hidden">
            {step.options!.map((opt) => (
              <Pill key={opt.value} opt={opt}
                active={isGridActive("questionC", opt.value)}
                onClick={() => selectGrid("questionC", opt.value)} />
            ))}
          </div>
          <div className="hidden md:grid grid-cols-3 gap-3">
            {step.options!.map((opt) => (
              <Pill key={opt.value} opt={opt}
                active={isGridActive("questionC", opt.value)}
                onClick={() => selectGrid("questionC", opt.value)} />
            ))}
          </div>
        </>
      );
    }

/* D — consistent grid like C */
if (step.type === "single-select-custom") {
  const opts = step.options!;
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {opts.map((opt) => (
          <Pill
            key={opt.value}
            opt={opt}
            active={isGridActive("questionD", opt.value)}
            onClick={() => selectGrid("questionD", opt.value)}
          />
        ))}
      </div>

      {/* Desktop — SAME AS C */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {opts.map((opt) => (
          <Pill
            key={opt.value}
            opt={opt}
            active={isGridActive("questionD", opt.value)}
            onClick={() => selectGrid("questionD", opt.value)}
          />
        ))}
      </div>
    </>
  );
}

/* E — consistent grid like C */
if (step.type === "single-select-agenda") {
  const opts = step.options!;
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {opts.map((opt) => (
          <Pill
            key={opt.value}
            opt={opt}
            active={formData.agenda === opt.value}
            onClick={() => updateField("agenda", opt.value)}
          />
        ))}
      </div>

      {/* Desktop — SAME AS C */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {opts.map((opt) => (
          <Pill
            key={opt.value}
            opt={opt}
            active={formData.agenda === opt.value}
            onClick={() => updateField("agenda", opt.value)}
          />
        ))}
      </div>
    </>
  );
}

    return null;
  };

  // Determine mobile width based on step (first 2 steps = 50%, rest = 70%)
  const getMobileWidth = () => {
    if (currentStep === 0 || currentStep === 1) {
      return "w-[50%]";
    }
    return "w-[75%]";
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">

      {/* BACKGROUND */}
{/* BACKGROUND */}
<div className="hidden md:block absolute inset-0 z-0">
  <img
    src={images.lapBg}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  <img
    src={images.lapBg2}
    alt=""
    className="absolute inset-0 w-full h-full object-contain"
  />
</div>

<div className="block md:hidden absolute inset-0 z-0">
  <img
    src={images.mobBg}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  <img
    src={images.mobBg2}
    alt=""
    className="absolute inset-0 w-full h-full object-contain"
  />
</div>

      {/* LOGOS — exact same as StartPage */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img src={images.lapBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <img src={images.lapBg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="block md:hidden absolute inset-0 z-0">
        <img src={images.mobBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <img src={images.mobBg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* LOGOS */}
      <div className="absolute top-[17%] md:top-[19%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-20 flex justify-between items-center">
        <img src={images.leftLogo} alt="Left Logo"   className="h-[40px] md:h-[120px] w-auto ml-[18%] md:ml-[0%] lg:ml-[0%]" />
        <img src={images.rightLogo} alt="Right Logo" className="h-[40px] md:h-[120px] w-auto mr-[15%] md:mr-[5%] lg:mr-[0%]" />
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 flex flex-col items-center w-full pb-12"
      >
        {/* Spacer: increased to ensure question always below logos with gap */}
        <div className="block md:hidden" style={{ height: 'calc(17vh + 120px)' }} />
        <div className="hidden md:block"  style={{ height: 'calc(19vh + 160px)' }} />

        {/* Conditional width: 50% for steps 0-1, 70% for steps 2-4 on mobile, 90% on desktop */}
        <div className={`md:w-[90%] ${getMobileWidth()} max-w-[1100px] mx-auto`}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Section heading */}
<h2
  className="font-bold text-center mb-1 pb-2 w-full"
  style={{
    color: 'white',
    fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
    textShadow: '0 0 24px #00ddff',
    borderBottom: '2px solid #00ddff',
    lineHeight: 1.2,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    textAlign: 'center',
    marginLeft:'5px'
  }}
>
  {step.section}
</h2>

            {/* Sub-label */}
            <p
              className="text-center font-medium mt-2 mb-5"
              style={{ color: 'rgba(0,221,255,0.85)', fontSize: 'clamp(0.78rem, 1.8vw, 1rem)' }}
            >
              {step.subLabel}
            </p>

            {/* Body */}
            <div className="mb-6">
              {renderBody()}
              {localError && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-3 flex items-center gap-1"
                >
                  <span>⚠</span> {localError}
                </motion.p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: '#00ddff', color: '#001a2e', boxShadow: '0 4px 20px rgba(0,221,255,0.3)' }}
              >
                {currentStep === steps.length - 1 ? (
                  isSubmitting
                    ? "Submitting..."
                    : <> Submit <CheckCircle size={20} /> </>
                ) : (
                  <> Next <ChevronRight size={20} /> </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};