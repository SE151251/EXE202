import React from 'react';
import { useState } from 'react';
import { Container, Grid, Typography, Avatar, Paper, Card, CardContent, CardMedia, Button } from '@mui/material';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Xử lý lưu thông tin cá nhân và bài post
    setIsEditing(false);
  };
  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          height: '300px',
          position: 'relative',
          backgroundColor: 'lightblue',
          marginBottom: '20px',
        }}
      >
        <img
          src="https://karaoke.com.vn/wp-content/uploads/2020/08/1920x1080-2-scaled.jpg"
          alt="Cover Image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              top: '-150px',
              padding: '20px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Avatar
                  sx={{
                    width: '150px',
                    height: '150px',
                    margin: '0 auto',
                  }}
                >
                </Avatar>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5" gutterBottom>
                  Thiện Lê
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: thienle@gmail.com
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Address: Long An
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone: 123456789
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              top: '-100px',
              padding: '20px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Posts
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://uploads-ssl.webflow.com/5ef016ce2ee92e3ee3fdfe51/5ef01f2ec5443d44c0894a9c_an-chay-8.jpeg"
                    alt="Post Image"
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Post Title
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Post Description
                    </Typography>
                    <Button variant="contained" color="primary">
                      Show More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://tamkyrt.vn/hinh-anh-cac-mon-an-chay/imager_2_9208_700.jpg"
                    alt="Post Image"
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Post Title
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Post Description
                    </Typography>
                    <Button variant="contained" color="primary">
                      Show More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxp0ns2C5waLxFo0aLQGBXd4QsG38CffldaoDVfX_9WHBwFyJc3BEHoA0MzrMpG9YuH-I&usqp=CAU"
                    alt="Post Image"
                    />
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Post Title
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Post Description
                      </Typography>
                      <Button variant="contained" color="primary">
                        Show More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            
            </Paper>
          </Grid>
          
        </Grid>
       
      </Container>
    );
  };
  
  export default ProfilePage;
  