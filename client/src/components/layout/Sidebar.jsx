import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiCode,
  FiGithub,
  FiFileText,
  FiLayers,
  FiFolder,
  FiMessageSquare,
  FiLogOut,
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/profile', label: 'Profile', icon: FiUser },
  { to: '/leetcode', label: 'LeetCode', icon: SiLeetcode },
  { to: '/github', label: 'GitHub', icon: FiGithub },
  { to: '/resume', label: 'Resume', icon: FiFileText },
  { to: '/skills', label: 'Skills', icon: FiLayers },
  { to: '/projects', label: 'Projects', icon: FiFolder },
  { to: '/recommendations', label: 'Recommendations', icon: FiMessageSquare },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">DRA</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Developer Readiness Analyzer
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
        >
          <FiLogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
