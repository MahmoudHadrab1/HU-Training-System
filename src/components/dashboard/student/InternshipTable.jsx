import React from "react";

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const InternshipTable = ({ applications }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Company Name</th>
            <th className="text-left p-3">Training Title</th>
            <th className="text-left p-3">Date Applied</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{app.companyName}</td>
              <td className="p-3">{app.trainingTitle}</td>
              <td className="p-3">{app.dateApplied}</td>
              <td className="p-3">
                <span
                  className={`${getStatusBadgeColor(
                    app.status
                  )} rounded-full px-3 py-1 text-sm font-medium`}
                >
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternshipTable;
