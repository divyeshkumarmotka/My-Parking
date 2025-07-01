import React, { useEffect, useState } from "react";
import api from "../api";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const res = await api.get("/bookings/provider-booking-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [token]);

  const completed = bookings.filter((b) => b.status === "completed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="mx-[100px] my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking History</h2>

      {loading ? (
        <p className="text-gray-500">Loading history...</p>
      ) : (
        <>
          {/* Completed Bookings */}
          <h3 className="text-lg font-semibold text-green-700 mb-3">Completed Bookings</h3>
          {completed.length === 0 ? (
            <p className="text-sm text-gray-400 mb-4">No completed bookings yet.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {completed.map((booking) => (
                <li key={booking._id} className="p-4 border border-gray-300 rounded-md bg-white shadow">
                  <p><strong>Location:</strong> {booking.parkingId.name}</p>
                  <p><strong>User:</strong> {booking.userId.name} ({booking.userId.email})</p>
                  <p><strong>Vehicle:</strong> {booking.vehicleType.toUpperCase()} - {booking.vehicleNumber}</p>
                  <p><strong>Time:</strong> {new Date(booking.startTime).toLocaleString()} → {new Date(booking.endTime).toLocaleString()}</p>
                  <p><strong>Amount Paid:</strong> ₹{booking.pricePaid}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Cancelled Bookings */}
          <h3 className="text-lg font-semibold text-red-700 mb-3">Cancelled Bookings</h3>
          {cancelled.length === 0 ? (
            <p className="text-sm text-gray-400">No cancelled bookings yet.</p>
          ) : (
            <ul className="space-y-4">
              {cancelled.map((booking) => (
                <li key={booking._id} className="p-4 border border-gray-300 rounded-md bg-white shadow">
                  <p><strong>Location:</strong> {booking.parkingId.name}</p>
                  <p><strong>User:</strong> {booking.userId.name} ({booking.userId.email})</p>
                  <p><strong>Vehicle:</strong> {booking.vehicleType.toUpperCase()} - {booking.vehicleNumber}</p>
                  <p><strong>Time:</strong> {new Date(booking.startTime).toLocaleString()} → {new Date(booking.endTime).toLocaleString()}</p>
                  <p><strong>Status:</strong> <span className="text-red-600">Cancelled</span></p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default BookingHistory;
