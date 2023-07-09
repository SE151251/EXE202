import * as React from "react";
import axiosClient from "../../utils/axiosCustomize";
import SinglePost from "./SinglePost";
import { Box, CircularProgress} from "@mui/material";

export default function RecipeReviewCard() {
  const [data, setData] = React.useState(null);
  const accessToken = localStorage.getItem("access_token");
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/Recipes?$expand=instructions");
      if(response.value){
      setData(response.value.filter((d) => d.Status !== 0) || []);
      }
      else{
        setData(null)
      }
      console.log(response.value);
    } catch (error) {
      setData(null)
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [accessToken]);
  if (data) {
    return (
      <>
        {data.length > 0 ? (
          data.map((p) => (
            <SinglePost
              data={p}
              key={p.RecipeID}
              setData={setData}
              listData={data}
            />
          ))
        ) : (
          <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>Empty List</Box>
        )}
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
