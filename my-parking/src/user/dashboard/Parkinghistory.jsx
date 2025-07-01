import { useState, useEffect } from "react";
import api from "../../api"; // Import API helper

const ParkingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setError("You must be logged in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/bookings/getbookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setBookings(response.data);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // Categorize bookings
  const activeBookings = bookings.filter((booking) => booking.status === "active");
  const completedBookings = bookings.filter((booking) => booking.status === "completed");
  const canceledBookings = bookings.filter((booking) => booking.status === "cancelled");

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Parking History</h2>

      {loading && <p className="text-gray-600">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Active Bookings */}
      <BookingSection title="Active Bookings" bookings={activeBookings} bgColor="border-blue-500" showCancel={true} />

      {/* Completed Bookings */}
      <BookingSection title="Completed Bookings" bookings={completedBookings} bgColor="border-green-500" />

      {/* Canceled Bookings */}
      <BookingSection title="Canceled Bookings" bookings={canceledBookings} bgColor="border-red-500" />
    </div>
  );
};

// Reusable component for booking cards (3 in a row)
const BookingSection = ({ title, bookings, bgColor, showCancel = false }) => {
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      const response = await api.delete(
        `/bookings/cancle-bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert("Booking canceled successfully.");
        window.location.reload(); // Refresh page to update bookings
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error canceling booking.");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-sm">No {title.toLowerCase()} available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className={`border-l-4 ${bgColor} p-3 rounded-lg shadow-md bg-white`}>
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
              <p className={`text-xs font-bold mt-1 uppercase ${booking.status === "canceled" ? "text-red-600" : "text-green-600"}`}>
                {booking.status}
              </p>

              {/* Cancel Button (Only for Active Bookings) */}
              {showCancel && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParkingHistory;
