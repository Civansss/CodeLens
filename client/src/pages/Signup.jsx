import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Logo from "../components/common/Logo";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Account Created Successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);

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
  Create your CodeLens account and start coding smarter.
</p>

        <TextInput
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text="Create Account"
          onClick={handleSignup}
          disabled={!name || !email || !password}
        />

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;