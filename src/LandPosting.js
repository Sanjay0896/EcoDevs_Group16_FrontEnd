import React, { useEffect, useState } from "react";
import axios from "axios";

const LandPosting = () => {


    const PROVINCES = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland", "Nova Scotia", "Northwest Territories", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];
    const LAND_AVAILABILITIES = ["On-farm employment", "Mentoring", "Internship", "Business partnership", "Lease", "Lease-to-own"];
    const SOIL_TYPES = ["Clay", "Loam", "Sand", "Clay loam", "Sandy loam", "Other soil type", "Unknown"];
    const CURRENT_USES = ["Livestock", "Field crops", "Market garden", "Hay or pasture", "Fallow", "Woodlot", "Vegetables", "Fruit/berries/grapes", "Other use", "Not in use"];
    const FACILITIES = ["Housing", "Irrigation capacity", "Irrigation equipment", "Greenhouse", "Fencing", "Agricultural machinery", "Cold storage", "Processing facilities", "Other facilities"];
    const EXPERIENCES = ["Not yet started", "Less than 1 year", "About 1 year", "1-2 years", "3-5 years", "6-10 years", "No preference"];

    const [showPopup, setShowPopup] = useState(false);

    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const resetFormState = () => {
        setFormState({
            title: "",
            landName: "",
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
        setImagePreview([]);
        setUploadedFiles([]);
    };

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        address: "",
        landName: "",
        streetAddress: "",
        city: "",
        province: "",
        landSize: "",
        landAvailable: "",
        soilType: "",
        landCurrentUse: "",
        facilities: "",
        experience: "",
        isActive: true,
        files: [],
    });
    const [imagePreview, setImagePreview] = useState([]);
    const [imageIds, setImageIds] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newUploadedFiles = [...uploadedFiles, ...files];
        setUploadedFiles(newUploadedFiles);
        const filePreviews = newUploadedFiles.map((file) => URL.createObjectURL(file));
        setImagePreview(filePreviews);
    };

    const handleRemoveImage = (indexToRemove) => {
        setUploadedFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToRemove));
        setImagePreview(currentPreviews => currentPreviews.filter((_, index) => index !== indexToRemove));
    };

    const uploadImages = (files) => {
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        const config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/upload_images/?images=',
            data: formData,
            redirect: 'follow'
        };

        return axios(config);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (uploadedFiles.length === 0) {
            console.error("At least one image is required.");
            setShowErrorPopup(true);
            return;
        }

        uploadImages(uploadedFiles)
            .then(response => {
                setImageIds(response.data.map(item => item.id));
            })
            .catch(error => console.log('error', error));

    };

    useEffect(() => {
        const formData = new FormData();

        formData.append('latitude', parseFloat(formState.latitude || '0'));
        formData.append('longitude', parseFloat(formState.longitude || '0'));
        formData.append('land_name', formState.streetAddress);
        formData.append('street_address', formState.streetAddress);
        formData.append('city', formState.city);
        formData.append('province', formState.province);
        formData.append('land_size', formState.landSize);
        formData.append('farmland_available_for', formState.landAvailable);
        formData.append('type_of_soil', formState.soilType);
        formData.append('and_currently_being_used_for', formState.landCurrentUse);
        formData.append('facility_and_equipment', formState.facilities);
        formData.append('experience_needed', formState.experience);
        const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
        formData.append('extendeduser', parseInt(storedDBData?.id));
        imageIds.forEach((id) => {
            formData.append('land_image', id);
        });

        try {
            const response = axios.post('http://127.0.0.1:8000/api/lands', formData).then(response => {
                resetFormState();
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);

            }).catch(error => console.log('error', error));;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [imageIds]);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-2xl border border-1 border-gray-400">
                <h2 className="text-2xl font-bold mb-5 text-center">ADD YOUR POST</h2>
                <div className="flex flex-col md:flex-row -mx-3">
                    <div className="w-full md:w-1/2 px-3">
                        <form onSubmit={handleSubmit}>

                            {/* Street Address Input */}

                            <div className="mb-4">
                                <label
                                    htmlFor="landName"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Land Name
                                </label>
                                <input
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="landName"
                                    name="landName"
                                    type="text"
                                    placeholder="Land Name"
                                    value={formState.landName}
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
                                    {PROVINCES.map((province) => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="landSize"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Land size
                                </label>
                                <input
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="landSize"
                                    name="landSize"
                                    type="text"
                                    placeholder="Land size"
                                    value={formState.landSize}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="landAvailable"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Farm land available for
                                </label>
                                <select
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="landAvailable"
                                    name="landAvailable"
                                    value={formState.landAvailable}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Available for </option>
                                    {LAND_AVAILABILITIES.map((landAvailable) => (
                                        <option key={landAvailable} value={landAvailable}>{landAvailable}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="soilType"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Type Of Soil
                                </label>
                                <select
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="soilType"
                                    name="soilType"
                                    value={formState.soilType}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Type Of Soil</option>
                                    {/* Populate this with actual province options */}
                                    {SOIL_TYPES.map((soilType) => (
                                        <option key={soilType} value={soilType}>{soilType}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="landCurrentUse"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Current Use Of Land
                                </label>
                                <select
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="landCurrentUse"
                                    name="landCurrentUse"
                                    value={formState.landCurrentUse}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Current Use Of Land</option>
                                    {/* Populate this with actual province options */}
                                    {CURRENT_USES.map((landCurrentUse) => (
                                        <option key={landCurrentUse} value={landCurrentUse}>{landCurrentUse}</option>
                                    ))}
                                    {/* ...other options */}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="facilities"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Facilities and Equipment
                                </label>
                                <select
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="facilities"
                                    name="facilities"
                                    value={formState.facilities}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Facilities and Equipment</option>
                                    {FACILITIES.map((facilities) => (
                                        <option key={facilities} value={facilities}>{facilities}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="experience"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Experience needed
                                </label>
                                <select
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="experience"
                                    name="experience"
                                    value={formState.experience}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Experience needed</option>
                                    {EXPERIENCES.map((experience) => (
                                        <option key={experience} value={experience}>{experience}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-start mt-3">
                                <button
                                    type="submit"
                                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-1/2 px-3 flex flex-col items-center mt-10">
                        {/* File Upload Input */}
                        <div className="w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed  shadow-md rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
            {/* Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Success!</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Land posted successfully.
                                </p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    id="ok-btn"
                                    onClick={() => setShowPopup(false)}
                                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showErrorPopup && (
                <div className="fixed inset-0 bg-red-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-red-900">Upload Required</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    At least one image is required to post the land.
                                </p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={() => setShowErrorPopup(false)}
                                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default LandPosting;