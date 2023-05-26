import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImg from "../path/BackGround1.png"; 
const RegistrationForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    taxCode: "",
    cccd: "",
  });
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const homePage = () => {
    navigate("/");
  };
  const [errors, setErrors] = useState({});

  const handleOpenDialog = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFormValues({
      fullName: "",
      email: "",
      address: "",
      phone: "",
      taxCode: "",
      cccd: "",
    });
    setErrors({});
  };

  const handleSubmit = () => {
    const validationSchema = yup.object().shape({
      fullName: yup.string().required("Full Name is required"),
      email: yup
        .string()
        .email("Invalid email")
        .matches(/^[a-zA-Z0-9+_.-]+@gmail.com$/, "Invalid email format")
        .required("Email is required"),
      address: yup.string().required("Address is required"),
      phone: yup
        .string()
        .matches(/^\d+$/, "Invalid phone number format")
        .required("Phone is required"),
      taxCode:
        selectedCategory === "business"
          ? yup.string().required("Tax Code is required")
          : yup.string().nullable(),
      cccd: yup.string().required("CCCD is required"),
    });
  
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        toast.success('Sign Up Success'); // Hiển thị toast khi validation thành công
        handleCloseDialog();
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
          // toast.error(error.message); // Hiển thị toast khi có lỗi xảy ra
        });
        setErrors(errors);
      });
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>
        {`
        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}
      </style>
      <div style={{ marginBottom: "100px" }}>
        <h1
          style={{ textAlign: "center", marginBottom: "30px", color: "white" }}
        >
          Let's become a member of Fstyle
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleOpenDialog("personal")}
            sx={{ marginBottom: "15px" }}
            color="success"
          >
            Sign up for personal
          </Button>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog("business")}
            color="success"
          >
            Sign up for business
          </Button>
        </div>
        <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          marginLeft: "135px",
        }}>
        <Button
            variant="contained"
            onClick={homePage}
            sx={{marginRight: "20px"}}
            color="success"
          >
           Back
          </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
            color="success"
            sx={{marginLeft: "20px"}}
          >
            Sign In
          </Button>
        </div>

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>
            Sign Up{" "}
            {selectedCategory === "personal" ? "Individual" : "Business"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="FullName"
              fullWidth
              style={{ marginBottom: "10px" }}
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="Email"
              fullWidth
              style={{ marginBottom: "10px" }}
              name="email"
              value={formValues.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Address"
              fullWidth
              style={{ marginBottom: "10px" }}
              name="address"
              value={formValues.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="Phone"
              fullWidth
              style={{ marginBottom: "10px" }}
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            {selectedCategory === "business" && (
              <TextField
                label="Tax Code"
                fullWidth
                style={{ marginBottom: "10px" }}
                name="taxCode"
                value={formValues.taxCode}
                onChange={handleChange}
                error={!!errors.taxCode}
                helperText={errors.taxCode}
              />
            )}
            <TextField
              label="CCCD"
              fullWidth
              style={{ marginBottom: "10px" }}
              name="cccd"
              value={formValues.cccd}
              onChange={handleChange}
              error={!!errors.cccd}
              helperText={errors.cccd}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit}>Sign Up</Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
