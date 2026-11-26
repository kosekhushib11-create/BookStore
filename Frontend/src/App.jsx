
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import About from "./components/About";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Courses accessible without login */}
        <Route path="/course" element={<Courses />} />

        {/* Other pages */}
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Login redirects to homepage where login popup is available */}
        <Route
          path="/login"
          element={<Navigate to="/" replace />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Toaster position="top-right" />

    </div>
  );
}

export default App;
