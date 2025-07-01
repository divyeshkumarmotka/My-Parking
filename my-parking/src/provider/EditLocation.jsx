import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

const EditLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    pricing_2wheeler: '',
    pricing_4wheeler: '',
    slots_2wheeler_total: '',
    slots_4wheeler_total: '',
    id: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const data = location.state?.locationData;
    if (data) {
      setFormData({
        id: data._id,
        name: data.name,
        address: data.address,
        latitude: data.location.coordinates[1],
        longitude: data.location.coordinates[0],
        pricing_2wheeler: data.pricing['2-wheeler'],
        pricing_4wheeler: data.pricing['4-wheeler'],
        slots_2wheeler_total: data.slots['2-wheeler'].total,
        slots_4wheeler_total: data.slots['4-wheeler'].total
      });
    } else {
      setError("No location data provided for editing.");
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const updatedData = {
        name: formData.name,
        address: formData.address,
        location: {
          type: "Point",
          coordinates: [
            Number(formData.longitude),
            Number(formData.latitude)
          ]
        },
        pricing: {
          "2-wheeler": Number(formData.pricing_2wheeler),
          "4-wheeler": Number(formData.pricing_4wheeler)
        },
        slots: {
          "2-wheeler": {
            total: Number(formData.slots_2wheeler_total),
            available: Number(formData.slots_2wheeler_total) // Assuming available reset to total
          },
          "4-wheeler": {
            total: Number(formData.slots_4wheeler_total),
            available: Number(formData.slots_4wheeler_total)
          }
        }
      };

      const res = await api.put(`/parkingLocations/updatelocations/${formData.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        alert("Parking location updated successfully.");
        navigate("/provider/my-locations");
      }
    } catch (error) {
      console.error("Error updating location:", error);
      setError(error.response?.data?.message || "Error updating location.");
    }
  };

  return (
    <div className="mx-[100px] bg-white shadow-md border border-gray-200 p-8 mb-10 rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Parking Location</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Parking Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Parking Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Row 2: 2W Price & Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">2-Wheeler Price (₹/hr)</label>
            <input
              type="number"
              name="pricing_2wheeler"
              value={formData.pricing_2wheeler}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">2-Wheeler Slots</label>
            <input
              type="number"
              name="slots_2wheeler_total"
              value={formData.slots_2wheeler_total}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Row 3: 4W Price & Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">4-Wheeler Price (₹/hr)</label>
            <input
              type="number"
              name="pricing_4wheeler"
              value={formData.pricing_4wheeler}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">4-Wheeler Slots</label>
            <input
              type="number"
              name="slots_4wheeler_total"
              value={formData.slots_4wheeler_total}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Row 4: Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditLocation;
