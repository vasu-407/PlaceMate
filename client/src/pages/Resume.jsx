import { useEffect, useState } from 'react';
import { FiUpload, FiFileText, FiCheck, FiX } from 'react-icons/fi';
import { resumeAPI } from '../api';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import ScoreCard from '../components/ui/ScoreCard';

const sectionLabels = {
  contact: 'Contact Information',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  github: 'GitHub Link',
  linkedin: 'LinkedIn Link',
  certifications: 'Certifications',
};

const Resume = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: res } = await resumeAPI.get();
        setData(res);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    try {
      const { data: res } = await resumeAPI.upload(file);
      setData(res);
      setSuccess('Resume uploaded and analyzed successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Resume Analysis</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload your resume PDF for automated quality analysis
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 dark:border-slate-700">
          <FiUpload className="mb-3 h-10 w-10 text-indigo-400" />
          <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            Upload Resume (PDF)
          </p>
          <p className="mb-4 text-xs text-slate-500">Max file size: 5MB</p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
            <span className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700">
              {uploading ? 'Uploading...' : 'Choose File'}
            </span>
          </label>
        </div>

        {error && <Alert message={error} />}
        {success && <Alert type="success" message={success} />}
      </div>

      {data && (
        <div className="space-y-4">
          <ScoreCard title="Resume Score" score={data.resumeScore} icon={FiFileText} />

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-1 text-sm text-slate-500">Uploaded File</p>
            <p className="font-medium text-slate-800 dark:text-slate-100">{data.fileName}</p>
            <p className="text-xs text-slate-500">
              {new Date(data.uploadDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-3 text-sm font-medium text-slate-500">Section Analysis</p>
            <div className="space-y-2">
              {Object.entries(sectionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                  {data.sectionsFound?.[key] ? (
                    <FiCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <FiX className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
