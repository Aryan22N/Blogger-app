import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import "./Loginform.css";
import axios from "axios";

function Registerform() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/users/adduser`,
      data: state,
    })
      .then(function (response) {
        if (response.data.result === 'validation fail') {
          alert('Registration failed due to validation errors. Check your input.');
          console.error(response.data.show);
        } else {
          console.log("Registration success", response.data);
          navigate("/");
        }
      })
      .catch(function (error) {
        alert("Registration failed due to a server error.");
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form-container"
      >
        <h1>Register</h1>
        <TextField
          name="fname"
          label="First Name"
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="lname"
          label="Last Name"
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="email"
          label="Email"
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="phone"
          label="Phone"
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>

      <small>
        Already have an account? <Link to="/">Login here</Link>
      </small>
    </React.Fragment>
  );
}

export default Registerform;
