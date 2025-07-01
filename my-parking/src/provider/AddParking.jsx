import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddParking = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    pricing_2wheeler: '',
    pricing_4wheeler: '',
    slots_2wheeler_total: '',
    slots_4wheeler_total: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name || !formData.address || !formData.latitude || !formData.longitude ||
      !formData.pricing_2wheeler || !formData.pricing_4wheeler ||
      !formData.slots_2wheeler_total || !formData.slots_4wheeler_total
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    const parkingData = {
      name: formData.name,
      address: formData.address,
      location: {
        type: 'Point',
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
          available: Number(formData.slots_2wheeler_total)
        },
        "4-wheeler": {
          total: Number(formData.slots_4wheeler_total),
          available: Number(formData.slots_4wheeler_total)
        }
      }
    };

    try {
      console.log("123");
      
      const response = await api.post(
        '/parkingLocations/createlocations',
        parkingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert('Parking location added successfully!');
        navigate('/provider');
      }
    } catch (err) {
      console.error("Error adding parking location:", err);
      setError(err.response?.data?.message || "Error adding parking location.");
    }
  };

  return (
    <div className="mx-[100px] bg-white shadow-md border border-gray-200 p-8 mb-10 rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Parking Location</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Parking Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Parking Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Parking Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Address"
              required
            />
          </div>
        </div>

        {/* Row 2: 2W Price & Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">2-Wheeler Price (₹/hr)</label>
            <input
              type="number"
              name="pricing_2wheeler"
              value={formData.pricing_2wheeler}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">2-Wheeler Slots</label>
            <input
              type="number"
              name="slots_2wheeler_total"
              value={formData.slots_2wheeler_total}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 30"
              required
            />
          </div>
        </div>

        {/* Row 3: 4W Price & Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">4-Wheeler Price (₹/hr)</label>
            <input
              type="number"
              name="pricing_4wheeler"
              value={formData.pricing_4wheeler}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">4-Wheeler Slots</label>
            <input
              type="number"
              name="slots_4wheeler_total"
              value={formData.slots_4wheeler_total}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 50"
              required
            />
          </div>
        </div>

        {/* Row 4: Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 23.0225"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 72.5714"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-500 transition-all"
        >
          Add Parking Location
        </button>
      </form>
    </div>
  );
};

export default AddParking;
