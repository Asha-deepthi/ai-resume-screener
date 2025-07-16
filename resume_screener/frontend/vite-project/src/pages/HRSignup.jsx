import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function HRSignup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users/hr-signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/hr/login'), 2000);
      } else {
        const data = await res.json();
        setError(Object.values(data).flat().join(' '));
      }
    } catch {
      setError('Something went wrong.');
    }
  };

  if (success)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-green-50 p-4">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Signup Successful!</h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">HR Signup</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/hr/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
