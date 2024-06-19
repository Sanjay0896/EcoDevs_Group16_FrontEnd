import React, { useState, useRef, useEffect } from 'react';
import DropdownMenu from './components/SearchComponent';
import styled from "styled-components";
import LandCard from './components/LandCard';
import axios from 'axios';

const Lands = () => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [lands, setLands] = useState([]);
  const [filters, setFilters] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/lands");
        setLands(response.data); 
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
          <div className="section section1">
            <DropdownMenu
              data={lands}
              fields={['city','province','land_size','farmland_available_for','type_of_soil']}
              fieldNames={[
                { field: 'city', name: 'Select a City' },
                { field: 'province', name: 'Select a Province' },
                { field: 'land_size', name: 'Land Size' },
                { field: 'farmland_available_for', name: 'Available For' },
                { field: 'type_of_soil', name: 'Soil Type' }
              ]}
              onFiltersChange={handleFiltersChange}
            />
          </div>
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