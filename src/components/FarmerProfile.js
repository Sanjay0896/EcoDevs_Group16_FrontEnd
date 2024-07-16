import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmerProfile = ({ farmerId }) => {
    const [farmerInfo, setFarmerInfo] = useState(null);

    useEffect(() => {
        if (farmerId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://192.168.2.18:8000/api/farmers');
                    console.log("farmer denfkj",farmerId);
                    
                    setFarmerInfo(response.data.find(farmer => farmer.extendeduser === farmerId));
                } catch (error) {
                    console.error('There was an error fetching the farmer data:', error);
                }
            };

            fetchData();
        }
    }, [farmerId]);

    if (!farmerInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-green-50 rounded-xl shadow-md overflow-hidden">
            <div className="p-5">

                <div className="mt-3">
                    <h3 className="text-lg font-semibold text-green-900">Personal Information:</h3>
                    <p className="mx-4 text-sm text-green-600"><strong>Name: </strong>{farmerInfo.farmer_name}</p>
                    <p className="mx-4 text-sm text-green-600"><strong>Experience: </strong>{farmerInfo.experience} years</p>
                    <p className="mx-4 text-sm text-green-600"><strong>Province: </strong>{farmerInfo.province_to_farm}</p>
                    <p className="mx-4 text-sm text-green-600"><strong>Equipment Needed: </strong>{farmerInfo.equipment_needed}</p>
                </div>





                <div className="mt-3">
                    <h3 className="text-lg font-semibold text-green-900">Contact Details:</h3>
                    <p className="mx-4 text-sm text-green-600"><strong>Email: </strong>{farmerInfo.email}</p>
                    <p className="mx-4 text-sm text-green-600"><strong>Phone No: </strong>{farmerInfo.phoneNo}</p>
                </div>
                <div className="mt-3">
                    <h3 className="text-lg font-semibold text-green-900">Products Planning to Produce:</h3>
                    <ul className="list-disc ml-5 text-green-700">
                        {farmerInfo.product_planning_to_produce.map(product => (
                            <li key={product.id}>{product.product_item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FarmerProfile;