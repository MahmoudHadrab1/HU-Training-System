// src/services/companyService.js
import axios from 'axios';
import authService from './authService';

// Base URL from authService
const API_URL = "https://railway-system-production-1a43.up.railway.app/api";

class CompanyService {
    //Create a new training post
    async createTrainingPost(postData) {
        try {
          const headers = authService.getAuthHeader();
          if (!headers) {
            throw new Error('No authentication token found. Please log in again.');
          }
          
          console.log("🔐 Headers used for post:", headers);
          const response = await axios.post(
            `${API_URL}/training-posts`,
            postData,
            headers
          );
          return response.data;
        } catch (error) {
          console.error('Error creating training post:', error.response || error);
          throw error;
        }
      }
      
      //Edit an existing training post
      async editTrainingPost(postId, postData) {
        try {
          const response = await axios.put(
            `${API_URL}/training-posts/${postId}`,
            postData,
            authService.getAuthHeader()
          );
          return response.data;
        } catch (error) {
          console.error('Error editing training post:', error);
          throw error;
        }
      }
 }

const companyService = new CompanyService();
export default companyService;