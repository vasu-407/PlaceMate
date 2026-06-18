import { useEffect, useState } from 'react';
import { FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { recommendationsAPI } from '../api';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await recommendationsAPI.get();
        setRecommendations(data.recommendations);
      } catch {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Personalized Recommendations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Actionable tips to improve your developer readiness
        </p>
      </div>

      {error && <Alert message={error} />}

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-indigo-500/30 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="rounded-lg bg-indigo-500/20 p-2.5">
              <FiMessageSquare className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{rec}</p>
            </div>
            <FiArrowRight className="mt-1 h-4 w-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
