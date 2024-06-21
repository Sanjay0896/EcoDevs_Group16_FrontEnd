// DetailsComponent.js
import { React, useState } from 'react';
import styled from 'styled-components';
import { Modal } from "flowbite-react";
import { Button } from "@material-tailwind/react";

function DetailsComponent({ marker }) {

  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  return (
    <>
      <Wrapper>
        <div className="card">
          <h2 className="title text-2xl"><strong>{marker.name}</strong></h2>
          <p className="info"><strong>Street Address:</strong> {marker.street_address}</p>
          <p className="info"><strong>City:</strong> {marker.city}, {marker.province}</p>
          <p className="info"><strong>Storage Capacity:</strong> {marker.capacity} Cubic/Meters</p>
          <p className="info"><strong>Storage Type:</strong> {marker.crop_type}</p>
          <p className="info last"><strong>Minimum Renting Period:</strong> {marker.min_renting_period} Months</p>
          <div className="flex justify-end">
            <Button
              className="openFormButton">
              Inquire Now
            </Button>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .card {
    position: relative; /* Needed to position the pseudo-element */
    border: 1px solid black; /* Black border */
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 1rem;
    background-color: #f8fafc;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

    /* Create a pseudo-element to serve as an overlay */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('img/cropstorage2.jpg') no-repeat center center; /* Replace with your image path */
      background-size: cover;
      opacity: 0.1; /* Reduced opacity for the overlay */
      border-radius: inherit; /* Match the border radius of the parent */
      z-index: 0; /* Sit below the card content */
    }

    /* Make sure the card content sits above the pseudo-element */
    * {
      position: relative;
      z-index: 1;
    }
  }

  .title {
    color: #2c5282; /* Dark blue color for the title for contrast */
    margin-bottom: 0.75rem; /* 12px bottom margin */
  }

  .info {
    color: #4a5568; /* Dark gray for the text for better readability */
    margin-bottom: 0.75rem; /* Consistent bottom margin for all paragraphs */
    line-height: 1.75; /* A comfortable line-height for reading */
  }

  .info.last {
    margin-bottom: 0; /* No bottom margin for the last element */
  }
}
`;


export default DetailsComponent;