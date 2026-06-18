import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
    <Sidebar />
    <div className="ml-64">
      <Navbar />
      <main className="p-6 animate-fade-in">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
