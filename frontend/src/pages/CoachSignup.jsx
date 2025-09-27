import React, { useState } from "react";
import "../styles/form.css";   
import api from '../services/api'

function CoachSignUp() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    gender: "",
    dob: "",
    mobilenumber: "",
    speciality:""
   
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!/^\d{10}$/.test(form.mobilenumber)) newErrors.mobilenumber = "Mobile number must be 10 digits";
    if (!form.speciality.trim()) newErrors.speciality = "speciality is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await api.post('/coaches', form);
        setSuccess(res.data);
      } catch (error) {
        console.log("error while registering coach: ", error);
        alert("Server error. Please try again later.");
      }
    }
  };

   if (success) {
    console.log(success)
    return (
      <div className="form-container">
        <h2>You're a Coach now 🎉</h2>
        <p>Your Caoch ID is: <b>{success.id}</b></p>
        <button onClick={() => window.location.href = "/coachLogin"} className="center-button">
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
    <div className="form-container">
      <h2>Life Coach Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        {errors.dob && <p className="error">{errors.dob}</p>}

        <input type="number" name="mobilenumber" placeholder="Mobile Number" value={form.mobilenumber} onChange={handleChange} />
        {errors.mobilenumber && <p className="error">{errors.mobilenumber}</p>}

        <input name="speciality" placeholder="speciality" value={form.speciality} onChange={handleChange} />
        {errors.speciality
         && <p className="error">{errors.speciality}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default CoachSignUp;
