import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate sending data to backend
const addTransactionToBackend = (transaction) => {
  console.log('Sending transaction to backend:', transaction);
  return Promise.resolve({ success: true });
};

// Sierra Leone network providers
const networkProviders = ['Orange SL', 'Africell SL', 'QCell', 'Sierratel'];

export default function Airtime({ onTransactionAdd }) {
  const [activeTab, setActiveTab] = useState('customer');
  const [formData, setFormData] = useState({
    networkProvider: '',
    phoneNumber: '',
    amount: '',
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

  // Validate customer information
  const validateCustomerInfo = () => {
    const newErrors = {};
    if (!formData.networkProvider) {
      newErrors.networkProvider = 'Select a network provider';
    }
    if (!formData.phoneNumber.match(/^\+?\d{10,13}$/)) {
      newErrors.phoneNumber = 'Enter a valid phone number (e.g., +232123456789)';
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Enter a valid amount greater than 0';
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
    setFormData({ ...formData, [name]: value });
  };

  // Handle Confirm button
  const handleConfirm = () => {
    if (validateCustomerInfo()) {
      setFormData((prev) => ({ ...prev, mobileMoneyNumber: prev.phoneNumber }));
      setActiveTab('payment');
    }
  };

  // Handle Pay Now button
  const handlePayment = async () => {
    if (validatePaymentDetails()) {
      const transaction = {
        transactionId: `TXN${Math.floor(1000 + Math.random() * 9000)}`,
        networkProvider: formData.networkProvider,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        amount: formData.amount,
        paymentMethod: formData.paymentMethod
          .replace('card', 'Credit/Debit Card')
          .replace('bank', 'Bank Transfer')
          .replace('orange_money', 'Orange Money')
          .replace('africell_money', 'Africell Money'),
        date: new Date().toISOString().split('T')[0],
        service: 'Airtime',
        status: 'Completed',
      };
      setReceipt(transaction);
      await addTransactionToBackend(transaction);
      onTransactionAdd(transaction);
      setActiveTab('receipt');
      setTimeout(() => {
        navigate('/airtime');
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
              className="h-10 w-auto text-blue-600 sm:h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Purchase Airtime with uBaskit
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Top up your mobile airtime quickly and securely.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
          {['Customer Information', 'Payment Details', 'Receipt'].map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm sm:text-base font-medium text-center ${
                activeTab === tab.toLowerCase().split(' ').join('')
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
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

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {activeTab === 'customer' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Network Provider</label>
                  <select
                    name="networkProvider"
                    value={formData.networkProvider}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Network Provider</option>
                    {networkProviders.map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                  {errors.networkProvider && <p className="text-red-500 text-xs mt-1">{errors.networkProvider}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +232123456789"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Amount (SLL)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="e.g., 10000"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., user@example.com"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <button
                  onClick={handleConfirm}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-slate-900 rounded-lg hover:bg-gray-400 transition-colors mt-2 sm:mt-0"
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
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.mobileMoneyNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileMoneyNumber}</p>}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Pay Now
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-slate-900 rounded-lg hover:bg-gray-400 transition-colors mt-2 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'receipt' && receipt && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Payment Receipt</h2>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Transaction Details</h3>
                <div className="mt-4 space-y-2 text-sm sm:text-base text-slate-600">
                  <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
                  <p><strong>Network Provider:</strong> {receipt.networkProvider}</p>
                  <p><strong>Phone Number:</strong> {receipt.phoneNumber}</p>
                  <p><strong>Email:</strong> {receipt.email}</p>
                  <p><strong>Amount:</strong> SLL {receipt.amount}</p>
                  <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
                  <p><strong>Date:</strong> {receipt.date}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Print Receipt
                  </button>
                  <button
                    onClick={() => navigate('/admin/transactions')}
                    className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-slate-900 rounded-lg hover:bg-gray-400 transition-colors mt-2 sm:mt-0"
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