import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";

export default function Login({ setIsLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("User name required")        
        .max(30, "User is too long!"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "At least 6 characters")
        .max(20, "Password is too long, max 20 characters!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      localStorage.setItem("token", "abc123");
      setIsLogin("token");
      navigate("/dashboard");
    },
  });

  const navigate = useNavigate();
  const checkDisabled = (password, username) => {
    return password === "" || username === "";
  };

  return (
    <div style={{ width:"100vw", height:"80vh", paddingTop:"20vh", backgroundImage: 'url("./images/BackgroundLogin.png")', backgroundSize: "cover" }} 
    >
     <Container component="main" maxWidth="xs" sx={{backgroundColor:"rgba(255, 255, 255, 0.5)", p:5}}>
      <Box
        sx={{
          // m: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ 
          m: 1, 
          bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="User Name"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />         
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={checkDisabled(formik.values.password, formik.values.email)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      </Container> 
    </div>
  );
}
