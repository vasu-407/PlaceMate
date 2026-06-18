import { useEffect, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { githubAPI } from '../api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import ScoreCard from '../components/ui/ScoreCard';

const GitHub = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: res } = await githubAPI.get();
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
      const { data: res } = await githubAPI.analyze(url);
      setData(res);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze GitHub profile');
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">GitHub Analysis</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Analyze your GitHub repositories and activity
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <Input
            label="GitHub Profile URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/username"
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
          <ScoreCard title="GitHub Score" score={data.githubScore} icon={FiGithub} subtitle={`@${data.username}`} />

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Repositories', value: data.repoCount },
              { label: 'Stars', value: data.stars },
              { label: 'Forks', value: data.forks },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-indigo-400">{value}</p>
              </div>
            ))}
          </div>

          {data.languages?.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-2 text-sm font-medium text-slate-500">Languages Used</p>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHub;
