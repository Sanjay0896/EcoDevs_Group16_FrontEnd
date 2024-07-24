import React, { useState, useRef, useEffect } from "react";
import DropdownMenu from "./components/SearchComponent";
import MapComponent from "./components/MapComponent";
import DetailsComponent from "./components/DetailsComponent";
import axios from "axios";
import styled from "styled-components";

const DigitalStorage = () => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [filters, setFilters] = useState({});
  const [filteredMarkers, setFilteredMarkers] = useState();
  const [markersData, setMarkersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/storage"
        );
        setMarkersData(response.data);
        setFilteredMarkers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = markersData.filter((marker) => {
        return Object.entries(filters).every(([filterKey, filterValues]) => {
          if (!filterValues.length) {
            return true;
          }
          return filterValues.includes(marker[filterKey]);
        });
      });
      setFilteredMarkers(filtered);
    };

    if (markersData.length > 0) {
      applyFilters();
    }
  }, [filters, markersData]);

  const handleFiltersChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex overflow-hidden">
        <div className="w-1/4 xl:w-1/5 bg-sky-200 p-4 border-r border-gray-200">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm2 8a1 1 0 100 2h12a1 1 0 100-2H5zm3 7a1 1 0 001 1h4a1 1 0 100-2H9a1 1 0 00-1 1z"
              />
            </svg>
            <h2 className="font-semibold text-lg">Filters</h2>
          </div>
          <DropdownMenu
            data={markersData}
            fields={["city", "capacity", "crop_type"]}
            fieldNames={[
              { field: "city", name: "Select a City" },
              { field: "capacity", name: "Storage Capacity" },
              { field: "crop_type", name: "Crop Storage Type" },
            ]}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        <div className="w-3/4 xl:w-4/5 p-4">
          <div className="mt-8 mb-4 rounded-lg shadow-xl overflow-hidden border border-gray-500">
            {filteredMarkers && filteredMarkers.length > 0 ? (
              <MapComponent
                setSelectedMarker={setSelectedMarker}
                markers={filteredMarkers}
              />
            ) : (
              <div
                class="
  bg-white/50
  rounded-lg
  shadow-lg
  backdrop-blur-[10px]
  px-5
  py-4
  text-center
  text-lg
  font-bold
  text-gray-700
  min-h-screen
  flex
  items-center
  justify-center
"
              >
                No such Storage available
              </div>
            )}
          </div>

          {selectedMarker && <DetailsComponent marker={selectedMarker} />}
        </div>
      </div>
    </div>
  );
};

export default DigitalStorage;
