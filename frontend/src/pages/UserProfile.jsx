import React from 'react'
import {useAuth} from '../context/AuthContext'
import '../styles/profile.css'
import { useNavigate } from 'react-router-dom';


function UserProfile() {
   const { authUser } = useAuth();
   const navigate = useNavigate();
   if (!authUser) return <p>No user logged in</p>
  return (
    <div className="profile-card">
      <h2>Hey User!! Your Profile</h2>
      <div className="profile-details">
        <p><b>ID:</b> {authUser.id}</p>
        <p><b>Name:</b> {authUser.name}</p>
        <p><b>Email:</b> {authUser.email}</p>
        <p><b>Gender:</b> {authUser.gender}</p>
        <p><b>Date of Birth:</b> {authUser.dob}</p>
        <p><b>Mobile:</b> {authUser.mobilenumber}</p>
        <p><b>City:</b> {authUser.city}</p>
      </div>
        <button onClick={() => navigate('/userHome')}>Go Home</button>

    </div>

  )
}

export default UserProfile