import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

function ExplainCode() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!code) {
        toast.error("Please enter code");
        return;
    }
    setExplanation("");

    try {
        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/explain`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });

            const data = await response.json();

            if (data.success) {
                setExplanation(data.explanation);
                toast.success("Explanation Generated!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleExplain();
  }
};

  return (
    <PageLayout>

      <div>
        <h1 className="text-4xl font-bold mb-6">
          AI Code Explainer 🤖
        </h1>

        <textarea
  value={code}
  onChange={(e) => setCode(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder="Paste your C++, Java, Python or JavaScript code..."
  className="w-full border rounded-lg p-4 h-64"
/>

        <button
            disabled={loading}
            onClick={handleExplain}
            
            className="bg-blue-600 text-white px-6 py-3 rounded mt-4 hover:bg-blue-700 disabled:bg-gray-400"
        >
            {loading ? "Explaining..." : "Explain Code"}
        </button>

        {explanation && (
          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              AI Explanation
            </h2>
              <div className="prose max-w-none">
                <ReactMarkdown>
    {explanation}
  </ReactMarkdown>
</div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default ExplainCode;