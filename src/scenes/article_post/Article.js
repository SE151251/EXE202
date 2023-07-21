// import * as React from "react";
// import axiosClient from "../../utils/axiosCustomize";
// import SinglePost from "./SinglePost";
// import { Box, CircularProgress} from "@mui/material";

// export default function RecipeReviewCard() {
//   const [data, setData] = React.useState(null);
//   const fetchData = async () => {
//     try {
//       const response = await axiosClient.get("/Recipes?$expand=instructions($expand=instructionimages),Ingredients,RecipeImages");
//       if(response.value){
//       setData(response.value.filter((d) => d.Status !== 0) || []);
//       }
//       else{
//         setData(null)
//       }
//       console.log(response.value);
//     } catch (error) {
//       setData(null)
//       console.error(error);
//     }
//   };
//   React.useEffect(() => {
//     fetchData();
//   }, []);
//   if (data) {
//     return (
//       <>
//         {data.length > 0 ? (
//           data.map((p) => (
//             <SinglePost
//               data={p}
//               key={p.RecipeID}
//               setData={setData}
//               listData={data}
//             />
//           ))
//         ) : (
//           <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>Empty List</Box>
//         )}
//       </>
//     );
//   } else
//     return (
//       <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>
//         <CircularProgress />
//         Loading
//       </Box>
//     );
// }
// import * as React from "react";
// import axiosClient from "../../utils/axiosCustomize";
// import SinglePost from "./SinglePost";
// import { Box, CircularProgress} from "@mui/material";

// export default function RecipeReviewCard() {
//   const [data, setData] = React.useState(null);
//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosClient.get("/Recipes?$expand=instructions($expand=instructionimages),Ingredients,RecipeImages");
//         setData(response.value.filter((d) => d.Status !== 0) || []);
//       } catch (error) {  
//         console.log(error);       
//       }
//     };
//     fetchData();
//   }, []);
//   if (data) {
//     return (
//       <>
//         {data.length > 0 ? (
//           data.map((p) => (
//             <SinglePost
//               data={p}
//               key={p.RecipeID}
//               setData={setData}
//               listData={data}
//             />
//           ))
//         ) : (
//           <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>Empty List</Box>
//         )}
//       </>
//     );
//   } else
//     return (
//       <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>
//         <CircularProgress />
//         Loading
//       </Box>
//     );
// }
import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosCustomize";
import SinglePost from "./SinglePost";
import { Box, CircularProgress, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function RecipeReviewCard() {
  const PAGE_SIZE = 5;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(
        `/Recipes?$expand=instructions($expand=instructionimages),Ingredients,RecipeImages&$top=${PAGE_SIZE}&$skip=${
          (page - 1) * PAGE_SIZE
        }`
      );
      const newData = response.value.filter((d) => d.Status !== 0) || [];
      setData((prevData) => [...prevData, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }

    if (window.scrollY > 100) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      ) : loading ? (
        <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>
          <CircularProgress />
          Loading
        </Box>
      ) : (
        <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>Empty List</Box>
      )}
      {showScrollToTop && (
        <Box sx={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999 }}>
          <IconButton color="success" onClick={scrollToTop} style={{ cursor: "pointer" }}>
            <KeyboardArrowUpIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </>
  );
}
