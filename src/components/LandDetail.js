import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LandDetail = () => {
  const location = useLocation();

  const { land } = location.state;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    `http://127.0.0.1:8000/${land.land_image_names[selectedImageIndex]}`
  );

  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setSelectedImage(`http://127.0.0.1:8000/${land.land_image_names[index]}`);
  };

  return (
    <>
      <div className="container mx-auto my-12 p-4 flex flex-wrap lg:flex-nowrap">
        <div className="flex flex-col w-full lg:w-1/2">
          {/* Main Product Image */}
          <div className="rounded-lg shadow-md mb-4 overflow-hidden">
            <img
              src={selectedImage}
              alt={`Product Image ${selectedImageIndex}`}
              className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex justify-center gap-2">
            {land.land_image_names.map((image, index) => (
              <button
                key={image}
                className={`rounded - lg overflow-hidden border-2 ${
                  index === selectedImageIndex
                    ? "border-green-500"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={`http://127.0.0.1:8000/${image}`}
                  alt={`Thumbnail ${index}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-12">
          <div className="flex flex-col items-start space-y-4">
            {/* Farm Details */}
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-green-600">LandOwner:</h1>
                <h1 className="text-3xl font-bold text-green-600 ml-2">
                  {land.land_owner_name}
                </h1>
              </div>
              <ul className="list-none space-y-1 text-lg">
                <li>
                  <strong>Size:</strong>
                  {land.land_size}
                </li>
                <li>
                  <strong>Address:</strong>
                  {land.street_address + land.city + land.province}
                </li>
                <li>
                  <strong>Available For:</strong>
                  {land.farmland_available_for}
                </li>
                <li>
                  <strong>Soil Type:</strong>
                  {land.type_of_soil}
                </li>
                <li>
                  <strong>Current Use:</strong>
                  {land.and_currently_being_used_for}
                </li>
                <li>
                  <strong>Facility & Equipment:</strong>
                  {land.facility_and_equipment}
                </li>
                <li>
                  <strong>Experience Needed:</strong>
                  {land.experience_needed}
                </li>
              </ul>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* {!isLandOwner && } */}
              <Button
                color="black"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={false}
                ripple="light"
              >
                Application Request
              </Button>

              <Button
                color="black"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={false}
                ripple="light"
              >
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandDetail;
