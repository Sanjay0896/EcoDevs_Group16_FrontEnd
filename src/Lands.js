import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import LandCard from './components/LandCard';
import axios from 'axios'; // Import Axios

const Lands = () => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [lands, setLands] = useState([]);
  const [filters, setFilters] = useState({});


  const markersData = [
    {
      lat: 42.25842463671085,
      lng: -83.0721388933654,
      detail: "This storage has a great capacity for grains.",
      name: "Grain Storage Facility",
      city: "Windsor",
      province: "Ontario",
      storageCapacity: "10,000 tons",
      storageType: "Grain",
      minRentingPeriod: "6 months"
    },
    {
      lat: 42.29121029697507,
      lng: -82.9939575928812,
      detail: "Ideal for perishable goods, with excellent temperature control.",
      name: "Perishable Goods Storage",
      city: "Essex",
      province: "Ontario",
      storageCapacity: "5,000 cubic feet",
      storageType: "Refrigerated",
      minRentingPeriod: "3 months"
    },
    {
      lat: 42.314937088967046,
      lng: -83.03636360168505,
      detail: "Secure and spacious, perfect for equipment or vehicle storage.",
      name: "Equipment Storage Yard",
      city: "LaSalle",
      province: "Ontario",
      storageCapacity: "2,500 square meters",
      storageType: "Outdoor",
      minRentingPeriod: "1 month"
    },
    {
      lat: 42.26910445645066,
      lng: -83.13831716275215,
      detail: "Specialized in liquid storage with high-capacity tanks.",
      name: "Liquid Storage Tanks",
      city: "Amherstburg",
      province: "Ontario",
      storageCapacity: "500,000 liters",
      storageType: "Liquid",
      minRentingPeriod: "12 months"
    },
    {
      lat: 42.33725627853263,
      lng: -83.04930027008057,
      detail: "Equipped for bulk storage with easy transport access.",
      name: "Bulk Storage Warehouse",
      city: "Tecumseh",
      province: "Ontario",
      storageCapacity: "20,000 pallets",
      storageType: "Dry",
      minRentingPeriod: "1 month"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Axios to fetch data
        const response = await axios.get("http://127.0.0.1:8000/api/lands");
        setLands(response.data); // Axios automatically handles converting JSON data
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFiltersChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };


  const filteredLands = lands.filter(land =>
    Object.entries(filters).every(([field, values]) => 
      values.length === 0 || values.includes(land[field])
    )
  );


  return (
    <>
      <Wrapper>
        <div className="digital-storage">
          <div className="section section2">
            <LandCard lands={filteredLands}/>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
/* DigitalStorage.css */
.digital-storage {
  display: grid;
  grid-template-columns: 1fr 4fr; /* This sets the column sizes to a 1:4 ratio */
  gap: 1rem;
  height: calc(100vh - var(--header-footer-height)); /* Adjust as needed */
}

.section {
  border: 1px solid #ddd;
  padding: 1rem;
}
  
`;

export default Lands;