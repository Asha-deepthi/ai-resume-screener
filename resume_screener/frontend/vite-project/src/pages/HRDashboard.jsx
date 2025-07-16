import { useEffect, useState } from "react";

const HRDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("resumes");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("hrToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [resumeRes, jobRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/hr/resumes/", {
            headers: { Authorization: `Token ${token}` },
          }),
          fetch("http://127.0.0.1:8000/api/jobs/all/", {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        const resumeData = await resumeRes.json();
        const jobData = await jobRes.json();

        setResumes(resumeData);
        setJobs(jobData);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      {/* ✅ Top Nav */}
      <header className="bg-indigo-700 text-white shadow-lg px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">HR Portal</h1>
        <nav className="space-x-4">
          <button
            onClick={() => setActiveTab("resumes")}
            className={`hover:underline ${activeTab === "resumes" ? "font-semibold underline" : ""}`}
          >
            Candidate Resumes
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`hover:underline ${activeTab === "jobs" ? "font-semibold underline" : ""}`}
          >
            Posted Jobs
          </button>
          <button
            onClick={() => setActiveTab("ranking")}
            className={`hover:underline ${activeTab === "ranking" ? "font-semibold underline" : ""}`}
          >
            Resume Ranking
          </button>
        </nav>
      </header>

      {/* ✅ Main Content */}
      <main className="p-6 overflow-auto flex-grow">
        {loading ? (
          <p className="text-gray-700">Loading data...</p>
        ) : (
          <>
            {activeTab === "resumes" && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Resumes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
                    >
                      <h3 className="text-lg font-semibold">{resume.name}</h3>
                      <p className="text-sm text-gray-600">📧 {resume.email}</p>
                      <p className="text-sm text-gray-600">📞 {resume.phone}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        🛠 <strong>Skills:</strong> {resume.skills}
                      </p>
                      <a
                        href={`http://127.0.0.1:8000${resume.resume_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 text-indigo-600 hover:underline"
                      >
                        View Resume
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "jobs" && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Jobs Posted by You</h2>
                {jobs.length === 0 ? (
                  <p className="text-gray-600">No jobs posted yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {jobs.map((job) => (
                      <li key={job.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-indigo-700">
                          {job.title} ({job.experience_level})
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">📝 {job.description}</p>
                        <p className="text-sm text-gray-600 mt-1">Skills: {job.required_skills}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {activeTab === "ranking" && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resume Scoring & Ranking</h2>
                <p className="text-gray-600">Coming soon: AI-powered ranking based on job-role match.</p>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HRDashboard;
