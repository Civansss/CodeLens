import { useState, useRef, useEffect } from "react";
import { Copy, Plus } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const bottomRef = useRef(null);
  const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askAI();
  }
};
const fetchHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setMessages(data.chats);
    }

  } catch (error) {
    console.log(error);
  }
};

  const askAI = async () => {
  if (!question.trim()) {
    toast.error("Please enter a question.");
    return;
  }

  const userQuestion = question;

  setDisplayedText("");

let current = "";

for (let i = 0; i < data.answer.length; i++) {
  current += data.answer[i];

  setDisplayedText(current);

  await new Promise((resolve) =>
    setTimeout(resolve, 8)
  );
}

setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    text: data.answer,
  },
]);

setDisplayedText("");

  setQuestion("");

  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
      body: JSON.stringify({
        question: userQuestion,
        history: messages,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};
  const copyResponse = async () => {
  try {
    const lastAI = [...messages]
  .reverse()
  .find((msg) => msg.role === "assistant");

if (!lastAI) return;

await navigator.clipboard.writeText(lastAI.text);
    toast.success("Copied!");
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
useEffect(() => {
  fetchHistory();
}, []);

  return (
    <PageLayout fullWidth>
  <div className="h-[calc(100vh-80px)] flex flex-col w-full">

    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">

  <div className="flex justify-between items-center">

    <div>

      <h1 className="text-4xl font-bold">
        🤖 AI Mentor
      </h1>

      <p className="mt-2 text-purple-100">
        Ask anything about DSA, React, JavaScript, C++, or Interviews.
      </p>

    </div>

    <button
      onClick={() => {
  setQuestion("");
  setMessages([]);
  toast.success("Started a new chat!");
}}
      className="flex items-center gap-2 bg-white text-purple-700 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
    >
      <Plus size={20} />
      New Chat
    </button>

  </div>

</div>

    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto px-8 py-8">
      {loading && (
  <div className="flex justify-start mt-6">
    <div className="bg-white rounded-3xl rounded-bl-lg shadow-xl border px-6 py-5">

      <p className="font-bold text-purple-700 mb-3">
        🤖 AI Mentor
      </p>

      <div className="flex items-center gap-2">

        <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></span>

        <span
          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>

      </div>

      <p className="text-gray-500 mt-3">
        Thinking...
      </p>

    </div>
  </div>
)}
<div className="space-y-6">

  {messages.map((msg, index) => (

    <div
      key={index}
      className={`flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[90%] rounded-3xl p-6 shadow-lg ${
          msg.role === "user"
            ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-lg"
            : "bg-white border rounded-bl-lg"
        }`}
      >

        <div className="flex justify-between items-center mb-3">
          <p className="font-bold">
            {msg.role === "user" ? "👤 You" : "🤖 AI Mentor"}
          </p>

          {msg.role === "assistant" && (
            <button
              onClick={() =>
                navigator.clipboard.writeText(msg.text)
              }
              className="text-gray-500 hover:text-purple-600"
            >
              <Copy size={18} />
            </button>
          )}
        </div>

        {msg.role === "assistant" ? (
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-200 px-1 py-0.5 rounded text-pink-600"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{msg.text}</p>
        )}

      </div>

    </div>

  ))}
  {loading && displayedText && (
  <div className="flex justify-start">
    <div className="max-w-[90%] bg-white rounded-3xl rounded-bl-lg shadow-lg border p-6">
      <p className="font-bold mb-3">
        🤖 AI Mentor
      </p>

      <ReactMarkdown>
        {displayedText}
      </ReactMarkdown>
    </div>
  </div>
)}

</div>

      <div ref={bottomRef}></div>

    </div>

    {/* Bottom Input */}
    <div className="border-t bg-white p-5">

      <div className="flex gap-4">

        <textarea
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="flex-1 border rounded-2xl p-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 rounded-2xl hover:scale-105 transition-all disabled:opacity-60"
        >
          {loading ? "Sending..." : "🚀 Send"}
        </button>

      </div>

    </div>

  </div>
</PageLayout>
  );
}

export default AIChat;