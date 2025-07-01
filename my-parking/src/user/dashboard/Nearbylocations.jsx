import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import api from "../../api";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const Nearbylocations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  const userIcon = L.divIcon({
    className: "custom-user-icon",
    html: '<div style="width: 20px; height: 20px; background-color: blue; border-radius: 50%; border: 3px solid white;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

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

  // Fetch user's current location on load
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

  // API call to fetch nearby parking locations when userLocation changes
  useEffect(() => {
    if (userLocation) {
      fetchNearbyParking(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  // API function to fetch parking spots
  const fetchNearbyParking = async (lat, lng) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await api.get(`parkingLocations/nearbyparking?lat=${lat}&lng=${lng}&token=${token}`);
      setParkingSpots(response.data);
    } catch (error) {
      console.error("Error fetching parking locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setUserLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 p-6 mb-8 mx-[100px] mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Nearby Parking Spots</h2>

      {/* Map Section */}
      {userLocation ? (
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} className="h-64 w-full rounded-md">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />

          {/* Draggable User Location Marker */}
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                setUserLocation({ lat, lng });
              },
            }}
          >
            <Popup>Drag me or click on the map to update location</Popup>
          </Marker>

          {/* Parking Spot Markers */}
          {parkingSpots.map((spot, index) => (
            <Marker key={index} position={[spot.location.coordinates[1], spot.location.coordinates[0]]}>
              <Popup>
                <b>{spot.name}</b> <br />
                2-Wheeler: {spot.pricing["2-wheeler"] ? `₹${spot.pricing["2-wheeler"]}/hr` : "N/A"} <br />
                4-Wheeler: {spot.pricing["4-wheeler"] ? `₹${spot.pricing["4-wheeler"]}/hr` : "N/A"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p className="text-gray-600">Fetching location...</p>
      )}

      {/* Loading State */}
      {loading && <p className="text-gray-600 text-center mt-4">Loading nearby parking spots...</p>}

      {/* Parking List - 4 Cards Per Row */}
      {!loading && parkingSpots.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {parkingSpots.map((spot, index) => (
            <ParkingCard key={index} {...spot} SavedLocations={SavedLocations} />
          ))}
        </div>
      )}

      {/* No Parking Found */}
      {!loading && parkingSpots.length === 0 && (
        <p className="text-gray-600 text-center mt-4">No parking locations found nearby.</p>
      )}
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

export default Nearbylocations;
