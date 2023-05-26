import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faPizzaSlice,
  faIceCream,
  faHamburger,
  faCocktail,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faUtensils,
    title: "Healthy Recipes",
    description: "Discover a variety of healthy recipes for every meal.",
  },
  {
    icon: faCoffee,
    title: "Beverages",
    description: "Explore a wide range of delicious beverage options.",
  },
  {
    icon: faPizzaSlice,
    title: "Pizza Delights",
    description: "Indulge in mouth-watering pizza flavors and combinations.",
  },
  {
    icon: faIceCream,
    title: "Sweet Treats",
    description: "Satisfy your sweet tooth with delectable dessert recipes.",
  },
  {
    icon: faHamburger,
    title: "Burger Specials",
    description: "Discover unique and flavorful burger creations.",
  },
  {
    icon: faCocktail,
    title: "Cocktail Mixology",
    description: "Learn how to craft refreshing and exciting cocktails.",
  },
];

function AppFeatures() {
  return (
    <>
      <Box flex={2} padding={2} >
        <Typography color="#5eb313" mg={10} align="center" fontWeight="bold" sx={{fontSize:{md:"48px", xs:"30px"}}}>
        Main Feature App
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <FontAwesomeIcon icon={feature.icon} size="3x" color="#6cc51d" />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                {feature.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AppFeatures;
