import React from 'react'
import {useAuth} from '../context/AuthContext'
import '../styles/profile.css'
import { useNavigate } from 'react-router-dom';

function CoachProfile() {
    const {authUser} = useAuth();
    const navigate = useNavigate();
  return (
    <div className="profile-card">
      <h2>Hey Coach!! Your Profile</h2>
      <div className="profile-details">
        <p><b>ID:</b> {authUser.id}</p>
        <p><b>Name:</b> {authUser.name}</p>
        <p><b>Gender:</b> {authUser.gender}</p>
        <p><b>Date of Birth:</b> {authUser.dob}</p>
        <p><b>Mobile:</b> {authUser.mobilenumber}</p>
        <p><b>Speciality:</b> {authUser.speciality}</p>
      </div>
      <button onClick={() => navigate('/coachHome')}>Go Home</button>
    </div>
  )
}

export default CoachProfile