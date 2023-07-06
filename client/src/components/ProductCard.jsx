import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Skeleton,
  Box,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

function ProductCard({
  product,
  isLoading,
  setProducts,
  id,
  productImages,
  idx,
}) {
  return (
    <Box style={{ width: "32%" }}>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={(e) =>
          setProducts((products) => {
            return { ...products, [id]: e.target.value };
          })
        }
        sx={{ width: "100%", my: 2 }}
      />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} animation="wave" />

          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            sx={{ bgcolor: "grey.500" }}
            variant="circular"
            width={"5vw"}
            height={"5vw"}
          />
          <Skeleton
            sx={{ bgcolor: "grey.450" }}
            variant="rectangular"
            width={"100%"}
            height={"20vh"}
            animation="wave"
          />
          <Skeleton
            sx={{ bgcolor: "grey.350" }}
            variant="rounded"
            width={"100%"}
            height={"20vh"}
            m={2}
          />
        </Box>
      ) : (
        product && (
          <Box>
            <Card sx={{ maxWidth: 420 }}>
              <CardMedia
                sx={{ height: "50vh" }}
                image={productImages[idx]}
                title="product"
              />
              <CardContent>
             {" "}
                <Typography
                  sx={{ fontSize: "1.5rem" }}
                  color="text.primary"
                  gutterBottom
                >
                  Model: {product.name}
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}  color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              {/* <Typography variant="h5" component="div">
                
                </Typography>
                <Typography variant="body2" color="text.secondary">
              
                </Typography>
              </CardContent> */}
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItemText style={{display:'flex', justifyContent:'center'}}>
                  <Typography
                    sx={{ fontSize: "2.5rem", color: "green" ,alignItems:"center"}}
                    variant="body"
                  >
                    Advantages:
                  </Typography>
                </ListItemText>
                {product.pros.map((e, idx) => (
                  <div key={idx}>
                    <ListItem alignItems="flex-start">
                      <ListItemText primary={e} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItemText style={{display:'flex',justifyContent:"center"}}>
                  <Typography
                    sx={{ fontSize: "2em", color: "red" ,flexShrink:1}}
                    variant="body"
                  >
                    Disadvantages:
                  </Typography>
                </ListItemText>
                {product.cons.map((e, idx) => (
                  <div key={idx}>
                    <ListItem alignItems="flex-start">
                      <ListItemText primary={e} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        )
      )}
    </Box>
  );
}

export default ProductCard;
