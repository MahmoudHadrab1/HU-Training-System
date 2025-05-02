import React from 'react';

const CompanyDashboardPostsTab = ({ 
  trainingPosts, 
  isLoaded, 
  handlePostStatusChange, 
  setIsCreatePostModalOpen 
}) => {
  return (
    <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Your Training Posts</h2>
          <div className="text-sm text-gray-500">
            Total: {trainingPosts.length} posts
          </div>
        </div>

        {/* Training Posts Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainingPosts.length > 0 ? (
                trainingPosts.map((post, index) => (
                  <tr key={post.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${post.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          post.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.applicantsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => alert(`Edit functionality for post "${post.title}" would be implemented here`)}
                      >
                        Edit
                      </button>
                      {post.status === 'Active' ? (
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handlePostStatusChange(post, 'Closed')}
                        >
                          Close
                        </button>
                      ) : post.status === 'Closed' ? (
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handlePostStatusChange(post, 'Pending Approval')}
                        >
                          Reopen
                        </button>
                      ) : (
                        <span className="text-gray-400 cursor-not-allowed">
                          Awaiting Approval
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No training posts found. Create your first training post to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Approval Information */}
      <div className="bg-white shadow rounded-lg overflow-hidden p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About Training Post Approval</h3>
        <p className="text-gray-600 mb-4">
          When you create a new training post, it will be submitted to the department head for review and approval. 
          This process typically takes 1-3 business days.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Approval Status Guide:</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-2">
                Pending Approval
              </span>
              <span className="text-sm text-gray-600">Your post is awaiting department head review</span>
            </li>
            <li className="flex items-center">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-2">
                Active
              </span>
              <span className="text-sm text-gray-600">Your post is approved and visible to students</span>
            </li>
            <li className="flex items-center">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 mr-2">
                Closed
              </span>
              <span className="text-sm text-gray-600">Your post is no longer accepting applications</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Create Post Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Training Post
        </button>
      </div>
    </div>
  );
};

export default CompanyDashboardPostsTab;