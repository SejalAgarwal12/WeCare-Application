import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/userHome.css";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const [coaches, setCaoches] = useState([]);
  const navigate = useNavigate();

  const fetchCoaches = async () => {
    await api
      .get("/coaches")
      .then((res) => setCaoches(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCoaches();
  }, []);

  async function bookAppointment(coach) {
    try {
      alert(`Book with Coach ${coach.name}`);
      const newUserId = window.prompt("Enter your userid:")
      const newDate = window.prompt("Enter appointment date (YYYY-MM-DD):");
      const newSlot = window.prompt("Enter slot:");

      if (!newUserId || !newDate || !newSlot) {
        alert("Reschedule aborted! Date and slot are required.");
        return;
      }
      
      const payload = {
      appointmentDate: newDate,
      slot: newSlot,
      userId: newUserId,
      coachId: coach.id
      }
      const res = await api.post(`/bookings`, payload);
      if (res.status == 201) {
        navigate("/userAppointments");
      } else {
        alert(`cannot Book appointment with Coach ${coach.name}`);
      }
    } catch (error) {
      console.log("errror while booking new appointment");
      alert("errror while booking new appointment");
    }
  }
  return (
    <div className="user-home">
      <h2>Available Coaches</h2>
      <div className="coach-list">
        {coaches.map((coach) => (
          <div key={coach.id} className="coach-card">
            <h3>{coach.name}</h3>
            <p>
              <b>Gender:</b> {coach.gender}
            </p>
            <p>
              <b>DOB:</b> {coach.dob}
            </p>
            <p>
              <b>Email:</b> {coach.email}
            </p>
            <p>
              <b>Mobile:</b> {coach.mobilenumber}
            </p>
            <p>
              <b>Speciality:</b> {coach.speciality}
            </p>
            <button onClick={() => bookAppointment(coach)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
