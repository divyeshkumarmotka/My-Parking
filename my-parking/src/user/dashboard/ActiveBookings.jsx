import { useState, useEffect } from "react";
import api from "../../api"; // Import API helper

const ActiveBookings = ({ setactivebookingNumber }) => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchActiveBookings = async () => {
      if (!token) {
        setError("You must be logged in to view active bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/bookings/getbookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const active = response.data.filter((booking) => booking.status === "active");
          setActiveBookings(active);
          setactivebookingNumber(active.length);
        } else {
          setError("Failed to fetch active bookings.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching active bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBookings();
  }, [token]);

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {

    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;
    if (!token) return;

    try {
      const response = await api.delete(
        `/bookings/cancle-bookings/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // Remove canceled booking from state
        const updatedBookings = activeBookings.filter((booking) => booking._id !== bookingId);
        setActiveBookings(updatedBookings);
        setactivebookingNumber(updatedBookings.length);
        alert("Booking canceled successfully")
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling booking.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Bookings</h2>

      {loading && <p className="text-gray-600">Loading active bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Active Bookings Section */}
      {activeBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBookings.map((booking) => (
            <div key={booking._id} className="border-l-4 border-blue-500 p-3 rounded-lg bg-white">
              {/* Parking Info */}
              <p className="text-sm font-medium text-gray-900">{booking.parkingId.name}</p>
              <p className="text-xs text-gray-600">{booking.parkingId.address}</p>

              {/* Vehicle Info */}
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-semibold">Vehicle:</span> {booking.vehicleType} ({booking.vehicleNumber})
              </p>

              {/* Pricing & Duration */}
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Rate:</span> ₹{booking.parkingId.pricing[booking.vehicleType]}/hr
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Start:</span> {new Date(booking.startTime).toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">End:</span> {new Date(booking.endTime).toLocaleString()}
              </p>

              {/* Amount Paid */}
              <p className="text-xs font-semibold text-gray-800 mt-1">
                <span className="font-bold">Paid:</span> ₹{booking.pricePaid}
              </p>

              {/* Status */}
              <p className="text-xs font-bold mt-1 uppercase text-blue-600">
                {booking.status}
              </p>

              {/* Cancel Booking Button */}
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No active bookings found.</p>
      )}
    </div>
  );
};

export default ActiveBookings;
