import React, { useState } from 'react';
import { Phone, Building2, User, FileText, Target } from 'lucide-react';
import { CallDetails } from '../types';

interface CallFormProps {
  onSubmit: (details: CallDetails) => void;
  isLoading: boolean;
}

const CallForm: React.FC<CallFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CallDetails>({
    phoneNumber: '',
    shopName: '',
    customerName: '',
    notes: '',
    callObjective: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CallDetails, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof CallDetails]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CallDetails, string>> = {};
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.shopName) {
      newErrors.shopName = 'Shop name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Call Setup</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Phone size={16} className="mr-2" />
            Phone Number*
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ${
              errors.phoneNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Building2 size={16} className="mr-2" />
            Shop/Business Name*
          </label>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ${
              errors.shopName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            }`}
            placeholder="Acme Coffee Shop"
          />
          {errors.shopName && (
            <p className="mt-1 text-sm text-red-500">{errors.shopName}</p>
          )}
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <User size={16} className="mr-2" />
            Customer Name (if known)
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Target size={16} className="mr-2" />
            Call Objective
          </label>
          <input
            type="text"
            name="callObjective"
            value={formData.callObjective}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
            placeholder="Schedule a product demo"
          />
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FileText size={16} className="mr-2" />
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
            placeholder="Any specific information the AI should know..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Phone size={16} />
              <span>Start Call</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CallForm;