import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'; // Import Axios

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
        const response = await axios.get("");
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
        // For each filter, return true only if the marker matches all selected filter criteria
        return Object.entries(filters).every(([filterKey, filterValues]) => {
          if (!filterValues.length) {
            return true; // No filter selected for this category
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
        {/* Sidebar for Filters */}
        <div className="w-1/4 xl:w-1/5 bg-sky-200 p-4 border-r border-gray-200">
          <div className="flex items-center mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm2 8a1 1 0 100 2h12a1 1 0 100-2H5zm3 7a1 1 0 001 1h4a1 1 0 100-2H9a1 1 0 00-1 1z" />
            <h2 className="font-semibold text-lg">Filters</h2>
          </div>
          <DropdownMenu
            data={markersData}
            fields={["city", "capacity"]}
            fieldNames={[
              { field: "city", name: "Select a City" },
              { field: "capacity", name: "Storage Capacity" },
            ]}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Main Content */}
        <div className="w-3/4 xl:w-4/5 p-4">
          {/* Map with added margin-top */}
          <div className="mt-8 mb-4 rounded-lg shadow-xl overflow-hidden border border-gray-500">
            {filteredMarkers && filteredMarkers.length > 0 ? (
              <MapComponent
                setSelectedMarker={setSelectedMarker}
                markers={filteredMarkers}
              />
            ) : (
              <div>Loading Map...</div>
            )}
          </div>

          {/* Details */}
          {selectedMarker && (
            // <div className="mt-4 bg-white p-6 rounded-lg shadow-lg">
            <DetailsComponent marker={selectedMarker} />
            // </d  iv>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalStorage;