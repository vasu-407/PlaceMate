const Alert = ({ type = 'error', message }) => {
  if (!message) return null;

  const styles = {
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>{message}</div>
  );
};

export default Alert;
