import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./view/Home/Home";
import Docs from "./view/Docs/Docs";
import Started from "./view/Started/Started";
import About from "./view/About/About";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/started" element={<Started />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
