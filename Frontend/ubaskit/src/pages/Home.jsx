import { FaGooglePlay, FaApple } from 'react-icons/fa';
import collections from "../assets/collections.jpg";
import lady from "../assets/lady.jpg";
import EDSALogo from '../assets/logo.EDSA.jpeg';
import StartimeLogo from '../assets/logo.Startime.png';
import DstvLogo from '../assets/logo.Dstv.png';
import OrangeLogo from '../assets/logo.Orange.jpeg';
import AfricellLogo from '../assets/logo.Africell.png';
import QcellLogo from '../assets/logo.Qcell.png';
import VisaLogo from '../assets/logo.visa.jpeg';
import MasterLogo from '../assets/logo.Master.png';

const Home=()=> {

    const stats = [
    {
      label: 'Bills Paid Daily',
      value: '44,000+',
      description: 'Electricity, TV, and internet bills processed every 24 hours.',
    },
    {
      label: 'Airtime & Data Transactions',
      value: '$12M+',
      description: 'Total value of airtime and mobile data purchased monthly.',
    },
    {
      label: 'Active Users',
      value: '46,000+',
      description: 'New users joining annually to pay utilities and book flights.',
    },
  ];


 const logos = [
  { src: EDSALogo, alt:'EDSA' },
  { src: StartimeLogo, alt: 'Startime TV' },
  { src: DstvLogo, alt:'Dstv' },
  { src: OrangeLogo, alt:'Orange SL' },
  { src: AfricellLogo, alt:'Africall' },
  { src: QcellLogo, alt: 'Qcell SL' },
  { src: VisaLogo, alt: 'Visa' },
  { src: MasterLogo, alt: 'Master' },
];

   


  return (
     <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to<span className="text-blue-900"> uBaskit</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              uBaskit is a platform, that enable Customers pay Electricity Bills,
              TV subcriptios, Buy Airtime, pay Internet & Mobile Data, flight tickets and settle transactions with ease.
            </p>
            {/* App Store Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-5">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-48 h-13s bg-black text-white font-light rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
                aria-label="Download DataMart on Google Play Store"
              >
                <FaGooglePlay className="mr-2 text-xl " />
                <span className=''>
                  Get it on <br />
                  <span className="font-semibold ">Google Play</span>
                </span>
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-48 h-13 bg-black text-white font-light rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
                aria-label="Download DataMart on Apple App Store"
              >
                <FaApple className="mr-2 text-xl" />
                <span className='text-sm'>
                  Download on the <br />
                  <span className="font-semibold">App Store</span>
                </span>
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="mt-8 md:mt-0">
            <img
              src={collections}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="DataMart app interface preview"
              loading="lazy"
             />
           </div>
         </div>    
               {/* section for stats */}
         <section className="bg-indigo-700 py-[9px] px-2 sm:px-4 lg:px-6 transition duration-300 ease-in-out rounded-lg shadow mt-8">
        <div className="container mx-auto max-w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Simplify Your Payments with <span className="text-indigo-300">uBaskit</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-indigo-200 max-w-2xl mx-auto">
            uBaskit is your one-stop platform for paying electricity bills, TV subscriptions, airtime, internet, mobile data, flight tickets, and settle transactions with ease and reliability.
          </p>
         </div>
         <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="mx-auto flex max-w-sm w-full flex-col gap-y-4 bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <dt className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">{stat.label}</dt>
              <dd className="order-first text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black">
                {stat.value}
              </dd>
              <p className="text-xs sm:text-sm text-gray-700">{stat.description}</p>
            </div>
          ))}
        </div>
        </div>
       </section>   
            {/* section for services */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center mt-12">
             {/* Image */}
           <div className="order-first md:order-first">
            <img
              src={lady}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full shadow-lg mx-auto md:mx-0 object-cover object-center"
              alt="uBaskit app interface preview"
              loading="lazy"
            />
          </div>
          {/* Text Content */}
          <div className="text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Our <span className="text-indigo-900">Service</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              uBaskit is a Empowering Your Digital Lifestyle: Seamless Payments, Limitless Connectivity.Your Solution for Electricity, Data, Airtime, Cable TV, and Data purchase etc. Where Convenience Meets Connectivity
              </p>
          </div>
        </div>
         {/* our patners */}
         <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
          Our Trusted Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
           {logos.map((logo,index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300 ease-in-out flex items-center justify-center flex-col"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 w-auto object-contain mb-2"
              />
            </div>
          ))}
        </div>
      </div>
      </section>
      </div>

      
    </div>
  )
}

export default Home   
