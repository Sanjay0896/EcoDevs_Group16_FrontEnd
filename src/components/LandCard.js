import { React, useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LandCard = ({ lands, onLandClick }) => {
  const navigate = useNavigate();
  // Construct the image path using the current image number
  console.log("bduhsyw", lands);
  let counter = 0;
  const incrementCount = () => {
    counter++;
  };

  return (
    <section className="bg-sky-50 p-5 lg:p-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lands.map((land) => (

            <div
              key={land.id}
              className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {incrementCount()}
              <a href="#">
                <img
                onClick={()=>{onLandClick(land)}}
                  className="w-full h-56 object-cover object-center"
                  src={`http://127.0.0.1:8000/${land.land_image_names[0]}`}
                  alt="A beautiful farm"
                />
              </a>
              <Link to={"/land-detail"} state={{ land }}>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {land.land_name}
                  </h5>
                  <p className="mb-2 font-normal text-gray-700 text-shadow-default">
                    <span className="font-semibold">City:</span> {land.city},
                    {land.province}
                  </p>
                  <p className="mb-2 font-normal text-gray-700 text-shadow-default">
                    <span className="font-semibold">Land Size:</span>{" "}
                    {land.land_size} Acre
                  </p>
                  <p className="mb-2 font-normal text-gray-700">
                    <span className="font-semibold">Available For:</span>{" "}
                    {land.farmland_available_for}
                  </p>
                  <p className="mb-4 font-normal text-gray-700">
                    <span className="font-semibold">Soil Type:</span>{" "}
                    {land.type_of_soil}
                  </p>
                  <Button variant="filled">
                    <Link to={"/land-detail"} state={{ land }}>
                      Read more
                    </Link>
                  </Button>
                </div>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandCard;
