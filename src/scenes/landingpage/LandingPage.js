import Header from "./Header";
import Carousels from "./Carousel/Carousel";
import { Box, Button } from "@mui/material";
import FeaturedPost from "./FeaturePost";
import AppFeatures from "./FeatureApp";
import Pricing from "./Pricing";
import VisibilitySensor from 'react-visibility-sensor';
import Footer from "./Footer";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import React, { useState } from "react";

function LandingPage() {
  const [visible, setVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleChangeVisibility = (isVisible) => {
    setIsVisible(isVisible);
    };
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div>
      <Header />
      <Box flex={2} padding={4}>
        {/* <VisibilitySensor onChange={handleChangeVisibility}>
          <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}> */}
            <Carousels />
          {/* </div>
        </VisibilitySensor> */}
      </Box>
      <VisibilitySensor partialVisibility>
        {({ isVisible: isVisibleFeatured }) => (
          <div style={{ opacity: isVisibleFeatured ? 1 : 0, transition: 'opacity 0.5s' }}>
            <FeaturedPost />
          </div>
        )}
      </VisibilitySensor>
      <VisibilitySensor partialVisibility>
        {({ isVisible: isVisibleAppFeatures }) => (
          <div style={{ opacity: isVisibleAppFeatures ? 1 : 0, transition: 'opacity 0.5s' }}>
            <AppFeatures />
          </div>
        )}
      </VisibilitySensor>
      <VisibilitySensor partialVisibility>
        {({ isVisible: isVisiblePricing }) => (
          <div style={{ opacity: isVisiblePricing ? 1 : 0, transition: 'opacity 0.5s' }}>
            <Pricing />
          </div>
        )}
      </VisibilitySensor>
      <VisibilitySensor partialVisibility>
        {({ isVisible: isVisibleFooter }) => (
          <div style={{ opacity: isVisibleFooter ? 1 : 0, transition: 'opacity 0.5s' }}>
            <Footer />
          </div>
        )}
      </VisibilitySensor>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 25,
          display: visible ? "inline" : "none",
        }}
        onClick={scrollToTop}
        size="small"
        color="success"
      >
       <span><ArrowUpwardSharpIcon /></span>  
      </Button>
    </div>
  );
}
export default LandingPage;
