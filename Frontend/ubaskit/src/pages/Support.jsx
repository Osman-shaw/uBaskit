import { useState } from 'react';

const Support=()=> {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission with basic validation
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    // Handle form submission logic (e.g., API call)
    console.log('Support request submitted:', formData);
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    // Main container with light gray background
    <div className="bg-gray-50 h-auto lg:min-h-screen pb-10">
      {/* Constrained content wrapper */}
      <section className="mx-auto max-w-[1200px] px-8 md:px-5 lg:grid lg:grid-cols-3 lg:gap-x-2">
        {/* Contact information section */}
        <div className="lg:col-span-1 py-10 space-y-3">
          <h1 className="font-bold text-3xl text-slate-900">Contact Us</h1>
          <ul className="space-y-3 text-slate-500">
            <li>
              <address className="inline not-italic">
                229 Hangha Road, <br />
                kenema city, Eastern Province, <br />
                Sierra Leone.
              </address>
            </li>
            <li className="flex space-x-2 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <a href="tel:+233554153256" className="hover:text-slate-600">
                +233554153256
              </a>
            </li>
            <li className="flex space-x-2 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <a
                href="mailto:shawosman090@gmail.com"
                className="hover:text-slate-600"
              >
                shawosman26@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Form section */}
        <div className="lg:col-span-2 bg-white py-5 lg:pt-14 lg:pb-6 px-6 lg:px-10 rounded-lg shadow-lg">
          <h4 className="text-slate-600 font-medium text-sm">Send us a message</h4>
          <form noValidate onSubmit={handleSubmit}>
            {/* Form grid for inputs */}
            <div className="mt-5 grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-5">
              {/* First Name */}
              <div>
                <label className="block">
                  <span className="block font-medium text-sm text-slate-700">
                    First Name
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    className="block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John"
                  />
                  <p className="transition-opacity text-pink-500 text-xs font-light mt-1 h-2 opacity-0">
                    {/* Error message placeholder */}
                  </p>
                </label>
              </div>

              {/* Last Name */}
              <div>
                <label className="block">
                  <span className="block font-medium text-sm text-slate-700">
                    Last Name
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                  <p className="transition-opacity text-pink-500 text-xs font-light mt-1 h-2 opacity-0">
                    {/* Error message placeholder */}
                  </p>
                </label>
              </div>

              {/* Email */}
              <div>
                <label className="block">
                  <span className="block font-medium text-sm text-slate-700">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    className="block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1

                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                  <p className="transition-opacity text-pink-500 text-xs font-light mt-1 h-2 opacity-0">
                    {/* Error message placeholder */}
                  </p>
                </label>
              </div>

              {/* Phone */}
              <div>
                <label className="block">
                  <span className="block font-medium text-sm text-slate-700">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+233123456789"
                  />
                  <p className="transition-opacity text-pink-500 text-xs font-light mt-1 h-2 opacity-0">
                    {/* Error message placeholder */}
                  </p>
                </label>
              </div>

              {/* Subject */}
              <div className="md:col-span-2">
                <label className="block">
                  <span className="block font-medium text-sm text-slate-700">
                    Subject
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    className="block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your inquiry"
                  />
                  <p className="transition-opacity text-pink-500 text-xs font-light mt-1 h-2 opacity-0">
                    {/* Error message placeholder */}
                  </p>
                </label>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block">
                  <span className="block font-medium text-sm text-slate-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    className="block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your issue or question"
                  />
                  <p className="transition-opacity text-pink-500 text-xs font-light mt-1 h-2 opacity-0">
                    {/* Error message placeholder */}
                  </p>
                </label>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="rounded-full bg-blue-500 px-6 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
export default Support;