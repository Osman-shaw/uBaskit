import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate backend
const addTransactionToBackend = (transaction) => {
  console.log('Sending transaction to backend:', transaction);
  return Promise.resolve({ success: true });
};

// Sierra Leone network providers and bundles
const networkBundles = {
  'Orange SL': [
    { name: 'Daily 10 MB', price: 450, validity: '1 day' },
    { name: 'Daily 35 MB', price: 1400, validity: '1 day' },
    { name: 'Daily 120 MB', price: 4500, validity: '1 day' },
    { name: 'Weekly 225 MB', price: 8400, validity: '7 days' },
    { name: 'Weekly 450 MB', price: 15000, validity: '7 days' },
    { name: 'Monthly 2 GB', price: 50000, validity: '30 days' },
    { name: 'Unlimited Night', price: 1000, validity: '1 night (0:00-6:00)' },
  ],
  'Africell SL': [
    { name: 'Daily 50 MB', price: 2000, validity: '1 day' },
    { name: 'Daily 100 MB', price: 3000, validity: '1 day' },
    { name: 'Weekly 500 MB', price: 10000, validity: '7 days' },
    { name: 'Monthly 1 GB', price: 20000, validity: '30 days' },
  ],
  'QCell': [
    { name: 'Qtok Tae Go 50 MB', price: 2000, validity: '1 day' },
    { name: 'Weekly 500 MB', price: 15000, validity: '7 days' },
    { name: 'Happy Hour (Unlimited)', price: 0, validity: 'Mon/Wed/Sat 12:00-13:00' },
  ],
  'Sierratel': [
    { name: 'Daily 50 MB', price: 2500, validity: '1 day' },
    { name: 'Weekly 200 MB', price: 10000, validity: '7 days' },
  ],
};

export default function Bundle({ onTransactionAdd }) {
  const [activeTab, setActiveTab] = useState('customer');
  const [formData, setFormData] = useState({
    networkProvider: '',
    bundlePackage: '',
    phoneNumber: '',
    notificationNumber: '',
    email: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    mobileMoneyNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  // Update notification number to match phone number by default
  useEffect(() => {
    if (formData.phoneNumber && !formData.notificationNumber) {
      setFormData((prev) => ({ ...prev, notificationNumber: prev.phoneNumber }));
    }
  }, [formData.phoneNumber, formData.notificationNumber]);

  // Validate customer information
  const validateCustomerInfo = () => {
    const newErrors = {};
    if (!formData.networkProvider) {
      newErrors.networkProvider = 'Select a network provider';
    }
    if (!formData.bundlePackage) {
      newErrors.bundlePackage = 'Select a bundle package';
    }
    if (!formData.phoneNumber.match(/^\+?\d{10,13}$/)) {
      newErrors.phoneNumber = 'Enter a valid phone number (e.g., +232123456789)';
    }
    if (!formData.notificationNumber.match(/^\+?\d{10,13}$/)) {
      newErrors.notificationNumber = 'Enter a valid notification number (e.g., +232123456789)';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment details
  const validatePaymentDetails = () => {
    const newErrors = {};
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Select a payment method';
    }
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        newErrors.cardExpiry = 'Enter valid expiry date (MM/YY)';
      }
      if (!formData.cardCVC.match(/^\d{3}$/)) {
        newErrors.cardCVC = 'Enter a valid 3-digit CVC';
      }
    }
    if (['orange_money', 'africell_money'].includes(formData.paymentMethod)) {
      if (!formData.mobileMoneyNumber.match(/^\+?\d{10,13}$/)) {
        newErrors.mobileMoneyNumber = 'Enter a valid mobile money phone number';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'networkProvider' ? { bundlePackage: '' } : {}), // Reset bundle when provider changes
    }));
  };

  // Handle Confirm button
  const handleConfirm = () => {
    if (validateCustomerInfo()) {
      setFormData((prev) => ({ ...prev, mobileMoneyNumber: prev.notificationNumber }));
      setActiveTab('payment');
    }
  };

  // Handle Pay Now button
  const handlePayment = async () => {
    if (validatePaymentDetails()) {
      const selectedBundle = networkBundles[formData.networkProvider]?.find(
        (bundle) => bundle.name === formData.bundlePackage
      );
      const transaction = {
        transactionId: `TXN${Math.floor(1000 + Math.random() * 9000)}`,
        networkProvider: formData.networkProvider,
        bundlePackage: formData.bundlePackage,
        phoneNumber: formData.phoneNumber,
        notificationNumber: formData.notificationNumber,
        email: formData.email,
        amount: selectedBundle ? selectedBundle.price : 0,
        paymentMethod: formData.paymentMethod
          .replace('card', 'Credit/Debit Card')
          .replace('bank', 'Bank Transfer')
          .replace('orange_money', 'Orange Money')
          .replace('africell_money', 'Africell Money'),
        date: new Date().toISOString().split('T')[0],
        service: 'Data',
        status: 'Completed',
      };
      setReceipt(transaction);
      await addTransactionToBackend(transaction);
      onTransactionAdd(transaction);
      setActiveTab('receipt');
      setTimeout(() => {
        navigate('/service');
      }, 3000);
    }
  };

  // Handle Cancel button
  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-10">
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="py-8 sm:py-10 text-center space-y-3 md:max-w-3xl md:mx-auto">
          <div className="flex justify-center">
            <svg
              className="h-10 w-auto text-blue-600 sm:h-12 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Purchase Data with uBaskit
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Get connected with fast and reliable internet bundles.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
          {['Customer Information', 'Payment Details', 'Receipt'].map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm sm:text-base font-semibold text-center transition-all duration-300 ${
                activeTab === tab.toLowerCase().split(' ').join('')
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              } sm:flex-1`}
              onClick={() => setActiveTab(tab.toLowerCase().split(' ').join(''))}
              disabled={
                (index === 1 && activeTab !== 'payment' && !receipt) ||
                (index === 2 && !receipt)
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300">
          {activeTab === 'customer' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Network Provider</label>
                  <select
                    name="networkProvider"
                    value={formData.networkProvider}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  >
                    <option value="">Select Network Provider</option>
                    {Object.keys(networkBundles).map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                  {errors.networkProvider && <p className="text-red-500 text-xs mt-1">{errors.networkProvider}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Bundle Package</label>
                  <select
                    name="bundlePackage"
                    value={formData.bundlePackage}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    disabled={!formData.networkProvider}
                  >
                    <option value="">Select Bundle Package</option>
                    {formData.networkProvider &&
                      networkBundles[formData.networkProvider]?.map((bundle) => (
                        <option key={bundle.name} value={bundle.name}>
                          {`${bundle.name} (SLL ${bundle.price}, ${bundle.validity})`}
                        </option>
                      ))}
                  </select>
                  {errors.bundlePackage && <p className="text-red-500 text-xs mt-1">{errors.bundlePackage}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +232123456789"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Notification Number</label>
                  <input
                    type="text"
                    name="notificationNumber"
                    value={formData.notificationNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +232123456789"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  />
                  {errors.notificationNumber && <p className="text-red-500 text-xs mt-1">{errors.notificationNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., user@example.com"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <button
                  onClick={handleConfirm}
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-slate-900 rounded-lg hover:scale-105 transition-all duration-300 shadow-md mt-2 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Payment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="orange_money">Orange Money</option>
                    <option value="africell_money">Africell Money</option>
                  </select>
                  {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
                </div>
                {formData.paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., 1234567890123456"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="e.g., 12/24"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">CVC</label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="e.g., 123"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.cardCVC && <p className="text-red-500 text-xs mt-1">{errors.cardCVC}</p>}
                    </div>
                  </>
                )}
                {['orange_money', 'africell_money'].includes(formData.paymentMethod) && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Mobile Money Phone Number</label>
                    <input
                      type="text"
                      name="mobileMoneyNumber"
                      value={formData.mobileMoneyNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., +232123456789"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    />
                    {errors.mobileMoneyNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileMoneyNumber}</p>}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Pay Now
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-slate-900 rounded-lg hover:scale-105 transition-all duration-300 shadow-md mt-2 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'receipt' && receipt && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Payment Receipt</h2>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6 shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Transaction Details</h3>
                <div className="mt-4 space-y-2 text-sm sm:text-base text-slate-600">
                  <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
                  <p><strong>Network Provider:</strong> {receipt.networkProvider}</p>
                  <p><strong>Bundle Package:</strong> {receipt.bundlePackage}</p>
                  <p><strong>Phone Number:</strong> {receipt.phoneNumber}</p>
                  <p><strong>Notification Number:</strong> {receipt.notificationNumber}</p>
                  <p><strong>Email:</strong> {receipt.email}</p>
                  <p><strong>Amount:</strong> SLL {receipt.amount}</p>
                  <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
                  <p><strong>Date:</strong> {receipt.date}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    Print Receipt
                  </button>
                  <button
                    onClick={() => navigate('/admin/transactions')}
                    className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-slate-900 rounded-lg hover:scale-105 transition-all duration-300 shadow-md mt-2 sm:mt-0"
                  >
                    View Transactions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}