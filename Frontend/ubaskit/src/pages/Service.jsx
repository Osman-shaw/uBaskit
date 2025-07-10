import { Link } from 'react-router-dom';
import electricity from '../assets/electricity.png'; // Replace with electricity bill image
import tv from '../assets/tv.png'; // Replace with TV subscription image
import money from '../assets/money.png'; // Replace with airtime image
import flight from '../assets/flight.png'; // Replace with internet & mobile data image
import Airtime from '../assets/Airtime.png'; // Replace with flight tickets image
import data from '../assets/data.png'; // Replace with transaction image

const Service=()=>{
  // Define services data with title, image, and route
  const services = [
    {
      title: 'Electricity Bills',
      image: electricity,
      route: '/service/electricity-bills',
    },
    {
      title: 'TV Subscriptions',
      image: tv,
      route: '/service/tv-subscriptions',
    },
    {
      title: 'Airtime',
      image: Airtime,
      route: '/service/airtime',
    },
    {
      title: 'Internet & Mobile Data',
      image: data,
      route: '/service/internet-mobile-data',
    },
    {
      title: 'Flight Tickets',
      image: flight,
      route: '/service/flight-tickets',
    },
    {
      title: 'Transactions',
      image: money,
      route: '/services/transactions',
    },
  ];

  return (
    // Main container with light gray background
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Constrained content wrapper */}
      <section className="mx-auto max-w-[1200px] px-8 md:px-5">
        {/* Header Section */}
        <header className="py-10 text-center space-y-3 md:max-w-3xl md:mx-auto">
          <div className="flex justify-center">
            <svg
              className="h-12 w-auto text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Our Services at uBaskit
          </h1>
          <p className="text-slate-600 text-base lg:text-lg">
            Discover hassle-free solutions with uBaskit, your one-stop platform for paying electricity bills, TV subscriptions, airtime, internet & mobile data, flight tickets, and transactions with ease.
          </p>
        </header>

        {/* Services Section: Six Clickable Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.route}
              className="rounded-lg bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900 text-center">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Service;