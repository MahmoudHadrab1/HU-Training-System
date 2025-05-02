import React, { useState } from 'react';
import TrainingCard from './TrainingCard';
import TrainingModal from './TrainingModal';
import { Search } from 'lucide-react';
import { studentService } from '../../../services/studentService';

const TrainingPostsTab = ({ posts, isLoaded }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Filter posts based on search query and active filter
  const filteredPosts = posts.filter(post => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.fieldOfWork.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesFilter = 
      activeFilter === 'All' || 
      post.location === activeFilter ||
      post.fieldOfWork === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Handle opening training details modal
  const handleViewInfo = (training) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
    setApplicationSubmitted(false);
  };
  
  // Handle application submission from modal
  const handleSubmitApplication = async (cv) => {
    try {
      // Submit application to backend
      await studentService.submitApplication(selectedTraining.id, cv);
      setApplicationSubmitted(true);
      
      // Auto close after a delay
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', 'Remote', 'On-site', 'Hybrid'].map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === filter 
                ? 'bg-red-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Training Posts Grid */}
      {!isLoaded ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <TrainingCard 
              key={post.id}
              post={post}
              onDetailsClick={() => handleViewInfo(post)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No training posts match your search criteria. Try adjusting your filters.</p>
        </div>
      )}
      
      {/* Training Modal */}
      {isModalOpen && selectedTraining && (
        <TrainingModal 
          training={selectedTraining}
          onClose={() => setIsModalOpen(false)}
          onApply={handleSubmitApplication}
          applicationSubmitted={applicationSubmitted}
        />
      )}
    </div>
  );
};

export default TrainingPostsTab;