const API_URL = "http://localhost:8080/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

class ApiService {

  async request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers
      }
    });
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }
    
    if (!response.ok) {
      throw new Error(data?.message || data?.error || `HTTP error! status: ${response.status}`);
    }
    return data;
  }
  
  async login(email, password, captchaToken) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, captchaToken })
    });
  }

  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }

  async getImprovements(filters = {}) {
    // Basic fetch without filters implemented on backend, 
    // filter on client side just like before if needed.
    let allImprovements = await this.request('/improvements');
    
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
    
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getReports() {
    const data = await this.request('/reports');
    return data.map(report => ({
        ...report,
        timestamp: report.timestamp,
        propertyData: JSON.parse(report.propertyData),
        recommendations: JSON.parse(report.recommendations)
    }));
  }
  
  async deleteReport(id) {
    return this.request(`/reports/${id}`, { method: 'DELETE' });
  }

  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getAdminUsers() {
    return this.request('/admin/users');
  }

  async updateUserRole(userId, isAdmin) {
    return this.request(`/admin/users/${userId}/role`, { 
      method: 'PUT',
      body: JSON.stringify({ isAdmin })
    });
  }

  async updateUserStatus(userId, isActive) {
    return this.request(`/admin/users/${userId}/status`, { 
      method: 'PUT',
      body: JSON.stringify({ isActive })
    });
  }

  async deleteUser(userId) {
    return this.request(`/admin/users/${userId}`, { method: 'DELETE' });
  }
}

const apiService = new ApiService();
export default apiService;