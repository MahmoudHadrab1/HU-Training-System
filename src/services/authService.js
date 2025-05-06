import axios from 'axios';

const API_URL = "https://railway-system-production-1a43.up.railway.app/api/auth/";

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

class AuthService {
  async verifyCompany(nationalId) {
    try {
      const response = await axiosInstance.get(`verify-company/${nationalId}`);
      if (response.data.success) {
        localStorage.setItem('companyNationalId', nationalId);
        localStorage.setItem('currentCompanyId', nationalId); // ← هذه هي الأهم 6/5/25
      }
      return response.data;
    } catch (error) {
      console.error("Company verification error:", error);
      throw error;
    }
  }

  async registerCompany(companyData) {
    try {
      const nationalId = localStorage.getItem('companyNationalId');
      if (!nationalId) throw new Error('Company verification required before registration');

      const registrationPayload = { ...companyData, nationalId };
      console.log("Sending registration data:", registrationPayload);

      const response = await axiosInstance.post('register/company', registrationPayload);

      if (response.data.success) {
        localStorage.removeItem('companyNationalId');
        this.saveCompanyProfile(companyData);
        
        if (response.data.token) {
          this.storeAuthData(response.data);
        }
      }

      return response.data;
    } catch (error) {
      console.error("Company registration error:", error.response?.data || error.message);
      throw error;
    }
  }

  storeAuthData(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", "company");
    
    if (authData.companyProfile) {
      localStorage.setItem("companyProfile", JSON.stringify(authData.companyProfile));
    }
     // ✅ أضف هذا السطر
  if (authData.nationalId) {
    localStorage.setItem('currentCompanyId', authData.nationalId);
  }
  
}
  

  // Update this function in authService.js
saveCompanyProfile(companyData) {
  // Map registration form fields to dashboard field names
  const profileData = {
    companyName: companyData.name || companyData.companyName, // Map 'name' to 'companyName'
    fieldOfWork: companyData.fieldOfWork,
    companyLocation: companyData.location || companyData.companyLocation, // Map 'location' to 'companyLocation'
    phoneNumber: companyData.phone || companyData.phoneNumber, // Map 'phone' to 'phoneNumber'
    email: companyData.email,
    logo: null // Initialize with no logo
  };
  
  // Store the profile data in localStorage
  localStorage.setItem('companyProfile', JSON.stringify(profileData));
}

  async loginCompany(nationalId, password) {
    try {
      const response = await axios.post(`${API_URL}login/company`, { 
        nationalId, 
        password 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Handle different response structures
      const responseData = response.data || response;
      
      if (!responseData) {
        throw new Error("Empty response from server");
      }
  
      // Check for token in various possible locations
      const token = responseData.token || 
                   responseData.data?.token || 
                   responseData.access_token;
  
      if (!token) {
        console.error("Token not found in response:", responseData);
        throw new Error("Authentication token missing in response");
      }
      if (token) {
        this.storeAuthData({
          ...responseData,
          nationalId, // أضفها حتى تصل للـ storeAuthData
        });
      }
      
      return responseData;
    } catch (error) {
      console.error("Login API error:", {
        url: `${API_URL}login/company`,
        error: error,
        response: error.response?.data
      });
      throw error;
    }
  }

  async loginStudent(universityId, password) {
    try {
      const response = await axiosInstance.post('login/student', { universityId, password });

      if (response.data.token) {
        this.storeAuthData({
          ...response.data,
          userRole: 'student'
        });
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async loginDepartmentHead(email, password) {
    try {
      const response = await axiosInstance.post('login/department-head', { email, password });

      if (response.data.token) {
        this.storeAuthData({
          ...response.data,
          userRole: 'department'
        });
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("companyNationalId");
    localStorage.removeItem("companyProfile");
    localStorage.removeItem("currentCompanyId"); // ✅ مهم6/5/25
  }

  getCompanyProfile() {
    const profileData = localStorage.getItem('companyProfile');
    return profileData ? JSON.parse(profileData) : null;
  }

  async updateCompanyProfile(profileData) {
    try {
      const currentProfile = this.getCompanyProfile() || {};
      const updatedProfile = { ...currentProfile, ...profileData };

      const response = await axiosInstance.put('company/profile', updatedProfile);

      if (response.data?.success) {
        localStorage.setItem('companyProfile', JSON.stringify(updatedProfile));
        return updatedProfile;
      }
      throw new Error(response.data?.message || 'Failed to update profile');
    } catch (error) {
      console.error('Error updating company profile:', error);
      throw error;
    }
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return localStorage.getItem('isAuthenticated') === 'true' && 
           localStorage.getItem('token') !== null;
  }

  //getUserType() {
  //  return localStorage.getItem('userRole');
 // }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    };
  }
}

const authService = new AuthService();
export default authService;