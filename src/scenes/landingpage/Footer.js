import { Grid, Typography } from "@mui/material";
import React from "react";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { SocialIcon } from "react-social-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
export default function Footer() {
  return (
    <div style={{ backgroundColor: "#B7FF71", minHeight: "20vh", marginTop: "5vh"}}>
      <Grid container sx={{pt:2}}>
        <Grid item xs={6} sx={{pl:"5vw"}}>
        <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <LocationOnOutlinedIcon
                  fontSize="small"
                  sx={{ pt: 0.5, mr: 1 }}                 
                />
              </div>
              <strong>Địa chỉ</strong>
            </div>
          <address>
          <span>Khu Công Nghệ Cao, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh</span>         
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <PhoneCallbackOutlinedIcon
                  fontSize="small"
                  sx={{ pt: 0.5, mr: 1 }}
                />
              </div>
              <strong>: +84382212074</strong>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <EmailOutlinedIcon fontSize="small" sx={{ pt: 0.5, mr: 1 }} />
              </div>
              <strong>: dev@fpt.edu.vn</strong>
            </div>
          </address>
        </Grid>

        <Grid item xs={6} sx={{pl:"20vw", mt:{md:"5vh", xs:"3vh"}}}>
          <SocialIcon
            url="https://www.facebook.com/"
            target="_blank"
            style={{ height: 40, width: 40, color: "#ffffff", marginRight:"1vw", marginBottom:"1vh" }}
          />
          <SocialIcon
            url="https://www.youtube.com/"
            target="_blank"
            style={{ height: 40, width: 40, marginRight:"1vw", marginBottom:"1vh" }}
          />
          <SocialIcon
            url="https://gmail.com/"
            target="_blank"
            style={{ height: 40, width: 40, marginRight:"1vw", marginBottom:"1vh" }}
          />
          <SocialIcon
            url="https://twitter.com/"
            target="_blank"
            style={{ height: 40, width: 40, marginRight:"1vw", marginBottom:"1vh" }}
          />
          <SocialIcon
            url="https://tiktok.com/"
            target="_blank"
            style={{ height: 40, width: 40, marginRight:"1vw", marginBottom:"1vh" }}
          />
          <SocialIcon
            url="https://instagram.com/"
            target="_blank"
            style={{ height: 40, width: 40 , marginBottom:"1vh"}}
          />
        </Grid>
      </Grid>
      <Typography sx={{textAlign:"center", mt:"2vh"}}>Copyright © By Team <strong>Thai Quoc Toan</strong>.</Typography>
    </div>
  );
}
