import "./index.css";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";


export default function App() {
  // The state `form.isGoing` will drive a checkbox and is a boolean, whereas the rest are strings
  const [form, setForm] = useState({
    user: "",
    ageRange: "",
    state: "",
    isGoing: false
  });
  const [errors, setErrors] = useState({
    user: "",
    ageRange: "",
    state: "",
    isGoing: false
  });
  const [disabled, setDisabled] = useState(true);



  const handleChange = (event) => {
    // Pull out the info of interest
    const { name, type, value, checked } = event.target;
    // Find out which value to use (the actual "value" of the target or its "checked" in the case of a checkbox)
    const valueToUse = type === "checkbox" ? checked : value;
    // Update state
    setForm({ ...form, [name]: valueToUse });
    console.log("changing!");
  };

  const submit = (event) => {
    event.preventDefault();
    const newUser = {
      user: form.user.trim(),
      ageRange: form.ageRange,
      state: form.state,
      isGoing: form.isGoing
    };
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setForm({ user: "", ageRange: "", state: "", isGoing: false });
      })
      .catch((err) => {
        debugger;
      });
  };



  return (
    <div className="App">
      <form onSubmit={submit}>
        <label>
          Name:
          <input
            value={form.user}
            name="user"
            type="text"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "red" }}>
          <div>{errors.user}</div>
        </div>
        <label>
          Email:
          <input
            name="ageRange"
            type="email"
            value={form.ageRange}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name="state"
            type="password"
            value={form.state}
            onChange={handleChange}
          />
        </label>
    
        <div style={{ color: "red" }}>
          <div>{errors.ageRange}</div>
        </div>
        
        <div style={{ color: "red" }}>
          <div>{errors.state}</div>
        </div>
        <label>
          Terms and Conditions:
          <input
            name="isGoing"
            type="checkbox"
            checked={form.isGoing}
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "red" }}>
          <div>{errors.isGoing}</div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
