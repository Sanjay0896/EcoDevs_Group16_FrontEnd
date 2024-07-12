import React, { useState, useEffect } from "react";
import axios from "axios"; 
import LandCard from "./LandCard";
import 'react-toastify/dist/ReactToastify.css';


const LandApplications = () => {

  const [lands, setLands] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("lands");
  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  let isLandOwner = false;
  if (storedDBData) {
    isLandOwner = storedDBData.designation === "L";
  }

  const storedUserData = JSON.parse(localStorage.getItem("storedDBData"));

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
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActiveTab("applications");
  }, []);

  
  const handleLandClick = (land) => {

  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center text-lg font-semibold bg-gray-300 shadow-md">
        <button
          className={`flex-grow text-center py-2 rounded-t-lg transition-colors duration-300 ${activeTab === "applications"
            ? "bg-gray-400 text-white"
            : "text-gray-800 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("applications")}
        >
          Applications
        </button>
        <button
          className={`flex-grow text-center py-2 rounded-t-lg transition-colors duration-300 ${activeTab === "agreements"
            ? "bg-gray-400 text-white"
            : "text-gray-800 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("agreements")}
        >
          Agreements
        </button>
        <button
          className={`flex-grow text-center py-2 rounded-t-lg transition-colors duration-300 ${activeTab === "chat"
            ? "bg-gray-400 text-white"
            : "text-gray-800 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
      </header>

      <main className="flex-grow overflow-y-auto">
       
        {activeTab === "applications" && (
          <div>
            <div className="flex flex-row">
              <div className="w-3/4 p-4">
                {isLoading ? (
                  <div>Loading lands...</div>
                ) : (
                  <LandCard lands={lands} onLandClick={handleLandClick} />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "agreements" && (
          <div>
          
          </div>
        )}

        {activeTab === "chat" && (
          <div>

          </div>
        )}
      </main>

    </div>
  );
};

export default LandApplications;
