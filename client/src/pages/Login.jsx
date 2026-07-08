import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";
import Logo from "../components/common/Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      toast.success("Welcome back!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <Logo />

        <p className="text-gray-500 text-center mt-6 mb-8">
  Login to your CodeLens account.
</p>

        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end mt-2 mb-4">
          <button
            type="button"
            className="text-blue-600 text-sm hover:underline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>

        <Button
          text="Login"
          onClick={handleLogin}
          disabled={!email || !password}
        />

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;