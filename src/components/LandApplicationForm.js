import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const facilitiesOptions = [
  "Housing",
  "Irrigation capacity",
  "Irrigation equipment",
  "Greenhouse",
  "Fencing",
  "Agricultural machinery",
  "Cold storage",
  "Processing facilities",
  "Other facilities",
];

const cropList = [
  "Field Crops (grains or beans)",
  "Flowers",
  "Fruit/berries/grapes",
  "Hay or forage crops",
  "Herbs",
  "Livestock",
  "Seeds, seedlings or nursery stock",
  "Vegetables",
  "Other products",
];

function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/csrf-token/");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }
    fetchCsrfToken();
  }, []);

  return csrfToken;
}

function LandApplicationForm(props) {
  const {
    landOwnerId,
    farmerId,
    landId,
    landOwnerName,
    farmerName,
    landAddress,
  } = props.preFormData;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    landOwnerName: landOwnerName,
    farmerName: farmerName,
    landAddress: landAddress,
    agreementDuration: "",
    durationType: "years",
    decidedCrop: [0],
    facilitiesAndEquipment: "",
    agreementDescription: "",
    productPlanningToProduce: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "decidedCr") {
      // const selectedOptionIndex = cropList.findIndex(
      //   (selectedValue) => selectedValue === value
      // );

      // console.log("Selected crop index", selectedOptionIndex);

      // setFormData({
      //   ...formData,
      //   product_planning_to_produce: [selectedOptionIndex],
      // });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleInputChangeProduct = (e) => {
    const { name, value, type, checked } = e.target;
  };

  const updateLandApplicationStatus = async (url, status) => {
    const data = {
      status: status,
    };
    try {
      const response = await axios.patch(url, data);
      console.log(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiPayload = {
      landowner: landOwnerId,
      farmer: farmerId,
      landid: landId,
      status: 'Pending',
      agreement_duration:
        formData.agreementDuration + " " + formData.durationType,
      facility_and_equipment_agreed_to: formData.facilitiesAndEquipment,
      agreement_description: formData.agreementDescription,
      product_planning_to_produce: formData.productPlanningToProduce,
    };

    // const formData = new FormData();
    // formData.append('landowner', landOwnerId);
    // formData.append('farmer', farmerId);
    // formData.append('landid', landId);
    // formData.append('status', "PENDING");
    // formData.append('agreement_duration', formData.agreementDuration + " " + formData.durationType);
    // formData.append('facility_and_equipment_agreed_to', formData.facilitiesAndEquipment);
    // formData.append('agreement_description', formData.agreementDescription);
    // formData.append('product_planning_to_produce', formData.product_planning_to_produce);

    console.log("apiPayload", apiPayload);

    // let csrfToken;
    // try {
    //   const response = await fetch("http://127.0.0.1:8000/api/csrf-token/");
    //   csrfToken = await response.json();
    //   console.log("Harsh,",csrfToken.csrfToken);
    // } catch (error) {
    //   console.error("Error fetching CSRF token:", error);
    // }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/landapplications/create",
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
        alert("Application Submitted Successfully!");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="landOwnerName">Land Owner Name</Label>
            <TextInput
              id="landOwnerName"
              name="landOwnerName"
              value={formData.landOwnerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="farmerName">Farmer Name</Label>
            <TextInput
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="landAddress">Land Address</Label>
            <TextInput
              id="landAddress"
              name="landAddress"
              value={formData.landAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <Label htmlFor="agreementDuration">Agreement Duration</Label>
            <TextInput
              id="agreementDuration"
              name="agreementDuration"
              type="number"
              min="1"
              value={formData.agreementDuration}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2 items-center">
              <Checkbox
                id="years"
                name="durationType"
                value="years"
                checked={formData.durationType === "years"}
                onChange={handleInputChange}
              />
              <Label htmlFor="years">Years</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="months"
                name="durationType"
                value="months"
                checked={formData.durationType === "months"}
                onChange={handleInputChange}
              />
              <Label htmlFor="months">Months</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="productPlanningToProduce">Decided Crop</Label>
            <Select
              id="productPlanningToProduce"
              name="productPlanningToProduce"
              value={formData.product_planning_to_produce}
              onChange={handleInputChange}
              required
            >
              <option>Select Decided Crop</option>
              {cropList.map((option) => (
                <option>{option}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="facilitiesAndEquipment">
              Facilities and Equipment
            </Label>
            <Select
              id="facilitiesAndEquipment"
              name="facilitiesAndEquipment"
              value={formData.facilitiesAndEquipment}
              onChange={handleInputChange}
              required
            >
              <option>Select Facilities/Equipment</option>
              {facilitiesOptions.map((option) => (
                <option>{option}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="agreementDescription">Agreement Description</Label>
            <Textarea
              id="agreementDescription"
              name="agreementDescription"
              value={formData.agreementDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type="submit">Submit Agreement</Button>
        </form>
      </div>
    </div>
  );
}

export default LandApplicationForm;
