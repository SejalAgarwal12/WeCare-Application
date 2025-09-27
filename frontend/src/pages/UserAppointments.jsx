import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/userHome.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserAppointments() {
  const [apt, setApt] = useState([]);
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const fetchBooking = async () => {
    const res = await api.get("/bookings");
    const userBookings = res.data.filter((b) => b.userId == authUser.id);
    setApt(userBookings);
  };
  useEffect(() => {
    if (authUser) {
      fetchBooking();
    }
  }, [authUser]);

  async function cancelAppointment(appoint) {
    try {
      const confirm = window.confirm(
        "Are you sure ypu want to cancel this appointment?"
      );
      if (confirm) {
        await api.delete(`/bookings/${appoint.id}`);
        alert("Appointment deleted successfully");
        //navigate("/userAppointments");
        fetchBooking(); //update the page
      } else {
        alert("Please Try Again!!");
      }
    } catch (error) {
      alert("Cancellation aborted!");
    }
  }

  async function rescheduleAppointment(appoint) {
    try {
      const newDate = window.prompt("Enter new appointment date (YYYY-MM-DD):",appoint.appointmentDate);
      const newSlot = window.prompt("Enter new slot:", appoint.slot);

      if (!newDate || !newSlot) {
        alert("Reschedule aborted! Date and slot are required.");
        return;
      }
      const payload = {
        ...appoint,
        appointmentDate: newDate,
        slot: newSlot,
      };
      const res = await api.put(`/bookings/${appoint.id}`, payload);
      if (res.status === 200) {
        alert("booking rescheduled successfully");
        //navigate('/userAppointments')
        fetchBooking();
      } else {
        alert("some error occured!!");
      }
    } catch (error) {
      console.log("error occured while rescheduling");
      alert("Try Rescheduling again!!");
    }
  }

  return (
    <div className="user-home">
      <h2>Upcoming Appointments</h2>
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
                <b>Coach Id:</b> {a.coachId}
              </p>
              <p>
                <b>User Id:</b> {a.userId}
              </p>
              <button
                style={{ backgroundColor: "rgb(3, 68, 51)" }}
                onClick={() => rescheduleAppointment(a)}
              >
                Reschedule Appointment
              </button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => cancelAppointment(a)}
              >
                Cancel Appointment
              </button>
            </div>
          ))
        )}
      </div>
      <button onClick={() => navigate("/userHome")}>GO BACK</button>
    </div>
  );
}

export default UserAppointments;
