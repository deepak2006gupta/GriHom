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
};