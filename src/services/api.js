import { improvementData } from '../data/improvementData';
import { getAdminImprovements } from '../utils/storage';

const USERS_KEY = 'GriHom_users';
const REPORTS_KEY = 'GriHom_reports';
const TOKEN_KEY = 'token';

const defaultUsers = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@homevalue.com',
    password: 'admin',
    isAdmin: true,
    isActive: true
  }
];

class ApiService {
  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY);
  }

  delay(ms = 150) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return [...defaultUsers];
    }
    try {
      const users = JSON.parse(raw);
      return users.map((user) => ({
        ...user,
        isActive: user.isActive !== false
      }));
    } catch {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return [...defaultUsers];
    }
  }

  setUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  getReportsStore() {
    const raw = localStorage.getItem(REPORTS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  setReportsStore(reports) {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  }

  createToken(user) {
    return `local-token-${user.id}`;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  async login(email, password) {
    await this.delay();

    const users = this.getUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('Account not found. Please register first.');
    }

    if (user.isActive === false) {
      throw new Error('Your account is inactive. Please contact an administrator.');
    }

    if (user.isAdmin) {
      const token = this.createToken(user);
      this.setToken(token);
      return {
        token,
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: true
      };
    }

    if (user.password !== password) {
      throw new Error('Invalid password.');
    }

    const token = this.createToken(user);
    this.setToken(token);

    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: false
    };
  }

  async register(name, email, password) {
    await this.delay();

    const users = this.getUsers();
    const exists = users.some((item) => item.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('Email already exists. Please login.');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      isAdmin: false,
      isActive: true
    };

    const updatedUsers = [...users, newUser];
    this.setUsers(updatedUsers);

    const token = this.createToken(newUser);
    this.setToken(token);

    return {
      token,
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: false
    };
  }

  async getImprovements(filters = {}) {
    await this.delay(80);

    const adminSuggestions = getAdminImprovements().map((item) => {
      const fallbackBudgetRange =
        item.cost === 'High'
          ? '₹2,00,000+'
          : item.cost === 'Medium'
            ? '₹50,000 - ₹2,00,000'
            : '₹10,000 - ₹50,000';

      return {
        ...item,
        tags: item.tags || ['admin-suggestion'],
        budgetRange: item.budgetRange || fallbackBudgetRange,
        duration: item.duration || 'Custom timeline',
        indianSpecific: item.indianSpecific ?? true
      };
    });

    const mergedImprovements = [...adminSuggestions, ...improvementData];

    return mergedImprovements.filter((item) => {
      const roomMatch = !filters.room || item.room === filters.room;
      const costMatch = !filters.cost || item.cost === filters.cost;
      const effortMatch = !filters.effort || item.effort === filters.effort;
      return roomMatch && costMatch && effortMatch;
    });
  }

  async createReport(reportData) {
    await this.delay(100);
    const reports = this.getReportsStore();
    const report = {
      ...reportData,
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.setReportsStore([report, ...reports]);
    return report;
  }

  async getReports() {
    await this.delay(80);
    return this.getReportsStore();
  }

  async getAdminStats() {
    await this.delay(80);
    const users = this.getUsers();
    const reports = this.getReportsStore();

    return {
      totalUsers: users.length,
      totalReports: reports.length,
      totalImprovements: improvementData.length
    };
  }

  async getAdminUsers() {
    await this.delay(80);
    return this.getUsers().map(({ password, ...user }) => user);
  }

  async updateUserRole(userId, isAdmin) {
    await this.delay(80);

    const users = this.getUsers();
    const updatedUsers = users.map((user) => {
      if (user.id !== userId) return user;
      return {
        ...user,
        isAdmin
      };
    });

    this.setUsers(updatedUsers);

    const updatedUser = updatedUsers.find((user) => user.id === userId);
    if (!updatedUser) {
      throw new Error('User not found.');
    }

    const { password, ...safeUser } = updatedUser;
    return safeUser;
  }

  async updateUserStatus(userId, isActive) {
    await this.delay(80);

    const users = this.getUsers();
    const updatedUsers = users.map((user) => {
      if (user.id !== userId) return user;
      return {
        ...user,
        isActive
      };
    });

    this.setUsers(updatedUsers);

    const updatedUser = updatedUsers.find((user) => user.id === userId);
    if (!updatedUser) {
      throw new Error('User not found.');
    }

    const { password, ...safeUser } = updatedUser;
    return safeUser;
  }

  async deleteUser(userId) {
    await this.delay(80);

    const users = this.getUsers();
    const userExists = users.some((user) => user.id === userId);
    if (!userExists) {
      throw new Error('User not found.');
    }

    const updatedUsers = users.filter((user) => user.id !== userId);
    this.setUsers(updatedUsers);

    return this.getAdminUsers();
  }
}

const apiService = new ApiService();

export default apiService;