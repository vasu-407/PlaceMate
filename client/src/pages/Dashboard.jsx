import { useEffect, useState } from 'react';
import {
  FiTrendingUp,
  FiCode,
  FiGithub,
  FiFileText,
  FiLayers,
  FiFolder,
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import {
  readinessAPI,
  leetcodeAPI,
  githubAPI,
  resumeAPI,
  skillsAPI,
} from '../api';
import ScoreCard from '../components/ui/ScoreCard';
import Spinner from '../components/ui/Spinner';
import {
  LeetCodePieChart,
  ReadinessBarChart,
  SkillsPieChart,
  ReadinessTrendChart,
} from '../components/charts/DashboardCharts';
import { getLevelColor } from '../utils/scoreHelpers';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [readiness, setReadiness] = useState(null);
  const [leetcode, setLeetcode] = useState(null);
  const [github, setGithub] = useState(null);
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [readinessRes, leetcodeRes, githubRes, resumeRes, skillsRes] =
          await Promise.all([
            readinessAPI.get(),
            leetcodeAPI.get(),
            githubAPI.get(),
            resumeAPI.get(),
            skillsAPI.getAll(),
          ]);

        setReadiness(readinessRes.data);
        setLeetcode(leetcodeRes.data);
        setGithub(githubRes.data);
        setResume(resumeRes.data);
        setSkills(skillsRes.data);
      } catch {
        /* handled by interceptor */
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your developer readiness overview
          </p>
        </div>
        {readiness?.level && (
          <span
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${getLevelColor(readiness.level)}`}
          >
            {readiness.level}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <ScoreCard
          title="Readiness Score"
          score={readiness?.readinessScore}
          icon={FiTrendingUp}
          subtitle={readiness?.level}
        />
        <ScoreCard
          title="LeetCode Score"
          score={readiness?.breakdown?.leetcode}
          icon={SiLeetcode}
        />
        <ScoreCard
          title="GitHub Score"
          score={readiness?.breakdown?.github}
          icon={FiGithub}
        />
        <ScoreCard
          title="Resume Score"
          score={readiness?.breakdown?.resume}
          icon={FiFileText}
        />
        <ScoreCard
          title="Skills Score"
          score={readiness?.skillsScore}
          icon={FiLayers}
        />
        <ScoreCard
          title="Project Score"
          score={readiness?.projectScore}
          icon={FiFolder}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LeetCodePieChart data={leetcode} />
        <ReadinessBarChart breakdown={readiness?.breakdown} />
        <SkillsPieChart skills={skills} />
        <ReadinessTrendChart trend={readiness?.trend} />
      </div>

      {readiness?.readinessScore === 0 && (
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-6 text-center">
          <FiCode className="mx-auto mb-3 h-8 w-8 text-indigo-400" />
          <h3 className="font-semibold text-indigo-300">Get Started</h3>
          <p className="mt-1 text-sm text-slate-400">
            Add your LeetCode, GitHub, resume, skills, and projects to generate your readiness score.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
