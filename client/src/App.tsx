import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import CheckVendor from "./pages/CheckVendor";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} /> 
        <Route path="/check" element={<CheckVendor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
