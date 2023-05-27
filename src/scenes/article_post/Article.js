import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip, Divider, Stack } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Card sx={{ maxWidth: "50vw", m: "auto" }}>
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
        image="https://media.vneconomy.vn/images/upload/2021/04/21/intro-1557871096-1561604692003790464165.jpg"
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
            1 head of lettuce, chopped
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
            1 large carrot, geated
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
            1 large cucumber, sliced
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
              4
            </span>
            <Typography paragraph sx={{ paddingTop: "15px" }}>
            1 large apple, chopped
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
              5
            </span>
            <Typography paragraph sx={{ paddingTop: "15px" }}>
            1 cup of cherry tomatoes, halved
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
              6
            </span>
            <Typography paragraph sx={{ paddingTop: "15px" }}>
            1/2 cup raisins
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
              7
            </span>
            <Typography paragraph sx={{ paddingTop: "15px" }}>
            1/2 cup of crumbled feta cheese
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
              8
            </span>
            <Typography paragraph sx={{ paddingTop: "15px" }}>
            1/4 cup of balasamic vinaigrette
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="h4">Instructions:</Typography>
          <Typography paragraph sx={{mt:3}}>
            <strong>Step 1: </strong> In a large salad bowl, combine the chopped lettuce, grated carrot, sliced cucumber, chopped apple, cherry tomatoes, and raisins.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.15752-9/271394097_598629787837130_4753191555312379651_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=V8Rez5magbUAX-KR1yd&_nc_ht=scontent.fsgn2-9.fna&oh=03_AdQlRC97GKFb0V_hLmedI3Fa1bAu8xctUEyd3_dC9y8ocw&oe=64991F75"
                alt="Paella dish"
              />
            </Card>
            <Card>
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
            </Card>
          </Stack>
          <Typography paragraph  sx={{mt:3}}>
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
           
          </Stack>
        </CardContent>
      </Collapse>
    </Card>


   {/* post 2  */}

  <Card sx={{ maxWidth: "50vw", m: "auto", mt:10 }}>
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
</Card>
</>
  );
}
