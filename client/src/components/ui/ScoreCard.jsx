const ScoreCard = ({ title, score, icon: Icon, subtitle }) => {
  const getBg = (s) => {
    if (s >= 80) return 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30';
    if (s >= 60) return 'from-amber-500/20 to-amber-600/5 border-amber-500/30';
    if (s >= 40) return 'from-orange-500/20 to-orange-600/5 border-orange-500/30';
    return 'from-red-500/20 to-red-600/5 border-red-500/30';
  };

  const getColor = (s) => {
    if (s >= 80) return 'text-emerald-500';
    if (s >= 60) return 'text-amber-500';
    if (s >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div
      className={`rounded-xl border bg-gradient-to-br p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${getBg(score || 0)}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${getColor(score || 0)}`}>{score ?? 0}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-white/10 p-2.5">
            <Icon className={`h-5 w-5 ${getColor(score || 0)}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
