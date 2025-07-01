import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const MyLocatios = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch locations on mount
  useEffect(() => {
    const fetchMyLocations = async () => {
      try {
        const response = await api.get('/parkingLocations/getlocations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching your parking locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLocations();
  }, [token]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parking location?")) return;
    try {
      await api.delete(`/parkingLocations/deletelocations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(locations.filter((loc) => loc._id !== id));
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Failed to delete location");
    }
  };

  return (
    <div className="mx-[100px] mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Parking Locations</h2>

      {loading ? (
        <p className="text-gray-600">Loading your locations...</p>
      ) : locations.length === 0 ? (
        <p className="text-gray-500">You haven't added any parking locations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc._id}
              className="bg-white shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">{loc.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{loc.address}</p>

              <div className="text-xs text-gray-700 space-y-1 mb-3">
                <p><strong>2-Wheeler:</strong> ₹{loc.pricing["2-wheeler"]}/hr, {loc.slots["2-wheeler"].available}/{loc.slots["2-wheeler"].total} slots</p>
                <p><strong>4-Wheeler:</strong> ₹{loc.pricing["4-wheeler"]}/hr, {loc.slots["4-wheeler"].available}/{loc.slots["4-wheeler"].total} slots</p>
                <p><strong>Coordinates:</strong> {loc.location.coordinates[1]}, {loc.location.coordinates[0]}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/provider/edit-parking`,{state: { locationData: loc }} )}
                  className="w-1/2 bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(loc._id)}
                  className="w-1/2 bg-red-600 text-white text-sm py-1.5 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLocatios;
