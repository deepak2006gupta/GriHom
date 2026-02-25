export const saveUserReport = (reportData) => {
  const existingReports = JSON.parse(localStorage.getItem('GriHom_reports') || '[]');
  const newReport = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...reportData
  };
  existingReports.unshift(newReport);
  localStorage.setItem('GriHom_reports', JSON.stringify(existingReports));
  return newReport;
};

export const getUserReports = () => {
  return JSON.parse(localStorage.getItem('GriHom_reports') || '[]');
};

export const deleteUserReport = (reportId) => {
  const existingReports = getUserReports();
  const updatedReports = existingReports.filter(report => report.id !== reportId);
  localStorage.setItem('GriHom_reports', JSON.stringify(updatedReports));
  return updatedReports;
};

export const saveUserPreferences = (preferences) => {
  localStorage.setItem('GriHom_preferences', JSON.stringify(preferences));
};

export const getUserPreferences = () => {
  return JSON.parse(localStorage.getItem('GriHom_preferences') || '{}');
<<<<<<< HEAD
};

const THEME_KEY = 'GriHom_theme';

export const saveThemePreference = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemePreference = () => {
  return localStorage.getItem(THEME_KEY);
};

const ADMIN_IMPROVEMENT_HISTORY_KEY = 'GriHom_admin_improvement_history';
const ADMIN_IMPROVEMENTS_KEY = 'GriHom_admin_improvements';

export const getAdminImprovements = () => {
  return JSON.parse(localStorage.getItem(ADMIN_IMPROVEMENTS_KEY) || '[]');
};

export const saveAdminImprovement = (improvement) => {
  const existingImprovements = getAdminImprovements();
  const newImprovement = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...improvement
  };

  existingImprovements.unshift(newImprovement);
  localStorage.setItem(ADMIN_IMPROVEMENTS_KEY, JSON.stringify(existingImprovements));
  return newImprovement;
};

export const updateAdminImprovement = (improvementId, updates) => {
  const existingImprovements = getAdminImprovements();
  let updatedImprovement = null;

  const updatedImprovements = existingImprovements.map((improvement) => {
    if (improvement.id !== improvementId) return improvement;

    updatedImprovement = {
      ...improvement,
      ...updates,
      id: improvement.id,
      updatedAt: new Date().toISOString()
    };

    return updatedImprovement;
  });

  localStorage.setItem(ADMIN_IMPROVEMENTS_KEY, JSON.stringify(updatedImprovements));
  return updatedImprovement;
};

export const deleteAdminImprovement = (improvementId) => {
  const existingImprovements = getAdminImprovements();
  const improvementToDelete = existingImprovements.find((improvement) => improvement.id === improvementId);
  if (!improvementToDelete) return null;

  const updatedImprovements = existingImprovements.filter((improvement) => improvement.id !== improvementId);
  localStorage.setItem(ADMIN_IMPROVEMENTS_KEY, JSON.stringify(updatedImprovements));
  return improvementToDelete;
};

export const getAdminImprovementHistory = () => {
  return JSON.parse(localStorage.getItem(ADMIN_IMPROVEMENT_HISTORY_KEY) || '[]');
};

export const saveAdminImprovementHistoryEntry = (entry) => {
  const existingHistory = getAdminImprovementHistory();
  const historyEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...entry
  };

  existingHistory.unshift(historyEntry);
  localStorage.setItem(ADMIN_IMPROVEMENT_HISTORY_KEY, JSON.stringify(existingHistory));
  return historyEntry;
=======
>>>>>>> ae3a9aabfce30e6e1e749b07f7d8ff6760fc59c2
};