import { useState, useRef } from 'react';

export default function CandidateUpload() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', skills: '' });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.name.endsWith('.pdf') || selected.name.endsWith('.docx'))) {
      setFile(selected);
      setError('');
    } else {
      setError('Only PDF or DOCX files allowed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please upload a resume file.');

    const formData = new FormData();
    formData.append('resume_file', file);
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('skills', form.skills);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/upload_resume/', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed.');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (submitted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-semibold text-green-600">🎉 Resume Submitted!</h2>
          <p className="mt-2 text-gray-700">Thank you for applying. Our team will review your resume shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-xl shadow-md p-8"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Candidate Resume Submission</h1>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              ref={inputRef}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="cursor-pointer text-blue-600 hover:underline">
              {file ? `📄 ${file.name}` : 'Click to upload resume (PDF or DOCX)'}
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Resume
        </button>
      </form>
    </div>
  );
}
