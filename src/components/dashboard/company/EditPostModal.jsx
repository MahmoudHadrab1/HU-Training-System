import React, { useState } from 'react';
import companyService from '../../../services/companyService';

const EditPostModal = ({ isOpen, post, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    _id: post?._id || '',  // Use _id instead of id for MongoDB compatibility
    title: post?.title || '',
    location: post?.location || 'On-site',  // Default to on-site
    period: post?.period || '8 Weeks',      // Default to 8 weeks
    endDate: post?.endDate || '',
    description: post?.description || '',
    status: post?.status || 'Active',
    applicantsCount: post?.applicantsCount || 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user makes changes
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for the API
      const postData = {
        title: formData.title,
        location: formData.location.toLowerCase(),
        period: formData.period, // ✔️ match what the backend expects
        availableUntil: formData.endDate,
        description: formData.description,
        status: formData.status
      };
      
      
      // Call the API
      const updatedPost = await companyService.editTrainingPost(formData._id, postData);
      console.log('✅ Post updated:', updatedPost);
      
      // Use the response from the backend
      if (updatedPost.data && updatedPost.data.post) {
        onSubmit(updatedPost.data.post);
      } else {
        // Fallback to using form data if backend response structure is unexpected
        onSubmit(formData);
      }
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      setError(error.response?.data?.message || 'Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Edit Training Post</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error message display */}
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Training Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Training Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value="On-site"
              className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
              Training Period*
            </label>
            <select
              id="period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              {/* Limited to 6-8 weeks as requested */}
              <option value="6 Weeks">6 Weeks</option>
              <option value="8 Weeks">8 Weeks</option>
            </select>
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Available Until (End Date)*
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status*
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter details about the training position, requirements, etc."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;