import { useEffect, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import EndPoints from "../services/EndPoints";
import toast, { Toaster } from "react-hot-toast";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", description: "" });
  const [isUpdate, setIsUpdate] = useState(false);

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      const res = await axiosClient.get(EndPoints.GET_SUBJECTS);
      // console.log({ res });
      if (res?.statusCode === 200) {
        setSubjects(res?.result);
      }
    } catch (e) {
      //   console.log({ e });
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save new or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post(EndPoints.ADD_SUBJECTS, form);
      //   console.log({res});
      if (res?.statusCode === 201) {
        toast.success(res?.result);
        setForm({ name: "", code: "", description: "" });
        fetchSubjects();
      }
    } catch (e) {
      //   console.log({ e });
    }
  };

  // Edit
  const handleEdit = async (subject) => {
    setIsUpdate(true);
    setForm({
      name: subject.name,
      code: subject.code,
      description: subject.description,
    });
    if (!subject?.name || !subject?.code || !subject?.description) {
      return toast.error("Name, Code and Description are required");
    }
    const res = await axiosClient.put(
      `${EndPoints.UPDATE_SUBJECTS}/${subject?._id}`,
      {
        form,
      }
    );
    if (res?.statusCode === 200) {
      toast.success(res?.result);
      setForm({ name: "", code: "", description: "" });
      fetchSubjects();
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const res = await axiosClient.delete(`${EndPoints.DELETE_SUBJECTS}/${id}`);
    // console.log(res);
    if (res?.statusCode === 200) {
      toast.success(res?.result);
      fetchSubjects();
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        📘 Subject Manager
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-white p-6 rounded-2xl shadow-md border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Subject Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Code
            </label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g. MATH101"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description..."
              rows={3}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isUpdate ? "✏️ Update Subject" : "➕ Add Subject"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {s.name}{" "}
                <span className="text-sm text-gray-500">({s.code})</span>
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{s.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(s)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
