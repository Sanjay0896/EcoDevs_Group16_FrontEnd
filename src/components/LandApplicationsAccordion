import React, { useState } from 'react';
import ApplicationCard from "./ApplicationCard";

const applicationStatusCategories = ['Pending', 'Accepted', 'Rejected'];

const LandApplicationsAccordion = ({ applications, farmersInfo, onAccept, onIgnore, onOpenFarmerProfile }) => {
    const [openPanels, setOpenPanels] = useState(
        applicationStatusCategories.reduce((acc, status) => ({
            ...acc,
            [status]: true 
        }), {})
    );

    const toggleDropdown = (status) => {
        setOpenPanels(prevState => ({
            ...prevState,
            [status]: !prevState[status] 
        }));
    };

    const getFieldName = (field) => {
        switch (field) {
            case 'Pending':
                return 'Pending Applications';
            case 'Accepted':
                return 'Accepted Applications';
            case 'Rejected':
                return 'Rejected Applications';
            default:
                return '';
        }
    };

    return (
        <div className="bg-gray-200 rounded-lg shadow-lg p-4 divide-y divide-gray-300 transition duration-300 transform hover:scale-101 hover:shadow-2xl border border-gray-700">
            {applicationStatusCategories.map((status, idx) => (
                <div key={status} className={`accordion-item ${idx > 0 ? 'pt-4' : ''}`}>
                    <h3
                        onClick={() => toggleDropdown(status)}
                        className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600 flex justify-between items-center"
                    >
                        {getFieldName(status)}
                        <span className="accordion-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 inline-block transform transition-transform ${openPanels[status] ? 'rotate-180' : 'rotate-0'
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </h3>
                    <div
                        className={`${openPanels[status] ? 'block' : 'hidden'
                            } transition-all duration-500`}
                    >
                        {applications
                            .filter((app) => app.status === status)
                            .map((application, index) => {

                                const farmer = farmersInfo.find(farmer => farmer.userId === application.farmer);
                                const farmerName = farmer ? farmer.username : 'Unknown Farmer';
                                return (<ApplicationCard
                                    key={`${status}-${index}`}
                                    application={application}
                                    onAccept={onAccept}
                                    onIgnore={onIgnore}
                                    farmerName={farmerName}
                                    onOpenFarmerProfile={onOpenFarmerProfile}
                                />)
                            })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LandApplicationsAccordion;