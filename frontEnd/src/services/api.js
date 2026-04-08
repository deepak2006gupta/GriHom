import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔥 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

class ApiService {
  
  async login(email, password) {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data;
    } catch(err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  async register(name, email, password) {
    try {
      const response = await API.post('/auth/register', { name, email, password });
      return response.data;
    } catch(err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  async getImprovements(filters = {}) {
    // Basic fetch without filters implemented on backend, 
    // filter on client side just like before if needed.
    const response = await API.get('/improvements');
    let allImprovements = response.data;
    
    // Filter
    return allImprovements.filter((item) => {
      const roomMatch = !filters.room || item.room === filters.room;
      const costMatch = !filters.cost || item.cost === filters.cost;
      const effortMatch = !filters.effort || item.effort === filters.effort;
      return roomMatch && costMatch && effortMatch;
    });
  }

  async createReport(reportData) {
    // stringify the custom properties that go into JSON text fields
    const payload = {
        title: reportData.title || `GriHom Report - ${new Date().toLocaleDateString()}`,
        propertyData: JSON.stringify(reportData.propertyData),
        valorScore: reportData.valorScore,
        recommendations: JSON.stringify(reportData.recommendations)
    };
    
    const response = await API.post('/reports', payload);
    return response.data;
  }

  async getReports() {
    const response = await API.get('/reports');
    return response.data.map(report => ({
        ...report,
        timestamp: report.timestamp,
        propertyData: JSON.parse(report.propertyData),
        recommendations: JSON.parse(report.recommendations)
    }));
  }
  
  async deleteReport(id) {
    await API.delete(`/reports/${id}`);
  }

  async getAdminStats() {
    const response = await API.get('/admin/stats');
    return response.data;
  }

  async getAdminUsers() {
    const response = await API.get('/admin/users');
    return response.data;
  }

  async updateUserRole(userId, isAdmin) {
    const response = await API.put(`/admin/users/${userId}/role`, { isAdmin });
    return response.data;
  }

  async updateUserStatus(userId, isActive) {
    const response = await API.put(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  }

  async deleteUser(userId) {
    const response = await API.delete(`/admin/users/${userId}`);
    return response.data;
  }
}

const apiService = new ApiService();
export default apiService;