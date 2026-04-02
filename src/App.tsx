/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { FormData, Page } from "./types";
import { Navbar } from "./components/Navbar";
import { StartPage } from "./components/StartPage";
import { FormPage } from "./components/FormPage";
import { DownloadPage } from "./components/DownloadPage";
import Loader from "./components/Loader";
import { DecorativeElements } from "./components/DecorativeElements";
import { submitForm } from "./api/api";
import { getPdfUrl } from "./constants";

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  mobile: "",
  email: "",
  questionC: [],
  questionD: [],
  employeeCode: "",
  unit: "",
  territory: "",
  agenda: "",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("START");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleStart = () => setCurrentPage("FORM");

  /* ── VALIDATION ── */
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Employee name is required";

    if (!formData.mobile.trim())
      newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be exactly 10 digits";

    if (!formData.email.trim())
      newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.questionC || formData.questionC.length === 0)
      newErrors.questionC = "Please select at least one segment";

    if (!formData.questionD || formData.questionD.length === 0)
      newErrors.questionD = "Please select at least one category";

    if (!formData.agenda)
      newErrors.agenda = "Please select an agenda";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── SUBMIT ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setCurrentPage("LOADING");

      try {
        await submitForm(formData);

        const c = formData.questionC[0] || null;
        const d = formData.questionD[0] || null;
        const pdfUrl = getPdfUrl(c, d);

        setFormData((prev) => ({ ...prev, pdfUrl }));
        setCurrentPage("DOWNLOAD");
      } catch (error) {
        console.error("Submit error:", error);
        alert("Something went wrong. Please try again.");
        setCurrentPage("FORM");
      }
    }
  };

  /* ── UPDATE FIELD ── */
  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field as soon as user edits it
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  /* ── RENDER ── */
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-1 flex flex-col pt-24">
        <AnimatePresence mode="wait">
          {currentPage === "START" && (
            <StartPage onStart={handleStart} />
          )}

          {currentPage === "FORM" && (
            <FormPage
              formData={formData}
              errors={errors}
              updateField={updateField}
              onSubmit={handleSubmit}
            />
          )}

          {currentPage === "LOADING" && <Loader />}

          {currentPage === "DOWNLOAD" && (
            <DownloadPage formData={formData} />
          )}
        </AnimatePresence>
      </main>

      <DecorativeElements />
    </div>
  );
}