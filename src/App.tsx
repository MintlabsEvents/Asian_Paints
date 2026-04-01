/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { FormData, Page } from './types';
import { Navbar } from './components/Navbar';
import { StartPage } from './components/StartPage';
import { FormPage } from './components/FormPage';
import { DownloadPage } from './components/DownloadPage';
import Loader from './components/Loader';
import { DecorativeElements } from './components/DecorativeElements';
import { submitForm } from "./api/api";
const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  mobile: '',
  email: '',
  questionC: null,
  questionD: null,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('START');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleStart = () => setCurrentPage('FORM');

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
    else if (!/^\+?[\d\s-]{8,}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    
    if (!formData.questionC) newErrors.questionC = 'Please select an option for Question C';
    if (!formData.questionD) newErrors.questionD = 'Please select an option for Question D';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    setCurrentPage('LOADING');

    try {
      await submitForm(formData); // 🔥 send to backend
      setCurrentPage('DOWNLOAD');
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setCurrentPage('FORM');
    }
  }
};

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-1 flex flex-col pt-24">
        <AnimatePresence mode="wait">
          {currentPage === 'START' && (
            <StartPage onStart={handleStart} />
          )}

          {currentPage === 'FORM' && (
            <FormPage 
              formData={formData} 
              errors={errors} 
              updateField={updateField} 
              onSubmit={handleSubmit} 
            />
          )}

          {currentPage === 'LOADING' && (
            <Loader />
          )}

          {currentPage === 'DOWNLOAD' && (
            <DownloadPage formData={formData} />
          )}
        </AnimatePresence>
      </main>

      <DecorativeElements />
    </div>
  );
}
