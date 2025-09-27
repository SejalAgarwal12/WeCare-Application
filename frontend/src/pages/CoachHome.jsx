import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/userHome.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CoachHome() {
  const [apt, setApt] = useState([]);
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const fetchBooking = async () => {
    const res = await api.get("/bookings");
    const userBookings = res.data.filter((b) => b.coachId == authUser.id);
    setApt(userBookings);
  };
  useEffect(() => {
    if (authUser) {
      fetchBooking();
    }
  }, [authUser]);
  return (
    <div className="user-home">
      <h2>MY SCHEDULES</h2>
      <div className="coach-list">
        {apt.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          apt.map((a) => (
            <div key={a.id} className="coach-card">
              <h2>
                Appointment Date: <br />{" "}
                <span style={{ textAlign: "center" }}>{a.appointmentDate}</span>
              </h2>
              <p>
                <b>Slot:</b> {a.slot}
              </p>
              <p>
                <b>Booking Id:</b> {a.id}
              </p>
              <p>
                <b>User Id:</b> {a.userId}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CoachHome;
