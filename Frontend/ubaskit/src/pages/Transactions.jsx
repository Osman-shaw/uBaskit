import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate backend
const addTransactionToBackend = (transaction) => {
  console.log('Sending transaction to backend:', transaction);
  return Promise.resolve({ success: true });
};

// Transaction types and sample fees
const transactionTypes = {
  'Wire Transfer': { fee: 5000, requiresBank: true },
  'ACH': { fee: 2000, requiresBank: true },
  'SLIPS/RTGS': { fee: 3000, requiresBank: true },
  'Bank Card': { fee: 1000, requiresCard: true },
  'Orange Money': { fee: 500, requiresMobile: true },
  'Afrimoney': { fee: 500, requiresMobile: true },
};

export default function Transaction({ onTransactionAdd }) {
  const [activeTab, setActiveTab] = useState('transaction');
  const [formData, setFormData] = useState({
    transactionType: '',
    senderName: '',
    senderAccount: '',
    senderSwift: '',
    senderMobile: '',
    recipientName: '',
    recipientAccount: '',
    recipientSwift: '',
    recipientMobile: '',
    amount: '',
    currency: 'SLL',
    purpose: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    billingAddress: '',
    idType: '',
    idNumber: '',
    email: '',
    pin: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  // Pre-fill mobile number for mobile money
  useEffect(() => {
    if (['Orange Money', 'Afrimoney'].includes(formData.transactionType) && formData.senderMobile) {
      setFormData((prev) => ({ ...prev, senderAccount: prev.senderMobile }));
    }
  }, [formData.senderMobile, formData.transactionType]);

  // Validate transaction information
  const validateTransactionInfo = () => {
    const newErrors = {};
    if (!formData.transactionType) {
      newErrors.transactionType = 'Select a transaction type';
    }
    if (!formData.senderName) {
      newErrors.senderName = 'Enter sender’s full name';
    }
    if (transactionTypes[formData.transactionType]?.requiresBank) {
      if (!formData.senderAccount.match(/^\d{10,}$/)) {
        newErrors.senderAccount = 'Enter a valid account number or IBAN';
      }
      if (formData.senderSwift && !formData.senderSwift.match(/^[A-Z0-9]{8,11}$/)) {
        newErrors.senderSwift = 'Enter a valid SWIFT/BIC code';
      }
    }
    if (transactionTypes[formData.transactionType]?.requiresMobile) {
      if (!formData.senderMobile.match(/^\+?\d{10,13}$/)) {
        newErrors.senderMobile = 'Enter a valid mobile number (e.g., +232123456789)';
      }
    }
    if (!formData.recipientName) {
      newErrors.recipientName = 'Enter recipient’s full name';
    }
    if (transactionTypes[formData.transactionType]?.requiresBank) {
      if (!formData.recipientAccount.match(/^\d{10,}$/)) {
        newErrors.recipientAccount = 'Enter a valid recipient account number or IBAN';
      }
      if (formData.recipientSwift && !formData.recipientSwift.match(/^[A-Z0-9]{8,11}$/)) {
        newErrors.recipientSwift = 'Enter a valid recipient SWIFT/BIC code';
      }
    }
    if (transactionTypes[formData.transactionType]?.requiresMobile) {
      if (!formData.recipientMobile.match(/^\+?\d{10,13}$/)) {
        newErrors.recipientMobile = 'Enter a valid recipient mobile number';
      }
    }
    if (!formData.amount.match(/^\d+(\.\d{1,2})?$/)) {
      newErrors.amount = 'Enter a valid amount (e.g., 1000.00)';
    }
    if (!formData.purpose) {
      newErrors.purpose = 'Enter purpose of payment';
    }
    if (!formData.idType) {
      newErrors.idType = 'Select ID type';
    }
    if (!formData.idNumber.match(/^[A-Z0-9]{6,}$/)) {
      newErrors.idNumber = 'Enter a valid ID number';
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
    if (formData.transactionType === 'Bank Card') {
      if (!formData.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        newErrors.cardExpiry = 'Enter valid expiry date (MM/YY)';
      }
      if (!formData.cardCVC.match(/^\d{3,4}$/)) {
        newErrors.cardCVC = 'Enter a valid 3-4 digit CVC';
      }
      if (!formData.billingAddress) {
        newErrors.billingAddress = 'Enter billing address';
      }
      if (!formData.otp.match(/^\d{6}$/)) {
        newErrors.otp = 'Enter a valid 6-digit OTP';
      }
    }
    if (['Orange Money', 'Afrimoney'].includes(formData.transactionType)) {
      if (!formData.pin.match(/^\d{4}$/)) {
        newErrors.pin = 'Enter a valid 4-digit PIN';
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
      ...(name === 'transactionType' ? { senderAccount: '', recipientAccount: '', cardNumber: '', pin: '', otp: '' } : {}),
    }));
  };

  // Handle Confirm button
  const handleConfirm = () => {
    if (validateTransactionInfo()) {
      setActiveTab('payment');
    }
  };

  // Handle Pay Now button
  const handlePayment = async () => {
    if (validatePaymentDetails()) {
      const transaction = {
        transactionId: `TXN${Math.floor(1000 + Math.random() * 9000)}`,
        transactionType: formData.transactionType,
        senderName: formData.senderName,
        senderAccount: formData.senderAccount || formData.senderMobile,
        recipientName: formData.recipientName,
        recipientAccount: formData.recipientAccount || formData.recipientMobile,
        amount: parseFloat(formData.amount) + (transactionTypes[formData.transactionType]?.fee || 0),
        currency: formData.currency,
        purpose: formData.purpose,
        email: formData.email,
        paymentMethod: formData.transactionType
          .replace('card', 'Credit/Debit Card')
          .replace('Orange Money', 'Orange Money')
          .replace('Afrimoney', 'Africell Money'),
        date: new Date().toISOString().split('T')[0],
        service: 'Transaction',
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
            Transactions with uBaskit
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Send money securely via bank, card, or mobile money.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
          {['Transaction Information', 'Payment Details', 'Receipt'].map((tab, index) => (
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
          {activeTab === 'transaction' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Transaction Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Transaction Type</label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  >
                    <option value="">Select Transaction Type</option>
                    {Object.keys(transactionTypes).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.transactionType && <p className="text-red-500 text-xs mt-1">{errors.transactionType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Sender’s Full Name</label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  />
                  {errors.senderName && <p className="text-red-500 text-xs mt-1">{errors.senderName}</p>}
                </div>
                {transactionTypes[formData.transactionType]?.requiresBank && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Sender’s Account Number/IBAN</label>
                      <input
                        type="text"
                        name="senderAccount"
                        value={formData.senderAccount}
                        onChange={handleInputChange}
                        placeholder="e.g., 1234567890"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.senderAccount && <p className="text-red-500 text-xs mt-1">{errors.senderAccount}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Sender’s SWIFT/BIC Code</label>
                      <input
                        type="text"
                        name="senderSwift"
                        value={formData.senderSwift}
                        onChange={handleInputChange}
                        placeholder="e.g., ECOCSLFR"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.senderSwift && <p className="text-red-500 text-xs mt-1">{errors.senderSwift}</p>}
                    </div>
                  </>
                )}
                {transactionTypes[formData.transactionType]?.requiresMobile && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Sender’s Mobile Number</label>
                    <input
                      type="text"
                      name="senderMobile"
                      value={formData.senderMobile}
                      onChange={handleInputChange}
                      placeholder="e.g., +232123456789"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    />
                    {errors.senderMobile && <p className="text-red-500 text-xs mt-1">{errors.senderMobile}</p>}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700">Recipient’s Full Name</label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    placeholder="e.g., Jane Smith"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  />
                  {errors.recipientName && <p className="text-red-500 text-xs mt-1">{errors.recipientName}</p>}
                </div>
                {transactionTypes[formData.transactionType]?.requiresBank && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Recipient’s Account Number/IBAN</label>
                      <input
                        type="text"
                        name="recipientAccount"
                        value={formData.recipientAccount}
                        onChange={handleInputChange}
                        placeholder="e.g., 0987654321"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.recipientAccount && <p className="text-red-500 text-xs mt-1">{errors.recipientAccount}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Recipient’s SWIFT/BIC Code</label>
                      <input
                        type="text"
                        name="recipientSwift"
                        value={formData.recipientSwift}
                        onChange={handleInputChange}
                        placeholder="e.g., ECOCSLFR"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.recipientSwift && <p className="text-red-500 text-xs mt-1">{errors.recipientSwift}</p>}
                    </div>
                  </>
                )}
                {transactionTypes[formData.transactionType]?.requiresMobile && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Recipient’s Mobile Number</label>
                    <input
                      type="text"
                      name="recipientMobile"
                      value={formData.recipientMobile}
                      onChange={handleInputChange}
                      placeholder="e.g., +232987654321"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.recipientMobile && <p className="text-red-500 text-xs mt-1">{errors.recipientMobile}</p>}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Amount (SLL)</label>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="e.g., 1000.00"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    />
                    {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Purpose of Payment</label>
                    <input
                      type="text"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      placeholder="e.g., Invoice #123"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    />
                    {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">ID Type</label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    >
                      <option value="">Select ID Type</option>
                      <option value="Passport">Passport</option>
                      <option value="National ID">National ID</option>
                    </select>
                    {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., ABC123456"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                    />
                    {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
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
                {formData.transactionType === 'Bank Card' && (
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
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Billing Address</label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="e.g., 123 Main St, Freetown"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
                    </div>
                  </>
                )}
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
                  {formData.transactionType === 'Bank Card' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700">3D Secure OTP</label>
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        placeholder="e.g., 123456"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                    </div>
                  )}
                  {['Orange Money', 'Afrimoney'].includes(formData.transactionType) && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700">PIN</label>
                      <input
                        type="password"
                        name="pin"
                        value={formData.pin}
                        onChange={handleInputChange}
                        placeholder="e.g., 1234"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                      />
                      {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
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
                    <p><strong>Transaction Type:</strong> {receipt.transactionType}</p>
                    <p><strong>Sender Name:</strong> {receipt.senderName}</p>
                    <p><strong>Sender Account/Mobile:</strong> {receipt.senderAccount}</p>
                    <p><strong>Recipient Name:</strong> {receipt.recipientName}</p>
                    <p><strong>Recipient Account/Mobile:</strong> {receipt.recipientAccount}</p>
                    <p><strong>Amount:</strong> {receipt.currency} {receipt.amount}</p>
                    <p><strong>Purpose:</strong> {receipt.purpose}</p>
                    <p><strong>Email:</strong> {receipt.email}</p>
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