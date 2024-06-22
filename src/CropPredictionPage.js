import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 20,
        padding: 20,
        font: {
          size: 14,
          weight: "bold",
          family: "Roboto, sans-serif",
          color: "#000000", // Light text for contrast against dark background
        },
      },
    },
    title: {
      display: true,
      text: "Comparative Crop Revenue Analysis",
      color: "#000000", // Light text for contrast against dark background
      font: {
        size: 18,
        weight: "bold",
        family: "Roboto, sans-serif",
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#000000", // Light text for contrast
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
        color: "rgba(128, 128, 128, 0.25)", // Medium gray lines for the grid with transparency
      },
      ticks: {
        color: "#000000", // Light text for contrast
        font: {
          size: 12,
        },
        callback: function (value) {
          return "$" + value;
        },
      },
    },
  },
  animation: {
    duration: 2000,
    easing: "easeOutCubic",
  },
  elements: {
    bar: {
      borderRadius: 20,
      borderSkipped: false,
    },
  },
};

function CropPredictionPage() {
  const [inputs, setInputs] = useState({
    soil_type_encoded: "",
    region_encoded: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });
  const inputBaseClasses =
    "mt-1 block w-full p-3 bg-white-900 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";
  const labelClasses =
    "block text-base font-medium text-gray-800 mb-1 tracking-wide font-roboto";
  const hoverEffect = "hover:shadow-2xl"; // Shadow will increase on hover for a nice effect
  const buttonClasses =
    "py-3 px-6 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-md shadow-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50";

  const [recommendation, setRecommendation] = useState();
  const [apiData, setApiData] = useState(null); // State to hold fetched API data

  const [chartData, setChartData] = useState(null);

  // API endpoint for fetching top 5 crops and market prices
  const API_ENDPOINT = "http://127.0.0.1:8000/predict";

  useEffect(() => {
    const recommendations = apiData?.map((crop) => ({
      crop: crop.crop,
      marketPrice: crop.market_price.toFixed(2), // Formatting the price
      info: `${
        crop.crop
      } has a current market price of $${crop.market_price.toFixed(2)} per kg.`,
    }));

    if (recommendation != null) {
      setRecommendation(recommendations[0]);
      // Prepare data for chart
      const labels = apiData.map((crop) => crop.crop);
      const marketPrices = apiData.map((crop) => crop.market_price);
      console.log("labels", labels);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Market Price ($)",
            data: marketPrices,
            backgroundColor: [
              "rgba(41, 128, 185, 0.6)",
              "rgba(46, 204, 113, 0.6)",
              "rgba(241, 196, 15, 0.6)",
              "rgba(231, 76, 60, 0.6)",
              "rgba(155, 89, 182, 0.6)",
            ],
            borderColor: [
              "rgba(41, 128, 185, 1)",
              "rgba(46, 204, 113, 1)",
              "rgba(241, 196, 15, 1)",
              "rgba(231, 76, 60, 1)",
              "rgba(155, 89, 182, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [apiData]);

  const fetchData = async () => {
    try {
      axios
        .post("http://127.0.0.1:8000/predict", inputs)
        .then((response) => {
          console.log("Response:", response.data);
          setApiData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setRecommendation(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "region_encoded" || name === "soil_type_encoded") {
      const selectedIndex = event.target.selectedIndex;
      setInputs((values) => ({ ...values, [name]: selectedIndex }));
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  // useEffect(() => {
  //   if (apiData.length > 0) {

  //   } else {
  //     console.log("No data available or data is still loading.");
  //   }

  // }, [apiData]);

  return (
    <div className="min-h-screen bg-sky-300 flex justify-center items-center">
      <div
        className="container mx-auto p-4 rounded bg-sky-300"
        style={{ maxWidth: "1200px" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">
          Smart Crop Yield Forecasting
        </h2>
        <div className="upper-section mb-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Soil Type Dropdown */}
            <div className="mb-4 md:mb-0">
              <label htmlFor="soil_type_encoded" className={labelClasses}>
                Soil Type
              </label>
              <div>
                <select
                  id="soil_type_encoded"
                  name="soil_type_encoded"
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${hoverEffect}`}
                >
                  <option value="">Select a soil type</option>
                  <option value="sandy">Sandy</option>
                  <option value="clay">Clay</option>
                  <option value="loamy">Loamy</option>
                  <option value="peaty">Peaty</option>
                  <option value="silty">Silty</option>
                  <option value="chalky">Chalky</option>
                </select>
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="region_encoded" className={labelClasses}>
                Location
              </label>
              <select
                id="region_encoded"
                name="region_encoded"
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
              >
                <option value="">Select a province</option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Northwest Territories</option>
                <option value="NU">Nunavut</option>
                <option value="YT">Yukon</option>
              </select>
            </div>

            {/* Temperature Field */}
            <div>
              <label htmlFor="temperature" className={labelClasses}>
                Temperature (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={inputs.temperature}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 24"
                min="0" // Prevent negative values
              />
            </div>

            {/* Humidity Field */}
            <div>
              <label htmlFor="humidity" className={labelClasses}>
                Humidity (%)
              </label>
              <input
                type="number"
                name="humidity"
                value={inputs.humidity}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 60"
                min="0" // Prevent negative values
              />
            </div>

            {/* Rainfall Field */}
            <div>
              <label htmlFor="rainfall" className={labelClasses}>
                Rainfall (mm)
              </label>
              <input
                type="number"
                name="rainfall"
                value={inputs.rainfall}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 200"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button type="submit" className={buttonClasses}>
                Get Recommendation
              </button>
            </div>
          </form>
        </div>
        <div className="lower-section flex flex-col lg:flex-row justify-between gap-4">
          {/* Recommendation Card */}
          {recommendation && (
            <>
              <div className="recommendation-card bg-gradient-to-tr from-blue-100 via-blue-50 to-white p-6 border border-blue-200 rounded-2xl shadow-2xl flex-1 transition duration-300 ease-in-out hover:shadow-inner">
                <h3 className="text-3xl font-semibold mb-3 text-green-800 mt-3">
                  <u>{recommendation.crop}</u>
                </h3>
                <p className="text-xl font-medium text-gray-700 mt-8">
                  Market Price: ${recommendation.marketPrice}
                </p>
                <p className="text-gray-600 mt-2">{recommendation.info}</p>
              </div>
            </>
          )}

          {/* Chart Container */}
          <div className="chart-container w-full lg:w-1/2">
            {chartData && <Bar data={chartData} options={options} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropPredictionPage;
