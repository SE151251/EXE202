import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import {Box, Chip, Divider, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axiosClient from "../../utils/axiosCustomize";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import * as React from "react";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SinglePost({data}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDetelePost = async (id) => {
    console.log(id);
    const confirmed = window.confirm("Are you sure you want to delete this Article?");
    if (confirmed) {
      try {
        const data = await axiosClient.delete(`/Recipes/${id}`)
        console.log(data);
        const newList = listData.filter((d)=> d.RecipeID !== id)
        console.log("data old:", listData);
        console.log("removed: ",newList);
        setData(newList)    
        toast.success("Delete successful")
      } catch (error) {
        toast.error("Delete failed!")
      }
    }
   
  };
  return (
    <>
    <Card sx={{ maxWidth: "50vw", m: "auto", mb: 5 }}>
      <CardMedia
        component="img"
        height={500}
        image={`${data.RecipeImages[0].Source}`}
        alt="alt name"
      />
      <CardContent>
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography variant="h2">{data.RecipeTitle}</Typography>
          <span style={{cursor:"pointer"}} onClick={() => handleDetelePost(data.RecipeID)}><DeleteForeverOutlinedIcon color="error"/></span>
          </Box>  
        <Divider sx={{mt:2, mb:2}}/>
        <Typography variant="h6" color="text.secondary">
          {data.RecipeDescription}
        </Typography>
        <Chip
          icon={<AccessTimeOutlinedIcon />}
          label={`Cook time - ${data.CookTimes} mins`}
          sx={{ backgroundColor: "#B7FF71", mt: 3, fontSize: 15 }}
        ></Chip>
        <Chip
          icon={<PermIdentityOutlinedIcon />}
          label={`Serves - ${data.Serving}`}
          variant="outlined"
          sx={{ backgroundColor: "#B7FF71", ml: 3, mt: 3, fontSize: 15 }}
        />
        <Chip
          icon={<FavoriteBorderIcon />}
          label={`Interactions - ${data.Interacts}`}
          sx={{ backgroundColor: "#B7FF71", mt: 3,  ml: 3, fontSize: 15 }}
        ></Chip>
       <Box> <Chip
            icon={<AttachMoneyIcon />}
            color="info"
            label={`Price - ${data.UnitsPrice === null ? 0 : data.UnitsPrice}`}
            sx={{ mt: 3, fontSize: 15 }}
          ></Chip></Box>
      </CardContent>
      <CardActions disableSpacing>
        <Typography sx={{color:"blueviolet"}}>Read more...</Typography>
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
          <Typography variant="h4">Ingredients:</Typography>
          {data.Ingredients.map((i)=>(
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
              {i.Step}
            </span>
            <Typography paragraph sx={{ paddingTop: "15px" }}>
              {i.Content}
            </Typography>
          </Stack>
          ))}
        </CardContent>
        <Divider />
        <CardContent>
          {data.Instructions.map((s)=>(
            <>
             <Typography variant="h4">Instructions:</Typography>
          <Typography paragraph sx={{mt:3}}>
            <strong>Step {s.Step}: </strong> {s.Content}
          </Typography>
          <Stack direction="row" spacing={3}>
            {s.InstructionImages.map((p)=>(
               <Card>
               <CardMedia
                 component="img"
                 height="100"
                 image={p.Source}
                 alt={p.ImageID}
               />
             </Card>
            ))}
           
            {/* <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/261947190_457002945995743_5381758503468267309_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=2hb3E7fNEEEAX_7uOy8&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSpBpMxkrlhwRQSRCRRYKfBVb2fmkTy0J3jnJuFXaqp3g&oe=6499314F"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/295522540_572504574424046_5221456215682644692_n.png?stp=dst-png_p296x100&_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=61ogCq3OKV0AX-LnJa5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSj3mJ9nxLT4X10Q0iMPbji2l03hXlu93r6uZZ-sGyS3g&oe=649918F0"
                alt="Paella dish"
              />
            </Card> */}
          </Stack>
            </>
          ))}
         
          {/* <Typography paragraph  sx={{mt:3}}>
            <strong>Step 2: </strong>
            Sprinkle the feta cheese over the top of the salad.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/350100497_751667733103103_5082051102486471400_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=aee45a&_nc_ohc=AwiMlTPXhv4AX-iR7zL&_nc_oc=AQn65G_y2H7p4PI0V57I9i7--6z5pZ7FSxpejkcJUVfaN-wPzYlE91hpbxr-nxOSGguZoVQVX1iU-IOx5miBUv6E&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT5vDaRnC9teB2Mh62ysJxiY8N5q5A5NvKfMzyiZURV-A&oe=64993A70"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/350232361_112697031835089_640612898720774978_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=aee45a&_nc_ohc=ubyjiszsKjkAX9Sh7bp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQGqulmrQnSUuIIh2pJFa0yw2zzjhI5UmdBkXds_4o4Bw&oe=64992235"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/349333734_210116975204888_8201668212599781743_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=aee45a&_nc_ohc=Dl1nNREO6eQAX9GzgJu&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSQjqjxl3LxonTxDM-lazC4dxdEMOCdCwRTR4W9JoRREw&oe=64992D0C"
                alt="Paella dish"
              />
            </Card>
          </Stack>
          <Typography paragraph  sx={{mt:3}}>
            <strong>Step 3: </strong>
            Drizzle the balsamic vinaigrette over the salad and toss to combine.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/350130957_2654933774645377_5556420024965482547_n.png?stp=dst-png_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=gim1_ehV_OMAX9BpHjV&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQ6vVdrGovukPdx7b9dhXcUSWThxjPpphDI_4SKedUDBQ&oe=649948D5"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/349850467_625225099658619_7219855239855306838_n.png?stp=dst-png_p160x160&_nc_cat=101&ccb=1-7&_nc_sid=aee45a&_nc_ohc=cNOLSLAxfREAX8l6Tgf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRSr5d-cqAAUBOeOjstdKxW7jkgzfWX3glqnEnv4gZGPQ&oe=649917FF"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/350137509_779062906965415_8567488401047703388_n.png?stp=dst-png_s261x260&_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_ohc=yrI6hBRoEWYAX_1iDRx&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTghI206JcgahsnRPJHPL6v4-MNue9B76dKFZgl3qGLyQ&oe=64991898"
                alt="Paella dish"
              />
            </Card>
          </Stack>
          <Typography  sx={{mt:3, mb: 3}}>
            <strong>Step 4: </strong>
            Serve and enjoy!
          </Typography>
          <Stack direction="row" spacing={3}>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/261521170_365189128370631_6527585224574757775_n.png?stp=dst-png_p206x206&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_ohc=-TuCnpovCAUAX-ShMa5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRwFMZ6m4uTuEqY8EcPikzFquoUQKxOQzNwht7Rhpb4EA&oe=64994A42"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/311873170_655868886094988_7203876895053924887_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=aee45a&_nc_ohc=-xJeOtNj4sUAX_HZ26H&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRIV1BNSJVTsxDDUhKqCdK3jVLWVGDJqlHk5TIrKY__zA&oe=64992C9F"
                alt="Paella dish"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.xx.fbcdn.net/v/t1.15752-9/349927890_783892329849396_8906361875176356074_n.png?stp=dst-png_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=K7ho5hz0KCUAX8upXFN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRqvQxTvGxNp2gqHtVxyuPEpxa5hqILXMmr6MBYv2euSg&oe=649920C9"
                alt="Paella dish"
              />
            </Card>
           
          </Stack> */}
        </CardContent>
      </Collapse>
    </Card>

</>
  );
}

