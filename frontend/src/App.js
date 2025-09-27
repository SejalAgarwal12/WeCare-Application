import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "../src/pages/Home";
import CoachLogin from "./pages/CoachLogin";
import CoachSignup from "./pages/CoachSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CoachHome from "./pages/CoachHome";
import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import CoachProfile from "./pages/CoachProfile";
import UserAppointments from './pages/UserAppointments';

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coachLogin" element={<CoachLogin />} />
          <Route path="/coachSignup" element={<CoachSignup />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSignup" element={<UserSignup />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/coachHome" element={<CoachHome />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/coachProfile" element={<CoachProfile />} />
          <Route path="/userAppointments" element={<UserAppointments />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
//RUN  BACKEND
// npx json-server --watch db.json --port 8080
