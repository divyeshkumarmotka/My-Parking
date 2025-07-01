import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; 

const ProviderEditProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user profile data when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const res = await api.get(`/auth/profile`);
        setFormData(res.data); // Populate form with user data
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      await api.put(`/auth/update-profile?token=${token}`, formData);
      alert("Profile updated successfully!");
      navigate("/provider/provider-profile"); 
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md border border-gray-200 p-4 rounded-lg mt-14">
      <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">Edit Profile</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-3">
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        ))}

        {/* Gender Dropdown */}
        <select
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500 transition-all text-sm"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => navigate("/provider/provider-profile")}
          className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProviderEditProfile;
