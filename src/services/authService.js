// src/services/AuthService.js
import axios from 'axios';

// Base URL of your backend API
const API_URL = "https://hutrain-1.onrender.com/api/auth/";

class AuthService {
  // Company login
  async loginCompany(nationalId, password) {
    try {
      const response = await axios.post(API_URL + "login/company", {
        nationalId,
        password
      });
      
      if (response.data.token) {
        // Store user data and authentication status in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'company');
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Student login
  async loginStudent(studentId, password) {
    try {
      const response = await axios.post(API_URL + "login/student", {
        studentId,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'student');
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Department head login
  async loginDepartmentHead(departmentId, password) {
    try {
      const response = await axios.post(API_URL + "login/department", {
        departmentId,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'department');
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
  }

  // Get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Get user type (company, student, department)
  getUserType() {
    return localStorage.getItem('userType');
  }

  // Get auth header
  getAuthHeader() {
    const user = this.getCurrentUser();
    
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }
}

const authService = new AuthService();
export default authService;