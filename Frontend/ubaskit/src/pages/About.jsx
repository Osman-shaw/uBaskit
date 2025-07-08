import { useState } from 'react';
import lady from '../assets/lady.jpg'; // Replace with your team image
//import software from "../assets/software.jpeg"; // Replace with founder 1 image
import team from "../assets/team.jpg"// Replace with founder 2 image

const About=()=>{
  // Placeholder for any interactive state (e.g., hover effects), not used here but included for extensibility
  const [hovered, setHovered] = useState(null);

  return (
    // Main container with light gray background
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Constrained content wrapper */}
      <section className="mx-auto max-w-[1200px] px-8 md:px-5 space-y-12">
        {/* Header Section: Why We Built This Solution */}
        <div className="py-10 text-center">
          <h1 className="font-bold text-3xl text-slate-900">
                  uBaskit: Simplifying Your Payments
          </h1>
          <p className="mt-4 text-slate-600 text-base max-w-2xl mx-auto">
            Our conviction to build this solution stems from a passion to revolutionize how people struggle and the incoviences consumers face in purchasing utility services.
          </p>
        </div>

        {/* Team Section: Single Card with Team Image */}
        <div className="space-y-4">
          <h2 className="font-bold text-2xl text-slate-900 text-center">
            Our Team
          </h2>
          <div className="rounded-lg bg-white shadow-lg overflow-hidden">
            <img
              src={team}
              alt="Our Team"
              className="w-full h-full sm:h-80 object-fit cover"
            />
          </div>
        </div>

        {/* Mission & Vision Section: Two Cards */}
        <div className="space-y-3">
          <h2 className="font-bold text-2xl text-slate-900 text-center">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mission Card */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="font-semibold text-lg text-slate-900">Our Mission</h3>
              <p className="mt-2 text-slate-600 text-sm">
                To deliver innovative, energy-efficient solutions that empower individuals and businesses to thrive in a connected world, fostering sustainability and accessibility for all.
              </p>
            </div>
            {/* Vision Card */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="font-semibold text-lg text-slate-900">Our Vision</h3>
              <p className="mt-2 text-slate-600 text-sm">
                To be the global leader in energy-driven technology, creating a future where every connection is powered by sustainable innovation and limitless possibilities.
              </p>
            </div>
          </div>
        </div>

        {/* Founders Section: Two Cards */}
        <div className="space-y-3">
          <h2 className="font-bold text-2xl text-slate-900 text-center">
            Our Founders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Founder 1 Card */}
            <div
              className="rounded-lg bg-white shadow-lg p-6 flex flex-col items-center text-center"
              onMouseEnter={() => setHovered(1)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={lady}
                alt="Founder 1"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-lg text-slate-900">John Kofi Doe</h3>
              <p className="text-sm text-slate-600">Chief Executive Officer (CEO)</p>
              <div className="flex space-x-3 mt-3">
                <a
                  href="https://twitter.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-500 hover:text-blue-600 transition-colors ${hovered === 1 ? 'scale-110' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-500 hover:text-blue-600 transition-colors ${hovered === 1 ? 'scale-110' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    />
                    <circle cx="4" cy="4" r="2" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Founder 2 Card */}
            <div
              className="rounded-lg bg-white shadow-lg p-6 flex flex-col items-center text-center"
              onMouseEnter={() => setHovered(2)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={lady}
                alt="Founder 2"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
               <h3 className="font-semibold text-lg text-slate-900">Jane Ama Smith</h3>
               <p className="text-sm text-slate-600">Chief Technology Officer (CTO)</p>
              <div className="flex space-x-3 mt-3">
                <a
                  href="https://twitter.com/janesmith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-500 hover:text-blue-600 transition-colors ${hovered === 2 ? 'scale-110' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/janesmith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-500 hover:text-blue-600 transition-colors ${hovered === 2 ? 'scale-110' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    />
                    <circle cx="4" cy="4" r="2" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;