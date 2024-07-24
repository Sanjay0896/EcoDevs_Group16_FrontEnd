import React, { useState, useEffect } from "react";
import axios from "axios"; 
import LandCard from "./LandCard"; 
import LandAgreementForm from "./LandAgreementForm";
import LandAgreementDetail from "./LandAgreementDetail";
import { Button, Modal } from "flowbite-react";
import LandApplicationsAccordion from "./LandApplicationsAccordion";
import FilterTag from "./FilterTag";
import FarmerProfile from "./FarmerProfile"; 
import { useNavigate } from "react-router-dom";
import LandAgreementCard from "./LandAgreementCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LandApplications = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [applications, setApplications] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [selectedLandId, setSelectedLandId] = useState(null);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [farmersInfo, setfarmersInfo] = useState([]);
  const [activeTab, setActiveTab] = useState("lands");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAgreement, setOpenModalAgreement] = useState(false);
  const [selectedLandDetails, setSelectedLandDetails] = useState(null);
  const [isTagVisible, setIsTagVisible] = useState(false);
  const [showFarmerProfile, setShowFarmerProfile] = useState(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [pendingApplicationId, setPendingApplicationId] = useState(null);
  const [selectedLandAgreement, setSelectedLandAgreement] = useState(null);

  const promptIgnoreConfirmation = (appId) => {
    setPendingApplicationId(appId);
    setIsConfirmationOpen(true);
  };

  const showNotification = (message) => {
    toast(message);
  };

  const [formData, setFormData] = useState({
    landOwnerName: "",
    farmerName: "",
    landAddress: "",
    agreementDuration: "",
    durationType: "years",
    decidedCrop: "",
    facilitiesAndEquipment: "",
    agreementDescription: "",
  });

  const activeTabClass = "bg-green-200";
  const inactiveTabClass =
    "hover:bg-green-100 text-gray-700 hover:text-gray-900";

  let passedId;

  const handleFarmerProfileOpen = (farmerId) => {
    passedId = farmerId;
    setSelectedFarmerId(farmerId);

    setShowFarmerProfile(true);
  };

  const handleFarmerProfileClose = () => {
    setShowFarmerProfile(false);
  };

  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  let isLandOwner = false;
  if (storedDBData) {
    isLandOwner = storedDBData.designation === "L";
  }

  const storedUserData = JSON.parse(localStorage.getItem("storedDBData"));

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/landapplications"
      );
      if (response.data && storedUserData) {
        if (isLandOwner) {
          const currentApplications = response.data.filter(
            (application) => application.landowner === storedUserData.id
          );
          setApplications(currentApplications);
          // fetchExtendedUsers();
        } else {
          const currentApplications = response.data.filter(
            (application) => application.farmer === storedUserData.id
          );
          setApplications(currentApplications);
        }
      } else {
        setApplications(response.data);
      }
    };

    const fetchAgreements = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/agreements"
      );
      if (response.data && storedUserData) {
        console.log("Harsh", response.data);
        if (isLandOwner) {
          const currentAgreements = response.data.filter(
            (agreement) => agreement.landowner === storedUserData.id
          );
          setAgreements(currentAgreements);
        } else {
          const currentAgreements = response.data.filter(
            (agreement) => agreement.farmer === storedUserData.id
          );
          setAgreements(currentAgreements);
        }
      } else {
        setAgreements(response.data);
      }
    };

    fetchApplications();
    fetchAgreements();
  }, []);

  useEffect(() => {
    const fetchLands = async () => {
      setIsLoading(true);

      const response = await axios.get("http://127.0.0.1:8000/api/lands");
      if (response.data && storedUserData) {
        if (isLandOwner) {
          const filteredLands = response.data.filter(
            (land) => land.land_owner_name === storedUserData.user_name
          );
          console.log("fetched lands", response.data);
          console.log("fetched lands", storedUserData.user_name);
          setLands(filteredLands);
        } else {
          const landIdsInApplications = applications.map((app) => app.landid);

          const filteredLands = response.data.filter((land) =>
            landIdsInApplications.includes(land.id)
          );
          setLands(filteredLands);
        }

      
      } else {
        setLands(response.data);
      }
      setIsLoading(false);
    };
    fetchLands();
  }, [applications]);

  const fetchExtendedUsers = async () => {
    const extendedUsersResponse = await axios.get(
      "http://127.0.0.1:8000/api/extendedusers"
    );
    const extendedUsers = extendedUsersResponse.data;

    if (isLandOwner) {
      const farmerIds = new Set(applications.map((app) => app.farmer));

      const farmersInfo = extendedUsers
        .filter((user) => farmerIds.has(user.id))
        .map((user) => ({ userId: user.id, username: user.user_name }));

      console.log("found landow", farmersInfo);

      setfarmersInfo(farmersInfo);
    } else {
      const landownerIds = new Set(applications.map((app) => app.landowner));
      const farmersInfo = extendedUsers
        .filter((user) => landownerIds.has(user.id))
        .map((user) => ({ userId: user.id, username: user.user_name }));

      console.log("found land", farmersInfo);

      setfarmersInfo(farmersInfo);
    }
  };

  useEffect(() => {
    fetchExtendedUsers();
  }, [applications]);

  const [landOwnerName, setlandOwnerName] = useState();
  const [farmerName, setFarmerName] = useState();
  const [landAddress, setLandAddress] = useState();
  const [landOwnerId, setLandOwnerId] = useState();
  const [farmerId, setFarmerId] = useState();
  const [landId, setLandId] = useState();
  const [landApplication, setLandApplication] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchFormData = ({ appId, landowner, farmer, landid }) => {
    setLandOwnerId(landowner);
    setFarmerId(farmer);
    setLandId(landid);
    const land_owner_name = storedDBData.user_name;
    setlandOwnerName(land_owner_name);
    const farmer_name = farmersInfo
      .filter((user) => user.userId === farmer)
      .map((user) => user.username);
    setFarmerName(farmer_name);

    const land_address = lands
      .filter((land) => land.id === landid)
      .map((land) => ${land.street_address},${land.city},${land.province});
    setLandAddress(land_address);
  };

  useEffect(() => {
    const newFilteredApplications = selectedLandId
      ? applications.filter((app) => app.landid === selectedLandId)
      : applications;
    setFilteredApplications(newFilteredApplications);
  }, [selectedLandId, applications]);

  const handleLandClick = (land) => {
    setSelectedLandId(land.id);
    setSelectedLandDetails(land);
    setIsTagVisible(true);
    setOpenModal(true);
  };

  const handleLandAgreementClick = (landAgreement) => {
    console.log("vatsal", landAgreement);
    setOpenModalAgreement(true);
    setSelectedLandAgreement(landAgreement);
  };

  const handleClear = () => {
    setIsTagVisible(false);
  };

  const handleAccept = (landApplication) => {
    setLandApplication(landApplication);
    setOpenModal(true);
  };


  const handleIgnore = (appId) => {
    console.log("Ignored application with ID:", appId);
    setOpenModal(false);
    const updatedFilteredApplications = filteredApplications.filter(
      (application) => application.id !== appId
    );
    setFilteredApplications(updatedFilteredApplications);
    setIsConfirmationOpen(false);
    showNotification("Application rejected.");
  };

  useEffect(() => {
    setActiveTab("applications");
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center text-lg font-semibold bg-green-100 shadow-md">
        <button
          className={`flex-grow text-center py-2 rounded-t-lg transition-colors duration-300 ${
            activeTab === "applications"
              ? "bg-green-400 text-white"
              : "text-green-800 hover:bg-green-200"
          }`}
          onClick={() => setActiveTab("applications")}
        >
          Applications
        </button>
        <button
          className={`flex-grow text-center py-2 rounded-t-lg transition-colors duration-300 ${
            activeTab === "agreements"
              ? "bg-green-400 text-white"
              : "text-green-800 hover:bg-gree-200"
          }`}
          onClick={() => setActiveTab("agreements")}
        >
          Agreements
        </button>
        <button
          className={`flex-grow text-center py-2 rounded-t-lg transition-colors duration-300 ${
            activeTab === "chat"
              ? "bg-greem-400 text-gray"
              : "text-green-800 hover:bg-green-200"
          }`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
      </header>

      <main className="flex-grow overflow-y-auto">
        {activeTab === "applications" && (
          <div>
            <FilterTag
              isVisible={isTagVisible}
              selectedLandDetails={selectedLandDetails}
              onClear={handleClear}
            />
            <div className="flex flex-row">
              <div className="w-3/4 p-4">
                {isLoading ? (
                  <div>Loading lands...</div>
                ) : (
                  <LandCard lands={lands} onLandClick={handleLandClick} />
                )}
              </div>
              <div className="w-1/4 p-4 bg-gray-50">
                <LandApplicationsAccordion
                  applications={filteredApplications}
                  onAccept={handleAccept}
                  onIgnore={handleIgnore}
                  farmersInfo={farmersInfo}
                  onOpenFarmerProfile={handleFarmerProfileOpen}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "agreements" && (
          <div>
            <div className="w-full" style={{ minHeight: "100vh" }}>
              <LandAgreementCard
                landAgreements={agreements}
                onLandAgreementClick={handleLandAgreementClick}
              />
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div>
           
          </div>
        )}
      </main>

      <Modal
        show={showFarmerProfile}
        onClose={handleFarmerProfileClose}
        size="4xl"
      >
        <Modal.Header>
          <h2 className="text-2xl font-semibold mb-5 text-gray-900">
            Farmer Profile
          </h2>
        </Modal.Header>
        <Modal.Body>
          <FarmerProfile farmerId={selectedFarmerId} />
        </Modal.Body>
      </Modal>

      {openModal && (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
          <Modal.Header>
            <h2 className="text-2xl font-semibold mb-5 text-gray-900">
              Land Agreement Form
            </h2>
          </Modal.Header>
          <Modal.Body>
            <LandAgreementForm
              preFormData={{
                landApplication,
              }}
            />
          </Modal.Body>
        </Modal>
      )}

      {openModalAgreement && (
        <Modal
          show={openModalAgreement}
          onClose={() => setOpenModalAgreement(false)}
          size="4xl"
        >
          <Modal.Header>
            <h2 className="text-2xl font-semibold mb-5 text-gray-900">
              Land Agreement Detail
            </h2>
          </Modal.Header>
          <Modal.Body>
            <LandAgreementDetail agreement={selectedLandAgreement} />
          </Modal.Body>
        </Modal>
      )}

      {isConfirmationOpen && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to reject this application?</p>
          <button onClick={() => handleIgnore(pendingApplicationId)}>
            Confirm
          </button>
          <button onClick={() => setIsConfirmationOpen(false)}>Cancel</button>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default LandApplications;
