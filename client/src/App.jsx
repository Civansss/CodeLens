import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Problems from "./pages/Problems";
import Analytics from "./pages/Analytics";
import ExplainCode from "./pages/ExplainCode";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aichat" element={<AIChat />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/problems" element={<Problems />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/explain" element={<ExplainCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;