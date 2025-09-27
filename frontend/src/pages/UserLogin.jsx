import React, { useState } from "react";
import "../styles/form.css";   
import api from '../services/api'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function UserLogin() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  // const [success, setSuccess] = useState(null)
  const navigate = useNavigate();
    const {login} = useAuth();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await api.get('/users');
        const user=res.data
        //setSuccess(res.data);
        const matchedUser = user.find(u => u.name===form.name && u.password===form.password);
        if(matchedUser){
          login({...matchedUser, role:"user"});   // save in context + localStorage
          navigate('/userHome');
        }else{
          alert("invalid credentials");
        }
      } catch (error) {
        console.log("error while registering user: ", error);
        alert("Server error. Please try again later.");
      }
    }
  };

  //  if (success) {
  //   console.log(success)
  //   return (
  //     <div className="form-container">
  //       <h2>User Account Created Successfully 🎉</h2>
  //       <p>Your User ID is: <b>{success.id}</b></p>
  //       <button onClick={() => window.location.href = "/userLogin"} className="center-button">
  //         Login Now
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="page-wrapper">
    <div className="form-container">
      <h2>Login As User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default UserLogin;
