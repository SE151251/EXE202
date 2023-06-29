import * as React from "react";
import axiosClient from "../../utils/axiosCustomize";
import SinglePost from "./SinglePost";
import { Box, CircularProgress } from "@mui/material";

export default function RecipeReviewCard() {
  const [data, setData] = React.useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/Recipes");
      setData(response.value.filter((d)=> d.Status !== 0) || []);
      console.log(response.value);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => { 
    fetchData();
  }, []);
  if (data) {
    return (
      <>
        {data.map((p) => (
          <SinglePost data={p} key={p.RecipeID} setData={setData} listData={data}/>
        ))}
      </>
    );
  } else
    return (
      <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>
        <CircularProgress />
        Loading
      </Box>
    );
}