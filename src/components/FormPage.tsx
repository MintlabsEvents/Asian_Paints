import React from 'react';
import { motion } from 'motion/react';
import { User, Phone, Mail } from 'lucide-react';
import { FormData, QuestionOption } from '../types';

interface FormPageProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (field: keyof FormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormPage: React.FC<FormPageProps> = ({ formData, errors, updateField, onSubmit }) => {
  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gold">Registration Form</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full bg-navy/50 border ${errors.fullName ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Phone size={14} /> Mobile Number
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => updateField('mobile', e.target.value)}
              placeholder="+1 234 567 890"
              className={`w-full bg-navy/50 border ${errors.mobile ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="name@company.com"
              className={`w-full bg-navy/50 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 focus:outline-none focus:border-gold transition-colors`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Question C */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Question C: Preferred Service Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['AA', 'BB', 'CC', 'DD'] as QuestionOption[]).map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    formData.questionC === opt 
                      ? 'bg-gold/20 border-gold text-gold' 
                      : 'bg-navy/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.questionC === opt}
                    onChange={() => updateField('questionC', opt)}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.questionC === opt ? 'border-gold' : 'border-gray-500'}`}>
                    {formData.questionC === opt && <div className="w-2 h-2 bg-gold rounded-full" />}
                  </div>
                  <span className="font-medium">{opt}</span>
                </label>
              ))}
            </div>
            {errors.questionC && <p className="text-red-500 text-xs mt-1">{errors.questionC}</p>}
          </div>

          {/* Question D */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Question D: Industry Sector
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['AA', 'BB', 'CC', 'DD'] as QuestionOption[]).map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    formData.questionD === opt 
                      ? 'bg-gold/20 border-gold text-gold' 
                      : 'bg-navy/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.questionD === opt}
                    onChange={() => updateField('questionD', opt)}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.questionD === opt ? 'border-gold' : 'border-gray-500'}`}>
                    {formData.questionD === opt && <div className="w-2 h-2 bg-gold rounded-full" />}
                  </div>
                  <span className="font-medium">{opt}</span>
                </label>
              ))}
            </div>
            {errors.questionD && <p className="text-red-500 text-xs mt-1">{errors.questionD}</p>}
          </div>

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
