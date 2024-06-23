// src/components/ProtectedRoute.js
import {React, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './layout/Layout.js';

import { useAuth } from './context/authContext/index.js'; // Adjust the path as necessary

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { setCurrentDBUser,currentDBUser } = useAuth();

    useEffect(() => {
        const storedDBData = localStorage.getItem('storedDBData');
        if (storedDBData) {
            setCurrentDBUser(JSON.parse(storedDBData));
        }
    }, []); // Empty dependency array to run the effect only once when the component mounts


    const storedDBData = localStorage.getItem('storedDBData');
    if (storedDBData) {
        // setCurrentDBUser(JSON.parse(storedDBData));
        return (
            <Layout><Component /></Layout>
        );
    }

    // if (currentDBUser!=null) {

    // }
    return (<Navigate to="/login" />);
};

export default ProtectedRoute;