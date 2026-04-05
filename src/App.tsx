/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { FormData, Page } from "./types";
import { StartPage } from "./components/StartPage";
import { FormPage } from "./components/FormPage";
import { DownloadPage } from "./components/DownloadPage";
import Loader from "./components/Loader";
import { DecorativeElements } from "./components/DecorativeElements";
import { submitForm } from "./api/api";
import { getPdfUrl } from "./constants";

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
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

  /* ── VALIDATION ──
     Only validate fields that are actually collected in FormPage.
     mobile & email are in FormData type but NOT asked in the form,
     so we skip them here to avoid blocking submission.
  */
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Employee name is required";

    if (!formData.employeeCode.trim())
      newErrors.employeeCode = "Employee code is required";

    if (!formData.unit.trim())
      newErrors.unit = "Unit is required";

    if (!formData.territory.trim())
      newErrors.territory = "Territory is required";

    if (!formData.questionC || formData.questionC.length === 0)
      newErrors.questionC = "Please select a segment";

    if (!formData.questionD || formData.questionD.length === 0)
      newErrors.questionD = "Please select a category";

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

        // getPdfUrl takes agenda value directly (e.g. "Dealer Profitability")
        const pdfUrl = getPdfUrl(formData.agenda);

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
      <main className="flex-1 flex flex-col">
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