import { useState, useRef } from 'react';

export default function ResumeUploadAndParser() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setParsedData(null);
    setError('');
    if (selected && (selected.name.endsWith('.pdf') || selected.name.endsWith('.docx'))) {
      setFile(selected);
      uploadToBackend(selected);
    } else {
      setError('Only PDF or DOCX files are allowed.');
    }
  };

  const uploadToBackend = async (selectedFile) => {
    setUploading(true);
    setError('');
    setParsedData(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed.');
      }

      const data = await res.json();
      setParsedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setParsedData(null);
    setError('');
    inputRef.current.value = '';
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">AI Resume Parser</h2>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
            id="resumeInput"
          />
          <label htmlFor="resumeInput" className="cursor-pointer text-blue-600 hover:underline">
            {file ? `📄 ${file.name}` : 'Click to select a resume (PDF or DOCX)'}
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={handleClear}
            className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400 w-full sm:w-auto"
          >
            Clear
          </button>
        </div>

        {/* Status Messages */}
        {uploading && <p className="text-blue-600 mt-4 text-center">⏳ Uploading & Parsing...</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {/* Parsed Output */}
        {parsedData && (
          <div className="mt-8 bg-blue-50 border border-blue-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">📄 Parsed Information</h3>
            <ul className="space-y-2 text-gray-800">
              <li><strong>Name:</strong> {parsedData.candidate_name || 'N/A'}</li>
              <li><strong>Email:</strong> {parsedData.email || 'N/A'}</li>
              <li><strong>Phone:</strong> {parsedData.phone || 'N/A'}</li>
              <li><strong>Skills:</strong> {parsedData.skills || 'N/A'}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
