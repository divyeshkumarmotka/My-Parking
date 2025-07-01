import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword: passwordData.newPassword,
      });

      setSuccess(response.data.message);
      setPasswordData({ newPassword: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful reset
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md border border-gray-200 p-4 rounded-lg mx-[100px] mt-16">
      <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">Reset Password</h2>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center">{success}</p>}

      <div className="space-y-3">
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm New Password"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500 transition-all text-sm"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
