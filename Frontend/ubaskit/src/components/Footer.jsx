import uBaskit from '../assets/uBaskit.png'; // Replace with your logo path
import linkedin from '../assets/linkedin.png';
import twitter from '../assets/twitter.png';
import instagram from '../assets/instagram.jpeg';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md text-base py-[9px] px-[23px] sm:py-8 lg:py-12 transition duration-300 ease-in-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="mb-6 sm:mb-0">
            <img
              src={uBaskit}
              alt="uBaskit Logo"
              className="h-12 w-auto mb-4 rounded-full"
            />
            <p className="text-sm text-base max-w-xs">
              uBaskit simplifies utility payments electricity bills, TV subscriptions, airtime, internet, mobile data, flight tickets, and more.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-base hover:text-white">Home</a></li>
              <li><a href="/service" className="text-base hover:text-white">Services</a></li>
              <li><a href="/about" className="text-base hover:text-white">About Us</a></li>
              <li><a href="/support" className="text-base hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-base text-sm">Email: support@ubaskit.com</li>
              <li className="text-base text-sm">Phone: +232 73146157-UBASKIT</li>
              <li className="text-base text-sm">Address: 229 Hangha Road, Kenema City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={linkedin} alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={twitter} alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={instagram} alt="Instagram" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} uBaskit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

 