import React from "react";
import { Button } from "@material-tailwind/react";

const ApplicationCard = ({ application, farmerName, onAccept, onIgnore, onOpenFarmerProfile }) => {
  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  let isLandOwner = false;
  if (storedDBData) {
    isLandOwner = storedDBData.designation === "L";
  }

  const status = application.status;


  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg flex items-center justify-between p-4 transition-transform transform hover:scale-105">
      <div className="flex items-center">
        <img
          className="w-11 h-11 rounded-full mr-4"
          src="img/profile.webp"
          alt="Avatar"
        />
        <div>
          <div onClick={() => { onOpenFarmerProfile(application.farmer) }} className="text-sm">
            Land application from <strong>{farmerName}</strong>
            <span className="font-semibold"></span>
          </div>
        </div>
      </div>
      <div className="flex">

        {status === "Pending" && isLandOwner && (
          <Button
            color="green"
            buttonType="filled"
            size="regular"
            rounded={true}
            onClick={() => {
              console.log(
                "app clicked",
                application.landowner,
                application.farmer,
                application.landid
              );
              onAccept(
                application.id,
                application.landowner,
                application.farmer,
                application.landid
              );
            }}
            block={false}
            iconOnly={false}
            ripple="light"
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded transition-shadow duration-300 hover:shadow-lg mr-2"
          >
            Accept
          </Button>
        )}

        {status === "Pending" && <Button
          color="Red"
          buttonType="filled"
          size="regular"
          rounded={true}
          onClick={() => onIgnore(application.id)}
          block={false}
          iconOnly={false}
          ripple="light"
          className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded transition-shadow duration-300 hover:shadow-lg"
        >
          {isLandOwner ? "Reject" : "Withdraw"}
        </Button>}


      </div>
    </div>
  );
};

export default ApplicationCard;