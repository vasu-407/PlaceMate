import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    college: '',
    branch: '',
    cgpa: '',
    graduationYear: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        ...form,
        cgpa: form.cgpa ? parseFloat(form.cgpa) : 0,
        graduationYear: form.graduationYear ? parseInt(form.graduationYear, 10) : undefined,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-400">DRA</h1>
          <p className="mt-2 text-slate-400">Create your developer profile</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h2 className="mb-6 text-xl font-semibold text-white">Register</h2>

          {error && <Alert message={error} className="mb-4" />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="College" name="college" value={form.college} onChange={handleChange} />
              <Input label="Branch" name="branch" value={form.branch} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="CGPA" name="cgpa" type="number" step="0.01" min="0" max="10" value={form.cgpa} onChange={handleChange} />
              <Input label="Graduation Year" name="graduationYear" type="number" value={form.graduationYear} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
