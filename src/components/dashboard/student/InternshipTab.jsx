import React from 'react';
import InternshipTable from './InternshipTable';
import Card from '../components/common/card.jsx';

const InternshipTab = ({ applications, isLoaded }) => {
  return (
    <div className="space-y-6">
      {!isLoaded ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <Card>
          <div className="mb-4">
            <p className="text-gray-700 mb-4">
              Here you can track the status of the internship applications you submitted to companies.
              This page will be updated with any changes.
            </p>
            <p className="text-gray-700 mb-6">
              You must select one approved internship and send it to the department head for final approval.
            </p>
          </div>
          
          {/* Applications Table */}
          <InternshipTable applications={applications} />
        </Card>
      )}
    </div>
  );
};

export default InternshipTab;