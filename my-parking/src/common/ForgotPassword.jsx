import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (!email) {
        setError("Please enter your email.");
        return;
      }

      const response = await api.post("/auth/forgot-passwordbyemail", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-80 p-5 bg-gray-800 text-white rounded-xl shadow-lg">
        <h2 className="text-center text-xl font-semibold">Forgot Password</h2>

        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        {message && <p className="text-green-400 text-center mt-2">{message}</p>}

        <form className="space-y-3 mt-3" onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold text-base"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm transition-all">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
