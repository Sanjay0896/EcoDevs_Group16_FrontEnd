import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

const ContactUs = () => {
  return (
    <div className="bg-sky-300 p-10">
      <div className="container mx-auto">
        <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg md:flex md:items-start">

          <div className="md:w-1/2 mb-6 md:mb-0 p-6">
            <div className="mb-6 flex justify-center md:justify-start">
              <img
                src="img/ContactUs.jpg"
                alt="EcoDevs Team"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Connect with EcoDevs</h2>
            <p className="text-gray-600 mb-4">Your Partner in Agri-Innovation</p>
            <p className="text-gray-600 mb-6">At the crossroads of tradition and innovation, EcoDevs is cultivating a future where land meets its full potential. We bridge the gap between Canadian landowners and dynamic farmers, offering a suite of services that propel productivity and sustainability.

              With our platform, idle lands are turned into thriving fields, and digital storage solutions safeguard the harvest. Market insights guide farmers towards the most profitable crops, contributing to a robust food system aligned with the goal of zero hunger.</p>
            <p className="text-lg font-semibold mb-2">Interested in partnering or exploring opportunities? Let's make growth happen.</p>
            <div className="flex justify-center md:justify-start space-x-4">
            </div>
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-start">
            <form className="flex flex-col space-y-4">
              <input type="text" placeholder="NAME" className="mb-4 p-4 border rounded-lg" />
              <input type="email" placeholder="EMAIL" className="mb-4 p-4 border rounded-lg" />
              <input type="tel" placeholder="PHONE NUMBER" className="mb-4 p-4 border rounded-lg" />
              <input type="text" placeholder="SUBJECT" className="mb-4 p-4 border rounded-lg" />
              <textarea placeholder="MESSAGE" className="mb-4 p-4 border rounded-lg" rows="4"></textarea>
              <button type="submit" className="bg-teal-500 text-white p-4 rounded-lg shadow-lg hover:bg-teal-600 transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;