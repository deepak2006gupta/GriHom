export const calculateValorScore = (propertyData, improvements = []) => {
  let baseScore = 50; // Starting score
  
  // Factor in property age
  const age = new Date().getFullYear() - propertyData.yearBuilt;
  if (age < 5) baseScore += 10;
  else if (age < 15) baseScore += 5;
  else if (age > 30) baseScore -= 10;

  // Factor in location (simplified)
  const premiumLocations = ['South Bangalore', 'South Mumbai', 'Central Delhi'];
  if (premiumLocations.includes(propertyData.location)) {
    baseScore += 15;
  }

  // Factor in implemented improvements
  improvements.forEach(imp => {
    baseScore += imp.impact;
  });

  return Math.min(Math.max(baseScore, 0), 100);
};

export const generateRecommendations = (propertyData, allImprovements) => {
  let recommendations = [...allImprovements];
  
  // Filter by budget constraint
  if (propertyData.budget === 'Low') {
    recommendations = recommendations.filter(imp => imp.cost === 'Low');
  } else if (propertyData.budget === 'Medium') {
    recommendations = recommendations.filter(imp => imp.cost !== 'High');
  }

  // Prioritize by ROI
  const roiPriority = { High: 3, Medium: 2, Low: 1 };
  recommendations.sort((a, b) => {
    const roiDiff = roiPriority[b.roi] - roiPriority[a.roi];
    if (roiDiff !== 0) return roiDiff;
    return b.impact - a.impact;
  });

  return recommendations.slice(0, 5); // Top 5 recommendations
};