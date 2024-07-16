import React from 'react';
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom"; 

const LandAgreementCard = ({ lands, onLandClick }) => {
  const navigate = useNavigate();


  return (
    <section className="bg-sky-50 p-5 lg:p-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lands.map((land) => (
              <div
                className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Agreement for Land: {land.landid}
                  </h5>
                  <p className="mb-2 font-normal text-gray-700 text-shadow-default">
                    <span className="font-semibold">Duration:</span> {land.agreement_duration}
                  </p>
                  <p className="mb-2 font-normal text-gray-700 text-shadow-default">
                    <span className="font-semibold">Start Date:</span> {land.agreement_starting_date}
                  </p>
                  <p className="mb-2 font-normal text-gray-700">
                    <span className="font-semibold">Facilities and Equipment:</span> {land.facility_and_equipment_agreed_to}
                  </p>
                  <p className="mb-4 font-normal text-gray-700">
                    <span className="font-semibold">Description:</span> {land.agreement_description}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandAgreementCard;