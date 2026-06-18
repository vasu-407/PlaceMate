import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { skillsAPI } from '../api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';

const categories = ['Language', 'Framework', 'Database', 'Tool', 'Other'];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'Language' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSkills = async () => {
    try {
      const { data } = await skillsAPI.getAll();
      setSkills(data);
    } catch {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editId) {
        await skillsAPI.update(editId, form);
      } else {
        await skillsAPI.create(form);
      }
      setForm({ name: '', category: 'Language' });
      setEditId(null);
      fetchSkills();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);
    setForm({ name: skill.name, category: skill.category });
  };

  const handleDelete = async (id) => {
    try {
      await skillsAPI.delete(id);
      fetchSkills();
    } catch {
      setError('Failed to delete skill');
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Skills Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add and manage your technical skills
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Skill Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. React, Node.js"
              required
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <Alert message={error} />}
          <div className="flex gap-2">
            <Button type="submit">{editId ? 'Update Skill' : 'Add Skill'}</Button>
            {editId && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ name: '', category: 'Language' });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {skills.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">No skills added yet</p>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {skills.map((skill) => (
              <div key={skill._id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{skill.name}</p>
                  <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
                    {skill.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
