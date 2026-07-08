import { useEffect, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  Sparkles,
  Search,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(null);
  const [improvedNotes, setImprovedNotes] = useState({});
  const [loadingImprove, setLoadingImprove] = useState(null);
  const [loadingNote, setLoadingNote] = useState(false);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleCreateNote = async () => {
    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoadingNote(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        editingId
  ? `${import.meta.env.VITE_API_URL}/api/notes/${editingId}`
  : `${import.meta.env.VITE_API_URL}/api/notes`,
        {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(
        editingId
          ? "Note Updated Successfully!"
          : "Note Created Successfully!"
      );

      setTitle("");
      setContent("");
      setEditingId(null);

      fetchNotes();

      } catch(error){
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoadingNote(false);
      }
  };
  const handleDeleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Note Deleted Successfully!");
        fetchNotes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleSummarize = async (note) => {
  try {
    setLoadingSummary(note._id);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note.content,
      }),
    });

    const data = await response.json();

    if (data.success) {
  const token = localStorage.getItem("token");

  await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${note._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      summary: data.summary,
    }),
  });

  toast.success("Summary Generated!");

  fetchNotes();
} else {
  toast.error(data.message);
}

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  } finally {
    setLoadingSummary(null);
  }
};
const handleImprove = async (note) => {
  try {
    setLoadingImprove(note._id);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/improve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note.content,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setImprovedNotes((prev) => ({
        ...prev,
        [note._id]: data.improved,
      }));

      toast.success("Notes Improved!");
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  } finally {
    setLoadingImprove(null);
  }
};
  const handleEditClick = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <PageLayout>
      <div>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-600 to-blue-600 p-10 shadow-2xl">

  {/* Background Glow */}
  <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">

    <div>

      <p className="uppercase tracking-[4px] text-blue-200 text-sm font-semibold">
        AI POWERED LEARNING PLATFORM
      </p>

      <h1 className="text-5xl font-extrabold mt-3">
        🧠 CodeLens
      </h1>

      <p className="mt-4 text-lg text-blue-100 max-w-xl leading-8">
        Organize your programming notes, generate AI summaries,
        improve explanations, and learn faster with your personal
        coding mentor.
      </p>

    </div>

    <div className="mt-8 md:mt-0 text-center">

      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">

        <p className="text-blue-200">
          Total Notes
        </p>

        <h2 className="text-6xl font-bold mt-2">
          {notes.length}
        </h2>

      </div>

    </div>

  </div>

</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

  {/* Total Notes */}
  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

    <BookOpen size={42} />

    <p className="mt-5 text-blue-100">
      Total Notes
    </p>

    <h2 className="text-5xl font-bold mt-2">
      {notes.length}
    </h2>

    <p className="mt-3 text-sm text-blue-100">
      Programming notes created
    </p>

  </div>

  {/* AI Summaries */}
  <div className="bg-gradient-to-br from-violet-500 to-purple-700 text-white rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

    <Sparkles size={42} />

    <p className="mt-5 text-purple-100">
      AI Summaries
    </p>

    <h2 className="text-5xl font-bold mt-2">
      {notes.filter(note => note.summary?.trim()).length}
    </h2>

    <p className="mt-3 text-sm text-purple-100">
      Saved AI summaries
    </p>

  </div>

  {/* Search Results */}
  <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

    <Search size={42} />

    <p className="mt-5 text-green-100">
      Search Results
    </p>

    <h2 className="text-5xl font-bold mt-2">
      {filteredNotes.length}
    </h2>

    <p className="mt-3 text-sm text-green-100">
      Matching notes
    </p>

  </div>

</div>
        <div className="mt-10 bg-white/80 backdrop-blur-lg border border-white/60 rounded-3xl shadow-2xl p-8">

  <div className="flex items-center justify-between mb-8">

    <div>
      <h2 className="text-3xl font-bold text-gray-800">
        📝 {editingId ? "Update Note" : "Create New Note"}
      </h2>

      <p className="text-gray-500 mt-2">
        Save your programming concepts and let AI help you learn faster.
      </p>
    </div>

    <div className="hidden md:flex h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 items-center justify-center text-white text-3xl shadow-lg">
      📘
    </div>

  </div>

  {/* Title */}

  <div className="mb-5">

    <label className="block text-sm font-semibold text-gray-600 mb-2">
      Note Title
    </label>

    <input
      type="text"
      placeholder="Example: Binary Search"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-2xl border border-gray-300 p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    />

  </div>

  {/* Content */}

  <div>

    <label className="block text-sm font-semibold text-gray-600 mb-2">
      Programming Notes
    </label>

    <textarea
      placeholder="Write your notes here..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full rounded-2xl border border-gray-300 p-5 h-52 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    />

  </div>

  <button
    onClick={handleCreateNote}
    disabled={loadingNote}
    className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <Plus size={20} />

    <span className="font-semibold">
      {loadingNote
        ? editingId
          ? "Updating..."
          : "Creating..."
        : editingId
        ? "Update Note"
        : "Create Note"}
    </span>
  </button>

</div>
        <div className="mt-8">
          <input
            type="text"
            placeholder="🔍 Search notes by title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-8">
          {filteredNotes.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">

            📒

            <h2 className="text-2xl font-bold mt-4">
              No Notes Yet
            </h2>

            <p className="text-gray-500 mt-2">
              📝 Create Programming Note
            </p>

            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
  key={note._id}
  className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-3xl shadow-xl p-7 mb-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
>
                <div className="flex justify-between items-start">

  <div>

    <h2 className="text-3xl font-bold text-gray-800">
      📘 {note.title}
    </h2>

    <div className="flex gap-2 mt-3">

      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
        Programming
      </span>

      {note.summary && (
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
          AI Summary
        </span>
      )}

    </div>

  </div>

</div>

                <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5">

  <p className="text-gray-700 leading-8 whitespace-pre-wrap">
    {note.content}
  </p>

</div>
                {note.summary && (
                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      🤖 AI Summary
                    </h3>

                    <div className="prose max-w-none">
                      <ReactMarkdown>
                        {note.summary}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                {improvedNotes[note._id] && (
                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-green-700 mb-4">
                      ✨ Improved Notes
                    </h3>

                    <div className="prose max-w-none">
                      <ReactMarkdown>
                        {improvedNotes[note._id]}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                <div className="flex gap-6 text-sm text-gray-500 mt-6">

  <span>
    📅 Created:
    {" "}
    {new Date(note.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </span>

  <span>
    🕒 Updated:
    {" "}
    {new Date(note.updatedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </span>

</div>

                <div className="mt-8 flex flex-wrap gap-3">

                  <button
                    onClick={() => handleEditClick(note)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                  <button
                    onClick={() => handleSummarize(note)}
                    disabled={loadingSummary === note._id}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingSummary === note._id ? "⏳ Summarizing..." : "🤖 Summarize"}
                  </button>
                  <button
                    onClick={() => handleImprove(note)}
                    disabled={loadingImprove === note._id}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingImprove === note._id
                    ? "⏳ Improving..."
                    : "✨ Improve"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Dashboard;