import React, { useEffect, useState } from "react";
import api from "../../api"; // adjust path based on your project structure

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/user");
        setTransactions(res.data);
      } catch (err) {
        setError("Failed to load payment history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white shadow-md border border-gray-200 p-6 mb-8 mx-[100px] mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment History</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx, index) => (
            <li key={index} className="p-4 bg-gray-100 flex justify-between items-center rounded">
              <div>
                <p className="font-semibold text-gray-800">
                  ₹{(tx.paidamount || 0)}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(tx.createdAt).toLocaleDateString()} | Order ID: {tx.razorpay_order_id}
                </p>
              </div>
              <span
                className={`text-sm font-medium ${
                  tx.status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.status === "success" ? "Completed" : "Failed"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;
