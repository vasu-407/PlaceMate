import { useEffect, useState } from 'react';
import { profileAPI } from '../api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';

const Profile = () => {
  const [form, setForm] = useState({
    name: '',
    college: '',
    branch: '',
    cgpa: '',
    graduationYear: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await profileAPI.get();
        setForm({
          name: data.name || '',
          college: data.college || '',
          branch: data.branch || '',
          cgpa: data.cgpa ?? '',
          graduationYear: data.graduationYear ?? '',
        });
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await profileAPI.update({
        ...form,
        cgpa: form.cgpa ? parseFloat(form.cgpa) : 0,
        graduationYear: form.graduationYear ? parseInt(form.graduationYear, 10) : undefined,
      });
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
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
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal and academic information
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {message && <Alert type="success" message={message} />}
        {error && <Alert message={error} />}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="College" name="college" value={form.college} onChange={handleChange} />
          <Input label="Branch" name="branch" value={form.branch} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CGPA" name="cgpa" type="number" step="0.01" min="0" max="10" value={form.cgpa} onChange={handleChange} />
            <Input label="Graduation Year" name="graduationYear" type="number" value={form.graduationYear} onChange={handleChange} />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
