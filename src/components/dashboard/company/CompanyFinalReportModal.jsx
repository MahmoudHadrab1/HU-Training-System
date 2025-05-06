import React, { useState } from 'react';
import { Check, Send, Download, X } from 'lucide-react';

const CompanyFinalReportModal = ({ isOpen, onClose, onSubmit, student, trainingTitle }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const templateUrl = '/templates/company_evaluation_form.pdf';

  const handleDownloadTemplate = () => {
    window.open(templateUrl, '_blank');
  };

  const handleSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
      onSubmit({
        studentName: student,
        trainingTitle,
        reportFile: 'company_evaluation_form.pdf',
        submissionDate: new Date().toISOString().split('T')[0]
      });
      setIsUploading(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl mx-auto p-6 w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Submit Final Training Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4 bg-gray-50 p-4 rounded-md">
          <p className="text-gray-600">Student: <span className="font-medium text-gray-800">{student}</span></p>
          <p className="text-gray-600">Training: <span className="font-medium text-gray-800">{trainingTitle}</span></p>
          <p className="text-gray-600">Report Date: <span className="font-medium text-gray-800">{new Date().toISOString().split('T')[0]}</span></p>
        </div>

        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center my-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-800 mb-2">Report Submitted Successfully!</h3>
            <p className="text-green-700">
              Thank you for submitting the student evaluation report. The report has been sent to the system.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                قم بتحميل نموذج التقييم أدناه، ثم املأه وقم بالتوقيع ووضع ختم الشركة حيثما هو مطلوب، ثم أعد رفعه إلى النظام
              </p>
              <p className="mt-2 text-blue-700">
                Please download the evaluation form below, fill it out, sign it, and stamp it where required, then upload it back to the system
              </p>
            </div>

            <div className="mb-6 text-center">
              <button 
                onClick={handleDownloadTemplate} 
                className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 mx-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Evaluation Form Template
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                <div className="bg-gray-200 p-2 flex justify-between items-center">
                  <span className="text-sm text-gray-700">PDF Preview</span>
                  <button 
                    onClick={handleDownloadTemplate} 
                    className="p-1 rounded-full hover:bg-gray-300"
                    title="Download Template"
                  >
                    <Download className="w-5 h-5"/>
                  </button>
                </div>
                <div className="p-4 h-[400px]">
                  <object 
                    data="/templates/company_evaluation_form.pdf#toolbar=0" 
                    type="application/pdf" 
                    width="100%" 
                    height="100%" 
                    className="w-full h-full"
                  >
                    <p>Your browser does not support viewing PDFs. <a href={templateUrl} download>Download the PDF</a> instead.</p>
                  </object>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyFinalReportModal;
