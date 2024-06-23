import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Lands from "./Lands";
import ErrorPage from "./ErrorPage";
import { ThemeProvider } from "styled-components";
import DigitalStorage from "./DigitalStorage";
import Login from "./Login";
import SignUp from "./Signup";
import { AuthProvider } from "./context/authContext/index.js";
import LogoutButton from "./components/Logout.js";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./layout/Layout.js";
import LandPosting from "./components/LandPosting.js";
import LandDetail from "./components/LandDetail.js";
import AddLand from "./AddLand.js";
import CropPredictionPage from "./components/CropPredictionPage.js";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      nav_bg: "#294B29",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <AuthProvider>
      <div>
        <Router>
          <div className="app-container">
            <ThemeProvider theme={theme}>
              {/* <GlobalStyle /> */}
              <main className="content">
                <Routes>
                  {/* Common Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="/logout" element={<LogoutButton />} />
                  <Route
                    path="/"
                    element={
                      <Layout>
                        <Home />
                      </Layout>
                    }
                  />
                  <Route path="*" element={<ErrorPage />} />

                  {/* Farmer and Landowner Routes */}
                  <Route
                    path="/lands"
                    element={<ProtectedRoute component={Lands} />}
                  />

                  <Route
                    path="/land-detail"
                    element={<ProtectedRoute component={LandDetail} />}
                  />

                  <Route
                    path="/add-land"
                    element={<ProtectedRoute component={AddLand} />}
                  />
                  <Route
                    path="/logout"
                    element={<ProtectedRoute component={LogoutButton} />}
                  />
                  <Route
                    path="/digitalstorage"
                    element={<ProtectedRoute component={DigitalStorage} />}
                  />

                  <Route
                    path="/crop-recommendation"
                    element={<ProtectedRoute component={CropPredictionPage} />}
                  />
                  {/* Landowner Routes */}
                  <Route
                    path="/landposting"
                    element={<ProtectedRoute component={LandPosting} />}
                  />
                </Routes>
              </main>
            </ThemeProvider>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
