const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-amber-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

const getScoreBg = (score) => {
  if (score >= 80) return 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30';
  if (score >= 60) return 'from-amber-500/20 to-amber-600/5 border-amber-500/30';
  if (score >= 40) return 'from-orange-500/20 to-orange-600/5 border-orange-500/30';
  return 'from-red-500/20 to-red-600/5 border-red-500/30';
};

const getLevelColor = (level) => {
  switch (level) {
    case 'Industry Ready':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Placement Ready':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Improving':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
};

export { getScoreColor, getScoreBg, getLevelColor };
