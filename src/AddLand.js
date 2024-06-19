import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

const AddLand = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    address: "",
    streetAddress: "",
    city: "",
    province: "",
    landSize: "",
    availableFor: "",
    soilType: "",
    currentUsage: "",
    facilities: "",
    experienceNeeded: "",
    isActive: true,
    files: [],
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newUploadedFiles = [...uploadedFiles, ...files];
    setUploadedFiles(newUploadedFiles); // Store uploaded files
    const filePreviews = newUploadedFiles.map((file) => URL.createObjectURL(file));
    setImagePreview(filePreviews); // Generate and store URLs for preview
  };

  const handleRemoveImage = (indexToRemove) => {
    setUploadedFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToRemove));
    setImagePreview(currentPreviews => currentPreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted", formState, uploadedFiles);
  };
  // Additional input fields can be added here in similar fashion to the existing ones.
  // ...
  return (
    <div className="container mx-auto p-4">
      <div className="bg-sky-300 p-6 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-5 text-center">ADD YOUR POST</h2>
        <div className="flex flex-col md:flex-row -mx-3">
          <div className="w-full md:w-1/2 px-3">
            <form onSubmit={handleSubmit}>
              {/* All your form fields here */}
              {/* ... */}
              <div className="mb-4">
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Landowner name
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  placeholder="Street Address"
                  value={formState.streetAddress}
                  onChange={handleInputChange}
                />
              </div>

              {/* Street Address Input */}

              <div className="mb-4">
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Street Address
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  placeholder="Street Address"
                  value={formState.streetAddress}
                  onChange={handleInputChange}
                />
              </div>

              {/* City Input */}
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  City
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formState.city}
                  onChange={handleInputChange}
                />
              </div>

              {/* Province Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="province"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Province
                </label>
                <select
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formState.province}
                  onChange={handleInputChange}
                >
                  <option value="">Select Province</option>
                  {/* Populate this with actual province options */}
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  {/* ...other options */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Land size
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  placeholder="Land size"
                  value={formState.streetAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="province"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Farm land available for
                </label>
                <select
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formState.province}
                  onChange={handleInputChange}
                >
                  <option value="">Available for </option>
                  {/* Populate this with actual province options */}
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  {/* ...other options */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="province"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type Of Soil
                </label>
                <select
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formState.province}
                  onChange={handleInputChange}
                >
                  <option value="">Type Of Soil</option>
                  {/* Populate this with actual province options */}
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  {/* ...other options */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="province"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Current Use Of Land
                </label>
                <select
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formState.province}
                  onChange={handleInputChange}
                >
                  <option value="">Current Use Of Land</option>
                  {/* Populate this with actual province options */}
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  {/* ...other options */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="province"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Facilities and Equipment
                </label>
                <select
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formState.province}
                  onChange={handleInputChange}
                >
                  <option value="">Facilities and Equipment</option>
                  {/* Populate this with actual province options */}
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  {/* ...other options */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="province"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Experience needed
                </label>
                <select
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formState.province}
                  onChange={handleInputChange}
                >
                  <option value="">Experience needed</option>
                  {/* Populate this with actual province options */}
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  {/* ...other options */}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-start mt-3">
                <Button
                  color="black"
                  buttonType="filled"
                  size="regular"
                  rounded={true}
                  block={false}
                  iconOnly={false}
                  ripple={true} // Set ripple to true or false as a boolean, not a string
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 px-3 flex flex-col items-center mt-10">
            {/* File Upload Input */}
            <div className="w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload Farm images</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>
            </div>
            {/* Display uploaded photos */}
            <div className="w-full flex flex-wrap justify-center gap-4 mt-10">
            {imagePreview.map((src, index) => (
  <div key={index} className="relative group w-32 h-24">
    <img 
      src={src} 
      alt={`Uploaded ${index}`} 
      className="object-cover rounded-lg w-full h-full transition-opacity duration-200 ease-in-out hover:opacity-75" // Added transition and hover opacity
    />
    <button
      className="absolute inset-0 m-auto w-full h-full flex justify-center items-center bg-black bg-opacity-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
      onClick={() => handleRemoveImage(index)}
    >
      <span className="text-2xl">&times;</span>
    </button>
  </div>
))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddLand;
