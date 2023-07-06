import React from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Typewriter from "typewriter-effect";

const Welcome = () => {
  return (
    <Box mt="24vh">
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        AI-Powered Product Comparisons
      </Typography>
      {/* <Divider variant="middle" /> */}
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: "10vh" }}>
        <Card sx={{ width: "40%" }}>
          <CardContent>
            <Typography variant="h3" component="div">
              Description
            </Typography>
            <Typewriter
              options={{
                string: [
                  " At Avi'sScanner,",
                  "our advanced AI technology is",
                  "at your service to help you",
                  "discover the perfect product.",
                ],
                // autoStart: true,
                // loop: true,
              }}
            ></Typewriter>
            <Typography variant="h6" sx={{ mt: "3vh" }}>
              At Avi'sScanner, our advanced AI technology is at your service to
              help you discover the perfect product. With our unlimited
              database, we provide accurate descriptions and detailed
              comparisons for a wide range of items, from electronics to fashion
              accessories.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Open</Button>
          </CardActions>
        </Card>
        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
        <Card sx={{ width: "40%" }}>
          <CardContent>
            <Typography variant="h3">Comparing</Typography>
            <Typography variant="h6" sx={{ mt: "3vh" }}>
              Using unique product IDs, our AI algorithms swiftly analyze
              features, specifications, and user reviews. Effortlessly compare
              different products side by side, empowering you to make
              well-informed decisions. Our personalized recommendations take
              your preferences into account, saving you valuable time and
              effort. Experience the power of AI to find the best products
              tailored to your needs. Join Avi'sScanner today and unlock a world
              of effortless product comparisons.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Open</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Welcome;
