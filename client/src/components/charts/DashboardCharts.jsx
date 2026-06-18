import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6', '#ec4899'];

const ChartCard = ({ title, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
    <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
    {children}
  </div>
);

export const LeetCodePieChart = ({ data }) => {
  const chartData = [
    { name: 'Easy', value: data?.easySolved || 0 },
    { name: 'Medium', value: data?.mediumSolved || 0 },
    { name: 'Hard', value: data?.hardSolved || 0 },
  ].filter((d) => d.value > 0);

  if (chartData.length === 0) {
    return (
      <ChartCard title="LeetCode Distribution">
        <p className="py-8 text-center text-sm text-slate-500">No LeetCode data yet</p>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="LeetCode Distribution">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const ReadinessBarChart = ({ breakdown }) => {
  const chartData = [
    { name: 'LeetCode', score: breakdown?.leetcode || 0 },
    { name: 'GitHub', score: breakdown?.github || 0 },
    { name: 'Projects', score: breakdown?.projects || 0 },
    { name: 'Skills', score: breakdown?.skills || 0 },
    { name: 'Resume', score: breakdown?.resume || 0 },
    { name: 'CGPA', score: breakdown?.cgpa || 0 },
  ];

  return (
    <ChartCard title="Readiness Breakdown">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const SkillsPieChart = ({ skills }) => {
  const categoryCount = {};
  skills?.forEach((skill) => {
    categoryCount[skill.category] = (categoryCount[skill.category] || 0) + 1;
  });

  const chartData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));

  if (chartData.length === 0) {
    return (
      <ChartCard title="Skills Distribution">
        <p className="py-8 text-center text-sm text-slate-500">No skills added yet</p>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Skills Distribution">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const ReadinessTrendChart = ({ trend }) => {
  const chartData = trend?.map((item, index) => ({
    name: `Check ${index + 1}`,
    score: item.readinessScore,
    date: new Date(item.createdAt).toLocaleDateString(),
  })) || [];

  if (chartData.length === 0) {
    return (
      <ChartCard title="Readiness Trend">
        <p className="py-8 text-center text-sm text-slate-500">
          Visit dashboard to start tracking your trend
        </p>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Readiness Trend">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
