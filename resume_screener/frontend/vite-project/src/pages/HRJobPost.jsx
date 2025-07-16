import { useEffect, useState } from "react";

const CreateJobFromTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem("hrToken");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/templates/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  const handleSelect = (id) => {
    const temp = templates.find((t) => t.id === parseInt(id));
    setSelected(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return;

    const res = await fetch("http://127.0.0.1:8000/api/jobs/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        title: selected.title,
        experience_level: selected.experience_level,
        required_skills: selected.skills,
        description: selected.description,
      }),
    });

    if (res.ok) {
      alert("Job posted successfully!");
      setSelected(null);
    } else {
      alert("Failed to post job");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-start py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post Job Opening</h2>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Select Job Role:</span>
          <select
            onChange={(e) => handleSelect(e.target.value)}
            className="mt-1 w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="">-- Select Role --</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title} ({template.experience_level})
              </option>
            ))}
          </select>
        </label>

        {selected && (
          <div className="mt-6">
            <p>
              <strong>Skills:</strong> {selected.skills}
            </p>
            <p className="mt-2 whitespace-pre-line">
              <strong>Description:</strong>
              <br />
              {selected.description}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!selected}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-lg shadow-md transition-all duration-300"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJobFromTemplate;
