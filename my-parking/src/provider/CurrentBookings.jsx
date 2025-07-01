import React, { useEffect, useState } from 'react';
import api from '../api';
import { useLocation } from 'react-router-dom';

export const CurrentBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/bookings/provider-current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching provider bookings:", error);
      }
    };

    fetchBookings();
  }, []);

   const location=useLocation()

  return (
    <div className={`${location.pathname==="/provider"?"": "bg-white shadow-md border border-gray-200 p-6 rounded-lg mx-[100px] mt-6"}`}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No current bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 border rounded-md bg-gray-50 shadow-sm">
              <p className="text-gray-700">
                <strong>Parking:</strong> {booking.parkingId?.name} <br />
                <strong>User:</strong> {booking.userId?.name} ({booking.userId?.email})<br />
                <strong>Vehicle:</strong> {booking.vehicleType} - {booking.vehicleNumber}<br />
                <strong>Time:</strong> {new Date(booking.startTime).toLocaleString()} → {new Date(booking.endTime).toLocaleString()} <br />
                <strong>Status:</strong> <span className="text-blue-600 font-medium">{booking.status}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


