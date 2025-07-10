import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import uBaskit from '../assets/uBaskit.png'; // Replace with your logo path
import { FaBars, FaTimes, FaTachometerAlt, FaMobileAlt, FaTv, FaPlane, FaBolt, FaMoneyBillWave, FaCog } from 'react-icons/fa';

const AdminDashboard=()=> {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data for widgets and table
  const serviceMetrics = [
    { title: 'Data Sales', value: '₦12.5M', icon: <FaMobileAlt className="text-indigo-900" />, route: '/admin/data' },
    { title: 'Airtime Sales', value: '₦8.3M', icon: <FaMobileAlt className="text-indigo-900" />, route: '/admin/airtime' },
    { title: 'TV Subscriptions', value: '₦4.2M', icon: <FaTv className="text-indigo-900" />, route: '/admin/tv' },
    { title: 'Flight Tickets', value: '₦15.7M', icon: <FaPlane className="text-indigo-900" />, route: '/admin/flights' },
    { title: 'Electricity Payments', value: '₦9.8M', icon: <FaBolt className="text-indigo-900" />, route: '/admin/electricity' },
    { title: 'Transactions', value: '₦50.5M', icon: <FaMoneyBillWave className="text-indigo-900" />, route: '/admin/transactions' },
  ];

  const transactions = [
    { id: 'TXN001', service: 'Electricity', amount: '₦5,000', status: 'Completed', date: '2025-07-09' },
    { id: 'TXN002', service: 'Airtime', amount: '₦1,000', status: 'Pending', date: '2025-07-09' },
    { id: 'TXN003', service: 'Flight Ticket', amount: '₦120,000', status: 'Failed', date: '2025-07-08' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center space-x-2">
          <img src={uBaskit} alt="uBaskit Logo" className="h-10 w-auto rounded-full" />
          <h2 className="text-xl font-bold text-slate-900">uBaskit Admin</h2>
        </div>
        <nav className="mt-10 space-y-5">
          {[
            { name: 'Dashboard', icon: <FaTachometerAlt  className="text-gray-600"/>, to: '/admin' },
            { name: 'Data', icon: <FaMobileAlt className="text-gray-600" />, to: '/admin/data' },
            { name: 'Transactions', icon: <FaMoneyBillWave  className="text-gray-600"/>, to: '/admin/transactions' },
            { name: 'Airtime', icon: <FaMobileAlt className="text-gray-600" />, to: '/admin/airtime' },
            { name: 'Tv Subcription', icon: <FaTv className="text-gray-600" />, to: '/admin/tv' },
            { name: 'Flight', icon: <FaPlane className="text-gray-600" />, to: '/admin/ticket' },
            { name: 'Electricity', icon: <FaBolt className="text-gray-600" />, to: '/admin/electricity' },
            { name: 'Settings', icon: <FaCog className="text-gray-600" />, to: '/admin/settings' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center px-4 py-2 text-slate-700 hover:bg-blue-100 hover:text-blue-600"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-40">
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search transactions, data..."
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-slate-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* Metrics Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {serviceMetrics.map((metric, index) => (
              <Link
                key={index}
                to={metric.route}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-5 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{metric.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{metric.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base">{metric.value}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Transaction History Table */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b text-slate-700">
                    <th className="p-2 sm:p-3">ID</th>
                    <th className="p-2 sm:p-3">Service</th>
                    <th className="p-2 sm:p-3">Amount</th>
                    <th className="p-2 sm:p-3">Status</th>
                    <th className="p-2 sm:p-3">Date</th>
                    <th className="p-2 sm:p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b">
                      <td className="p-2 sm:p-3">{txn.id}</td>
                      <td className="p-2 sm:p-3">{txn.service}</td>
                      <td className="p-2 sm:p-3">{txn.amount}</td>
                      <td className="p-2 sm:p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            txn.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : txn.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3">{txn.date}</td>
                      <td className="p-2 sm:p-3">
                        <button className="text-blue-600 hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Outlet for Nested Routes */}
      <Outlet />
    </div>
  );
}
export default AdminDashboard;