import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-6">
        <p>No parking locations found.</p>
      </div>
    );
  }
  const token = localStorage.getItem("token")
  const [SavedLocations, setSavedLocations] = useState([])
  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/auth/get-saved-locations?token=${token}`);
        setSavedLocations(response.data);
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      }
    };

    if (token) fetchSavedLocations();
    
  }, [token]);
  

  return (
    <div className="mt-8 mx-[100px]">
      <h2 className="text-xl font-semibold text-gray-700">Nearby Parking Options</h2>
      <p className="text-sm text-gray-500 mb-4">
        Showing {results.length} parking spots near your location.
      </p>

      {/* Interactive Map */}
      <div className="relative h-56 rounded-lg mb-6">
        <MapContainer
          center={[results[0]?.location.coordinates[1], results[0]?.location.coordinates[0]]}
          zoom={14}
          className="w-full h-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {results.map((parking, index) => (
            <Marker
              key={index}
              position={[parking.location.coordinates[1], parking.location.coordinates[0]]}
            >
              <Popup>
                <strong>{parking.name}</strong>
                <br />
                2-Wheeler: {parking.pricing?.["2-wheeler"] ? `₹${parking.pricing["2-wheeler"]}/hr` : "N/A"}
                <br />
                4-Wheeler: {parking.pricing?.["4-wheeler"] ? `₹${parking.pricing["4-wheeler"]}/hr` : "N/A"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Parking List - 4 Cards Per Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((parking, index) => (
          <ParkingCard key={index} {...parking} SavedLocations={SavedLocations} />
        ))}
      </div>
    </div>
  );
};

const ParkingCard = ({ _id, name, address, pricing, slots, SavedLocations }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const token = localStorage.getItem("token");

  // Check if location is already saved
  useEffect(() => {
    setIsSaved(SavedLocations.some((saved) => saved._id === _id));
  }, [SavedLocations, _id]);

  // Handle saving a parking location
  const handleSave = async () => {
    if (!token) {
      alert("You must be logged in to save a location.");
      return;
    }

    try {
      const response = await api.post(
        "/auth/save-location",
        { parkingId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if ([200, 201].includes(response.status)) {
        setIsSaved(true);
      } else {
        alert("Failed to save location. Please try again.");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      alert(error.response?.data?.message || "Error saving location.");
    }
  };

  // Handle removing a saved location
  const handleRemove = async () => {
    try {
      await api.delete(`/auth/remove-saved-location/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSaved(false);
    } catch (error) {
      console.error("Error removing saved location:", error);
      alert("Error removing saved location.");
    }
  };

  // Navigate to booking page with parking details
  const handleBookNow = () => {
    navigate("/user/book-parking", { state: { parkingId: _id, parkingName: name, pricing: pricing || {}} });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-full">
      {/* Title & Address */}
      <h3 className="text-md font-semibold text-gray-800">{name}</h3>
      <p className="text-xs text-gray-500">{address}</p>

      {/* Pricing & Availability */}
      <div className="mt-2 text-gray-700">
        <p className="text-xs font-semibold">
          2-Wheeler: <span className="font-bold">{pricing?.["2-wheeler"] ? `₹${pricing["2-wheeler"]}/hr` : "N/A"}</span>
        </p>
        <p className="text-xs font-semibold">
          4-Wheeler: <span className="font-bold">{pricing?.["4-wheeler"] ? `₹${pricing["4-wheeler"]}/hr` : "N/A"}</span>
        </p>
        <p className="text-xs mt-1">
          Available: <span className="font-bold">{slots?.["2-wheeler"]?.available} 2W / {slots?.["4-wheeler"]?.available} 4W</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-3">
        {isSaved ? (
          <button
            onClick={handleRemove}
            className="w-[48%] bg-red-600 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-red-700"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="w-[48%] bg-green-600 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-green-700"
          >
            Save
          </button>
        )}

        <button
          onClick={handleBookNow}
          className="w-[48%] bg-blue-600 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
