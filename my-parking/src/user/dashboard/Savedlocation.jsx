import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../../api";

const Savedlocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Fetch saved locations from backend on component load
  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/auth/get-saved-locations?token=${token}`);
        setSavedLocations(response.data);
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedLocations();
  }, []);

  // Function to remove a saved location via the backend API
  const removeSavedLocation = async (locationId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/auth/remove-saved-location/${locationId}?token=${token}`);
      // Update state: remove the deleted location
      setSavedLocations((prev) =>
        prev.filter((location) => location._id !== locationId)
      );
    } catch (error) {
      console.error("Error removing saved location:", error);
      alert("Error removing saved location.");
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 p-6 mb-8 rounded-lg mx-[100px] mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Locations</h2>

      {/* Map Section */}
      {userLocation ? (
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} className="h-64 w-full rounded-md">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* User Location Marker */}
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>
          {/* Saved Location Markers */}
          {savedLocations.map((location) => (
            <Marker
              key={location._id}
              position={[
                location.location.coordinates[1],
                location.location.coordinates[0],
              ]}
            >
              <Popup>
                <b>{location.name}</b> <br />
                {location.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p className="text-gray-600">Fetching location...</p>
      )}

      {/* Saved Locations Cards - 4 Cards Per Row */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-gray-600">Loading saved locations...</p>
        ) : savedLocations.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved locations yet.</p>
        ) : (
          savedLocations.map((location) => (
            <SavedLocationCard
              key={location._id}
              locationData={location}
              onRemove={() => removeSavedLocation(location._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const SavedLocationCard = ({ locationData, onRemove }) => {
  const { _id, name, address, pricing, slots } = locationData;
  // For saved locations, we'll assume the location is already saved so no save button is needed.
  // We'll mimic the card style from the nearby parking component.
  const randomRating = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-full">
      {/* Title & Address */}
      <h3 className="text-md font-semibold text-gray-800">{name}</h3>
      <p className="text-xs text-gray-500">{address}</p>

      {/* Star Rating */}
      <div className="flex items-center mt-1 text-yellow-500 text-xs">
        {"★".repeat(randomRating) + "☆".repeat(5 - randomRating)}
      </div>

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
        <button
          onClick={onRemove}
          className="w-[48%] bg-red-600 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-red-700"
        >
          Remove
        </button>
        <button className="w-[48%] bg-blue-600 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Savedlocation;
