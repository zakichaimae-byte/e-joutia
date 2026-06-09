import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./screens/Home";
import PublishAdScreen from "./screens/PublishAdScreen";
import SuccessScreen from "./screens/SuccessScreen";
import AdDetailScreen from "./screens/AdDetailScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publish" element={<PublishAdScreen />} />
        <Route path="/publish/success" element={<SuccessScreen />} />
        <Route path="/publish/view" element={<AdDetailScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
