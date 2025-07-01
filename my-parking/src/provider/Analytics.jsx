import React, { useEffect, useState } from "react";
import api from "../api";

export const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/provider/analytics/location-wise", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-6">Loading analytics...</p>;
  }

  if (analytics.length === 0) {
    return <p className="text-center text-gray-600 mt-6">No analytics data available.</p>;
  }

  
  const overall = analytics.reduce(
    (acc, data) => {
      return {
        totalBookings: acc.totalBookings + data.totalBookings,
        confirmedBookings: acc.confirmedBookings + data.confirmedBookings,
        cancelledBookings: acc.cancelledBookings + data.cancelledBookings,
        totalEarnings: acc.totalEarnings + data.totalEarnings,
      };
    },
    {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      totalEarnings: 0,
    }

  );

  return (
    <div className="mx-[100px] my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Location-wise Analytics</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-200">Parking Location</th>
            <th className="p-2 border border-gray-200">Total Bookings</th>
            <th className="p-2 border border-gray-200">Confirmed Bookings</th>
            <th className="p-2 border border-gray-200">Cancelled Bookings</th>
            <th className="p-2 border border-gray-200">Total Earnings (₹)</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((data) => (
            <tr key={data.locationId}>
              <td className="p-2 border border-gray-200">{data.locationName}</td>
              <td className="p-2 border border-gray-200">{data.totalBookings}</td>
              <td className="p-2 border border-gray-200">{data.confirmedBookings}</td>
              <td className="p-2 border border-gray-200">{data.cancelledBookings}</td>
              <td className="p-2 border border-gray-200">{data.totalEarnings}</td>
            </tr>
          ))}
          {/* Overall Summary Row */}
          <tr className="bg-gray-200 font-bold">
            <td className="p-2 border border-gray-200">Overall</td>
            <td className="p-2 border border-gray-200">{overall.totalBookings}</td>
            <td className="p-2 border border-gray-200">{overall.confirmedBookings}</td>
            <td className="p-2 border border-gray-200">{overall.cancelledBookings}</td>
            <td className="p-2 border border-gray-200">{overall.totalEarnings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
