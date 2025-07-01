import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Findparking } from './Findparking';
import { Link } from 'react-router-dom';
import ActiveBookings from './ActiveBookings';

const Dashboard = () => {
  // State to control whether to show the search results
  const [showResults, setShowResults] = useState(false);
  const [savedlocationNum, setsavedlocationNum] = useState(undefined)
  const [activebookingNum, setactivebookingNum] = useState(undefined)
  
  const setactivebookingNumber = (num)=>{
    setactivebookingNum(num)
  }

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Here you could perform an API call based on the search form inputs
    setShowResults(true); // Show the Nearby Parking Options section
  };

  useEffect(() => {
      const fetchSavedLocations = async () => {
       
          const token = localStorage.getItem("token");
          const response = await api.get(`/auth/get-saved-locations?token=${token}`);
          setsavedlocationNum(response.data.length);
            
      };
  
      fetchSavedLocations();
    }, []);

    const [totalPaid, setTotalPaid] = useState(0);
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const res = await api.get("/transactions/user");
          const data = res.data;
    
          const total = data
            .filter(tx => tx.status === "success")
            .reduce((acc, tx) => acc + tx.paidamount, 0);
    
          setTotalPaid(total);
        } catch (err) {
          setError("Failed to load payment history.");
          console.error(err);
        }
      };
    
      fetchTransactions();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-6">
      {/* Header */}
      <header className="bg-white shadow-md mx-[100px] rounded-lg">
        <div className="max-w-7xl mx-auto px-[50px] py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
         <Link to="find-parking"> 
          <button  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-500 transition-all">
            + New Booking
          </button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-[100px] py-8">
        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-transform transform hover:scale-[1.02]">
            <div className="flex items-center space-x-3 text-gray-700 mb-3">
              <div className="bg-blue-300 p-3 rounded-full">
                <span className="material-icons text-black-500 text-2xl">Active Bookings</span>
              </div>
              
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{activebookingNum}</p>
            <Link to="parking-history">
            <button className="mt-3 text-blue-600 font-medium hover:text-blue-700 transition-all flex items-center">
              View all
            </button>
            </Link>
          </div>

          {/* Total Spent Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-transform transform hover:scale-[1.02]">
            <div className="flex items-center space-x-3 text-gray-700 mb-3">
              <div className="bg-green-300 p-3 rounded-full">
                <span className="material-icons text-black-500 text-2xl">Total Spent Money</span>
              </div>
              
            </div>
            <p className="text-3xl font-extrabold text-gray-900">₹{totalPaid}</p>
            <button className="mt-3 text-blue-600 font-medium hover:text-blue-700 transition-all flex items-center">
              View history
              
            </button>
          </div>

          {/* Saved Locations Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-transform transform hover:scale-[1.02]">
            <div className="flex items-center space-x-3 text-gray-700 mb-3">
              <div className="bg-red-300 p-3 rounded-full">
                <span className="material-icons text-black-500 text-2xl">Saved Locations</span>
              </div>
              
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{savedlocationNum}</p>
            <Link to='saved-location'>
            <button className="mt-3 text-blue-600 font-medium hover:text-blue-700 transition-all flex items-center">
              Manage locations
            </button>
            </Link>
          </div>
        </div>

        {/* Active Bookings Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
        <ActiveBookings setactivebookingNumber={setactivebookingNumber} />
        </div>
        
      </main>
      <Findparking/>
    </div>

  );
};



export default Dashboard;
