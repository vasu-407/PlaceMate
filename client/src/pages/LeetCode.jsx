import { useEffect, useState } from 'react';
import { leetcodeAPI } from '../api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import ScoreCard from '../components/ui/ScoreCard';
import { SiLeetcode } from 'react-icons/si';

const LeetCode = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: res } = await leetcodeAPI.get();
        setData(res);
        if (res?.url) setUrl(res.url);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setError('');
    try {
      const { data: res } = await leetcodeAPI.analyze(url);
      setData(res);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze LeetCode profile');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">LeetCode Analysis</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Analyze your LeetCode problem-solving progress
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <Input
            label="LeetCode Profile URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://leetcode.com/u/username/"
            required
          />
          {error && <Alert message={error} />}
          <Button type="submit" disabled={analyzing}>
            {analyzing ? 'Analyzing...' : 'Analyze Profile'}
          </Button>
        </form>
      </div>

      {data && (
        <div className="space-y-4">
          <ScoreCard title="LeetCode Score" score={data.leetcodeScore} icon={SiLeetcode} subtitle={`@${data.username}`} />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Easy', value: data.easySolved, color: 'text-emerald-500' },
              { label: 'Medium', value: data.mediumSolved, color: 'text-amber-500' },
              { label: 'Hard', value: data.hardSolved, color: 'text-red-500' },
              { label: 'Total', value: data.totalSolved, color: 'text-indigo-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">LeetCode Points</p>
            <p className="text-lg font-semibold text-indigo-400">{data.leetcodePoints} pts</p>
            <p className="mt-1 text-xs text-slate-500">
              Easy × 1 + Medium × 3 + Hard × 5, normalized to 100
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeetCode;
