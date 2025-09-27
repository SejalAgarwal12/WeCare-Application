import React, { useState } from "react";
import "../styles/form.css";   
import api from '../services/api'

function UserSignUp() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    gender: "",
    dob: "",
    email: "",
    mobilenumber: "",
    pincode: "",
    city: "",
    state: "",
    country: ""
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
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!/^\d{10}$/.test(form.mobilenumber)) newErrors.mobilenumber = "Mobile number must be 10 digits";
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await api.post('/users', form);
        setSuccess(res.data);
      } catch (error) {
        console.log("error while registering user: ", error);
        alert("Server error. Please try again later.");
      }
    }
  };

   if (success) {
    console.log(success)
    return (
      <div className="form-container">
        <h2>User Account Created Successfully 🎉</h2>
        <p>Your User ID is: <b>{success.id}</b></p>
        <button onClick={() => window.location.href = "/userLogin"} className="center-button">
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
    <div className="form-container">
      <h2>User Profile</h2>
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

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="number" name="mobilenumber" placeholder="Mobile Number" value={form.mobilenumber} onChange={handleChange} />
        {errors.mobilenumber && <p className="error">{errors.mobilenumber}</p>}

        <input type="number" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
        {errors.pincode && <p className="error">{errors.pincode}</p>}

        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        {errors.city && <p className="error">{errors.city}</p>}

        <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
        {errors.state && <p className="error">{errors.state}</p>}

        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
        {errors.country && <p className="error">{errors.country}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default UserSignUp;
