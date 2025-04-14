import React from "react";
import { Download } from "lucide-react";

const ReportUploader = ({
  file,
  isUploading,
  onFileUpload,
  onSubmitReport,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p>
          Congratulations on completing your internship! Please provide the
          department head with information about your training, your experience,
          and what you learned during this period.
        </p>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          className="hidden"
          id="report-upload"
          onChange={onFileUpload}
        />
        <label
          htmlFor="report-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Download className="w-12 h-12 text-gray-400 mb-4" />
          <p>
            {file
              ? `Selected File: ${file.name}`
              : "Drag & Drop or Click to Upload Report"}
          </p>
        </label>
      </div>
      <button
        onClick={onSubmitReport}
        disabled={!file || isUploading}
        className="w-full bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-600 disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload Report"}
      </button>
    </div>
  );
};

export default ReportUploader;
