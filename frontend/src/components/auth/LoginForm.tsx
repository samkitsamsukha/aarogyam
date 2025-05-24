import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import axios from "axios";
import RoleSelector from "./RoleSelector";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Add role state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !role) {
      setError("Please fill in all fields and select a role");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
        role,
      });

      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        // Store the JWT token in local storage
        localStorage.setItem("token", data.token);
        console.log("Login successful, token stored:", data.token);
        if (role == "donor") {
          navigate("/donor-dashboard");
        } else {
          navigate("/recipient-dashboard");
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
        >
          {error}
        </motion.div>
      )}

      <FormInput
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <div>
        <RoleSelector value={role} onChange={setRole} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        className="mt-4"
        icon={<LogIn size={18} />}
      >
        Log In
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          New to Aarogyam?{" "}
          <button
            type="button"
            onClick={onRegisterClick}
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            Create an account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
