const Input = ({ label, error, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
    )}
    <input
      className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default Input;
