import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import SEOPlatform from "./dashboard/SEOPlatform";
import AuthModal from "./dashboard/login/AuthModal";
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. User State Banao
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleRedirect = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/user", {
          method: "GET",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUser(data.user);

          if (location.pathname === "/") {
            navigate("/overview");
          }
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };
    getUser();
  }, [navigate, location.pathname]);

  return (
    <>
    <Toaster position="top-right" />
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGoogleLogin={handleGoogleRedirect}
      />

      <Routes>
        <Route 
          path="/" 
          element={<LandingPage onLaunch={() => setIsModalOpen(true)} />} 
        />

        <Route path="/overview" element={<SEOPlatform user={user} />} />
        <Route path="/indexing" element={<SEOPlatform user={user} />} />
        <Route path="/content" element={<SEOPlatform user={user} />} />
        <Route path="/tools" element={<SEOPlatform user={user} />} />
        <Route path="/serp" element={<SEOPlatform user={user} />} />
        <Route path="/settings" element={<SEOPlatform user={user} />} />
      </Routes>
    </>
  );
}
