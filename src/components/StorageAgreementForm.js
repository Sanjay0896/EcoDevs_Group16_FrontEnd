import React, { useState, useEffect } from "react";

const vehicleOptions = [
  { name: "Mini Van", pricePerKm: 12 },
  { name: "Van", pricePerKm: 15 },
  { name: "Truck", pricePerKm: 17 },
];

const StorageAgreementForm = ({ marker, onSuccess }) => {
  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  console.log("Harsh", storedDBData);
  const [formData, setFormData] = useState({
    firstName: storedDBData.user.first_name,
    lastName: storedDBData.user.last_name,
    email: storedDBData.user.email,
    address: marker ? marker.street_address : "",
    pickupAddress: "",
    cropName: marker ? marker.crop_type : "",
    total_cost: 0,
    weight: "",
    areaNeeded: "",
    needVehicle: false,
    vehicleType: "",
    pickupDateTime: "",
    distance: "",
  });
  const [storageCost, setStorageCost] = useState(0);
  const [vehicleCost, setVehicleCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cost = formData.areaNeeded ? Number(formData.areaNeeded) * 15 : 0;
    setStorageCost(cost);

    if (formData.needVehicle && formData.vehicleType) {
      const vehicle = vehicleOptions.find(
        (v) => v.name === formData.vehicleType
      );
      const vehicleCostCalculation = formData.distance
        ? Number(formData.distance) * vehicle.pricePerKm
        : 0;
      setVehicleCost(vehicleCostCalculation);
    } else {
      setVehicleCost(0);
    }
  }, [formData]);

  useEffect(() => {
    setTotalCost(storageCost + vehicleCost);
  }, [storageCost, vehicleCost]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: "9028978675",
      address: formData.address,
      crop_name: formData.cropName,
      weight: formData.weight,
      area_needed: formData.areaNeeded,
      need_vehicle: formData.needVehicle,
      vehicle_type: formData.vehicleType,
      total_cost: totalCost,
    };


    if (formData.pickupAddress) {
        apiPayload.pickup_address = formData.pickupAddress;
      }
      if (formData.pickupDateTime) {
        apiPayload.pickup_date_time = formData.pickupDateTime;
      }
      if (formData.distance) {
        apiPayload.distance = formData.distance;
      }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/storage-application/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        onSuccess();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            {/* <div>
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="555-123-4567" required />
                        </div> */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1234 Main St"
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-5 text-gray-900">
            Crop Details
          </h2>
          <div className="grid gap-6 mb-6">
            <div>
              <label
                htmlFor="cropName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Crop Name
              </label>
              <input
                type="text"
                id="cropName"
                name="cropName"
                value={formData.cropName}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Wheat"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Approx Weight (tons)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="20"
                required
              />
            </div>
            <div>
              <label
                htmlFor="areaNeeded"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Area Needed (ft³)
              </label>
              <input
                type="number"
                id="areaNeeded"
                name="areaNeeded"
                value={formData.areaNeeded}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="$15 per ft³"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Approx Cost to Store: ${storageCost}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="needVehicle"
                type="checkbox"
                name="needVehicle"
                checked={formData.needVehicle}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="needVehicle"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Need Vehicle for Transport?
              </label>
            </div>
            {formData.needVehicle && (
              <>
                <div>
                  <label
                    htmlFor="vehicleType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select Vehicle</option>
                    {vehicleOptions.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name} (${option.pricePerKm}/km)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="distance"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    id="distance"
                    name="distance"
                    value={formData.distance}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter distance in km"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Vehicle Cost: ${vehicleCost}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="pickupDateTime"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pickup Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    id="pickupDateTime"
                    name="pickupDateTime"
                    value={formData.pickupDateTime}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </>
            )}

            <div className="mt-6">
            <p className="text-lg font-semibold text-gray-900" >
                Total Cost: ${totalCost}
              </p>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StorageAgreementForm;
