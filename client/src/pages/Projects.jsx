import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { projectsAPI } from '../api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';

const difficulties = ['Basic', 'Intermediate', 'Advanced'];

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  githubLink: '',
  liveLink: '',
  difficulty: 'Basic',
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const { data } = await projectsAPI.getAll();
      setProjects(data);
    } catch {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editId) {
        await projectsAPI.update(editId, payload);
      } else {
        await projectsAPI.create(payload);
      }
      setForm(emptyForm);
      setEditId(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setForm({
      title: project.title,
      description: project.description || '',
      techStack: project.techStack?.join(', ') || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      difficulty: project.difficulty || 'Basic',
    });
  };

  const handleDelete = async (id) => {
    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch {
      setError('Failed to delete project');
    }
  };

  const difficultyColor = (d) => {
    if (d === 'Advanced') return 'bg-red-500/20 text-red-400';
    if (d === 'Intermediate') return 'bg-amber-500/20 text-amber-400';
    return 'bg-emerald-500/20 text-emerald-400';
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Projects Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showcase your development projects
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
          <Input
            label="Tech Stack (comma separated)"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            placeholder="React, Node.js, MongoDB"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="GitHub Link"
              value={form.githubLink}
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            />
            <Input
              label="Live Link"
              value={form.liveLink}
              onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Difficulty
            </label>
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {error && <Alert message={error} />}
          <div className="flex gap-2">
            <Button type="submit">{editId ? 'Update Project' : 'Add Project'}</Button>
            {editId && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            No projects added yet
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      {project.title}
                    </h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${difficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  {project.description && (
                    <p className="mt-1 text-sm text-slate-500">{project.description}</p>
                  )}
                  {project.techStack?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                      >
                        GitHub <FiExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                      >
                        Live Demo <FiExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
