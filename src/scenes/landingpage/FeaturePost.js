import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://www.chuphinhsanpham.vn/wp-content/uploads/2016/04/chup-hinh-mon-an-dep-c-photo-0002.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://cdn.tgdd.vn/Files/2019/03/07/1153472/chinese-new-year_600x800.jpg',
    imageLabel: 'Image Text',
  },
];

function FeaturedPost() {
  return (
    <Grid container spacing={0.1} sx={{marginBottom: "50px"}}>
      {featuredPosts.map((post, index) => (
        <Grid item xs={12} md={6} key={index}>
          {/* <CardActionArea component="a" href="#"> */}
            <Card sx={{ display: 'flex', width: "80%", ml:"10%", mr:"10%"}}>
              <CardContent sx={{ flex: 1, }}>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {post.date}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                image={post.image}
                alt={post.imageLabel}
              />
            </Card>
          {/* </CardActionArea> */}
        </Grid>
      ))}
    </Grid>
  );
}

export default FeaturedPost;
