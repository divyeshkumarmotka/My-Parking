
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


const ProviderChangePassword = () => {
   const [passwordData, setPasswordData] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");
    
    

    const handleChange = (e) => {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
  
    const handleSave = async () => {
      setError("");
      setSuccess("");
  
      try {
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
          setError("All fields are required.");
          return;
        }
  
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          setError("New passwords do not match.");
          return;
        }
  
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await api.put(`/auth/change-password?token=${token}`, passwordData);
  
        setSuccess(response.data.message);
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        alert("Password changed successfully.");
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong.");
      }
    };
  
    const handleForgotPassword = async () => {
      setForgotMessage("");
      setError("");       
  
      try {
        const token = localStorage.getItem("token");
        const response = await api.post(`/auth/forgot-password?token=${token}`);
  
        setForgotMessage(response.data.message || "Password reset link sent to your email.");
      } catch (error) {
        setError(error.response?.data?.message || "Failed to send reset link.");
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white shadow-md border border-gray-200 p-4 rounded-lg mx-[100px] mt-16">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">Change Password</h2>
  
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        {forgotMessage && <p className="text-blue-600 text-sm text-center">{forgotMessage}</p>}
  
        <div className="space-y-3">
          {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
            <input
              key={field}
              type="password"
              name={field}
              value={passwordData[field]}
              onChange={handleChange}
              placeholder={
                field === "oldPassword" ? "Old Password" : field === "newPassword" ? "New Password" : "Confirm New Password"
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
  
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500 transition-all text-sm"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/provider/provider-profile")}
            className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition-all text-sm"
          >
            Cancel
          </button>
        </div>
  
        <div className="text-center mt-3">
          <button
            onClick={handleForgotPassword}
            className="text-blue-600 hover:text-blue-700 text-sm transition-all"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    );
};

export default ProviderChangePassword;
