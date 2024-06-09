import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lands from "./Lands";
import DigitalStorage from "./DigitalStorage";
import { ThemeProvider } from "styled-components";
import AddLand from "./AddLand";
import { AuthProvider } from "./context/authContext/index.js";

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
              <main className="content">
                <Routes>
                  <Route path="/lands" element={<Lands />} />
                  <Route path="/add-land" element={<AddLand />} />
                  <Route path="/digitalstorage" element={<DigitalStorage />} />
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
