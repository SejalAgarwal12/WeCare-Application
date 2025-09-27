import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { authUser, logout } = useAuth();
  return (
    <nav
      style={{
        padding: "15px",
        background: "#141414ff",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>WeCare</h2>
      <div>
        {authUser ? (
          <>
            {authUser.role === "user" ? (
              <>
              <Link
                to="/userProfile"
                style={{ marginRight: "20px", color: "white",textDecoration:"none" }}
              >
                View Profile
              </Link>
              <Link
                to="/userAppointments"
                style={{ marginRight: "20px", color: "white",textDecoration:"none" }}
              >
                My Appointments
              </Link>
              </>
            ) : (
              <Link
                to="/coachProfile"
                style={{ marginRight: "20px", color: "white",textDecoration:"none" }}
              >
                View Profile
              </Link>
            )}

            <button
              onClick={logout}
              style={{
                marginRight: "20px",
                background: "rgba(28, 130, 103, 1)",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
            <span>Call us at: +91 1234567890</span>
          </>
        ) : (
          <span>Call us at: +91 1234567890</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
