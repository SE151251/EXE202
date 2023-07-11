import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Box, Button, Chip, Divider, Menu, Stack, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled } from "@mui/material/styles";
import * as React from "react";
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import axiosClient from "../../utils/axiosCustomize";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
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

export default function SinglePost({data, listData, setData}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
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
        setAnchorEl(null);
        toast.success("Delete successful")
      } catch (error) {
        setAnchorEl(null);
        toast.error("Delete failed!")
      }
    }
   
  };
  const handleUpdatePost = async (id) => {
    console.log(id);
    setAnchorEl(null);
    navigate(`/updatepost/${id}`)
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
          <Typography  variant="h2">{data.RecipeTitle}</Typography>
          <Box>        
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem onClick={() => handleUpdatePost(data.RecipeID)} >
        <Box sx={{display:"flex", justifyContent: "center", alignItems:"center", pr:1, pl: 1}}>
        <span><EditOutlinedIcon color="info"/></span>
        <span style={{marginBottom:"7px", fontSize:18, marginLeft:"5px"}}>Update</span>
        </Box>
        
        </MenuItem>
        <MenuItem onClick={() => handleDetelePost(data.RecipeID)} >
        <Box sx={{display:"flex", justifyContent: "center", alignItems:"center", pr:1, pl: 1}}>
        <span><DeleteForeverOutlinedIcon color="error"/></span>
        <span style={{marginBottom:"7px", fontSize:18, marginLeft:"5px"}}>Delete</span>
        </Box>
        </MenuItem>
      </Menu>
          </Box>
          </Box>     
          <Divider sx={{mt:2, mb:2}}/>
          <Typography variant="h6">
            {data.RecipeDescription}
          </Typography>
          <Chip
            icon={<AccessTimeOutlinedIcon />}
            label={`Cook time - ${data.CookTimes} mins`}
            sx={{ backgroundColor: colors.greenAccent[800], mt: 3, fontSize: 15 }}
          ></Chip>
          <Chip
            icon={<PermIdentityOutlinedIcon />}
            label={`Serves - ${data.Serving}`}
            variant="outlined"
            sx={{ backgroundColor: colors.greenAccent[800], ml: 3, mt: 3, fontSize: 15 }}
          />
          <Chip
            icon={<FavoriteBorderIcon />}
            label={`Interactions - ${data.Interacts}`}
            sx={{ backgroundColor: colors.greenAccent[800], mt: 3,  ml: 3, fontSize: 15 }}
          ></Chip>
           <Box> <Chip
            icon={<AttachMoneyIcon />}            
            label={`Price:  ${data.UnitsPrice === null ? 0 : data.UnitsPrice}$`}
            sx={{ backgroundColor: colors.redAccent[700], mt: 3, fontSize: 15 }}
          ></Chip></Box>
           <Box> <Chip
            icon={<FoodBankOutlinedIcon />}          
            label={`Recipe Type: ${data.RecipeType}`}
            sx={{ backgroundColor: colors.blueAccent[800], mt: 3, fontSize: 15 }}
          ></Chip></Box>
        </CardContent>
        <CardActions disableSpacing>
          <Typography sx={{color:"blueviolet"}}>{expanded ? "Read less..." : "Read more..."}</Typography>
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
                  backgroundColor: colors.greenAccent[800],
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
            </Stack>
              </>
            ))}
           
          </CardContent>
        </Collapse>
      </Card>
  </>
  );
}

