import * as React from "react";
import axiosClient from "../../utils/axiosCustomize";
import SinglePost from "./SinglePost";
import { Box, CircularProgress } from "@mui/material";

export default function RecipeReviewCard() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/Recipes");
        setData(response.value);
        console.log(response.value);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  if (data) {
    return (
      <>
        {data.map((p) => (
          <SinglePost data={p} key={p.RecipeID} />
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

/* post 2  */

/* <Card sx={{ maxWidth: "50vw", m: "auto", mt:10 }}>
  <CardHeader
    avatar={
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        R
      </Avatar>
    }
    action={
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    }
    title="Shrimp and Chorizo Paella"
    subheader="September 14, 2016"
  />
  <CardMedia
    component="img"
    //height="194"
    image="https://bm.edu.vn/nhung-mon-an-chay-tot-cho-suc-khoe/imager_14_2951_700.jpg"
    alt="Paella dish"
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your guests. Add 1 cup of frozen peas along with the
      mussels, if you like.
    </Typography>
    <Chip
          icon={<AccessTimeOutlinedIcon />}
          label="Coking time - 10 mins"
          sx={{ backgroundColor: "#B7FF71", mt: 3 }}
        ></Chip>
        <Chip
          icon={<PermIdentityOutlinedIcon />}
          label="Serves - 10"
          variant="outlined"
          sx={{ backgroundColor: "#B7FF71", ml: 3, mt: 3 }}
        />
  </CardContent>
  <CardActions disableSpacing>
    <IconButton aria-label="add to favorites">
      <FavoriteIcon />
    </IconButton>
    <IconButton aria-label="share">
      <ShareIcon />
    </IconButton>
    <ExpandMore
      expand={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandMore>
  </CardActions>
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography variant="h4">Ingredient:</Typography>
      <Stack direction="row" alignItems="center">
        {" "}
        <span
          style={{
            backgroundColor: "#B7FF71",
            height: "24px",
            width: "24px",
            borderRadius: "50%",
            textAlign: "center",
            marginRight: "1vw",
          }}
        >
          1
        </span>
        <Typography paragraph sx={{ paddingTop: "15px" }}>
          Ingredient 1
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        {" "}
        <span
          style={{
            backgroundColor: "#B7FF71",
            height: "24px",
            width: "24px",
            borderRadius: "50%",
            textAlign: "center",
            marginRight: "1vw",
          }}
        >
          2
        </span>
        <Typography paragraph sx={{ paddingTop: "15px" }}>
          Ingredient 2
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        {" "}
        <span
          style={{
            backgroundColor: "#B7FF71",
            height: "24px",
            width: "24px",
            borderRadius: "50%",
            textAlign: "center",
            marginRight: "1vw",
          }}
        >
          3
        </span>
        <Typography paragraph sx={{ paddingTop: "15px" }}>
          Ingredient 3
        </Typography>
      </Stack>
    </CardContent>
    <Divider />
    <CardContent>
      <Typography variant="h4">Instructions:</Typography>
      <Typography paragraph sx={{mt:3}}>
        <strong>Step 1:</strong> Heat 1/2 cup of the broth in a pot until
        simmering, add saffron and set aside for 10 minutes.
      </Typography>
      <Stack direction="row" spacing={3}>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
      </Stack>
      <Typography paragraph  sx={{mt:3}}>
        <strong>Step 2:</strong>
        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
        over medium-high heat. Add chicken, shrimp and chorizo, and cook,
        stirring occasionally until lightly browned, 6 to 8 minutes.
        Transfer shrimp to a large plate and set aside, leaving chicken and
        chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
        onion, salt and pepper, and cook, stirring often until thickened and
        fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
        cups chicken broth; bring to a boil.
      </Typography>
      <Stack direction="row" spacing={3}>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
   
      </Stack>
      <Typography paragraph  sx={{mt:3}}>
        <strong>Step 3:</strong>
        Add rice and stir very gently to distribute. Top with artichokes and
        peppers, and cook without stirring, until most of the liquid is
        absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
        shrimp and mussels, tucking them down into the rice, and cook again
        without stirring, until mussels have opened and rice is just tender,
        5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
      </Typography>
      <Stack direction="row" spacing={3}>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
      </Stack>
      <Typography  sx={{mt:3}}>
        <strong>Step 4:</strong>
        Set aside off of the heat to let rest for 10 minutes, and then
        serve.
      </Typography>
      <Stack direction="row" spacing={3}>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        </Card>
       
      </Stack>
    </CardContent>
  </Collapse>
</Card> */
