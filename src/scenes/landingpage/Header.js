import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <>
      <AppBar sx={{ background: "#fff", position: "relative" }} elevation={1}>
        <Toolbar>
          <Box
            component="img"
            sx={{
              width: 80,
              height: 70,
            }}
            src="./images/logo.png"
          />
          {/* <Typography
            variant="h4"
            component="h4"
            sx={{ color: "#5eb313", paddingLeft:{md:"42%", xs:0} }}
          >
            FStyle
          </Typography> */}
            <Tabs sx = {{ml: "auto"}}
              >
                <Tab label="Services" />
                <Tab label="About Us"  />
                <Tab label="Contact" />
              </Tabs>
          {/* {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "40%", color: "lightblue" }}>
                Fstyle
              </Typography>
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
              </Tabs>
             
            </>
          )} */}
          <Button
            onClick={handleLogin}
            sx={{ marginLeft: "auto" }}
            variant="contained"
            size="small"
            color="success"
          >
            Sign In
          </Button>
          <Button 
          onClick={handleSignUp}
          sx={{ marginLeft:{ md:"1%", xs: "3%" }}} variant="outlined" size="small" color="success">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
