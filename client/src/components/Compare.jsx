import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ButtonCompare from "./ButtonCompare";
import { Typography, Box } from "@mui/material";
import apiClient from "../services/api-client";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const Compare = ({ openDrawer, handleOpenDrawer }) => {
  useQuery;
  const { token } = useContext(AuthContext);
  const [comparison, setComparison] = useState({});
  const [productImages, setProductImages] = useState();
  const [error, setError] = useState("");
  const [products, setProducts] = useState({ product1: "", product2: "" });
  const [isLoading, setIsLoading] = useState(false);
  const updateComparison = (data) => {
    setComparison(data);
  };
  const compareProducts = (product1, product2) => {
    setIsLoading(true);
    const headers = {
      "x-auth-token": token,
    };
    apiClient
      .get(`compare?product1=${product1}&product2=${product2}`, { headers })
      .then(async (response) => {
        const data = await response.data;
        setComparison(JSON.parse(data.comparisonData));
        setProductImages(data.images);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCompare() {
    const { product1, product2 } = products;
    if (product1 && product2) {
      compareProducts(product1, product2);
    } else {
      setError("Please provide valid product names.");
    }
  }
  console.log(comparison);
  return (
    <>
      <Sidebar
        openDrawer={openDrawer}
        handleOpenDrawer={handleOpenDrawer}
        setComparison={updateComparison}
        setImages={setProductImages}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mt: "20vh",
        }}
      >
        <ProductCard
          product={comparison.product1}
          productImages={productImages}
          setProducts={setProducts}
          id="product1"
          idx='0'
          isLoading={isLoading}
        />
        <ButtonCompare clickEvent={handleCompare} isLoading={isLoading} />
        <ProductCard
          product={comparison.product2}
          productImages={productImages}
          setProducts={setProducts}
          id="product2"
          idx='1'
          isLoading={isLoading}
        />
      </Box>
      {comparison.product1 && (
        <>
          <Typography
            margin="normal"
            label="Search field"
            border={"solid"}
            sx={{
              borderColor: "grey.500",
              borderRadius: "40px",
              pt: 0,
              p: 4,
              mt: 2,
            }}
          >
            {" "}
            <Typography
              variant="h3"
              component="h1"
              align="center"
              color="primary"
              sx={{ pb: 2 }}
            >
              Summary
            </Typography>
            {comparison.overall}
          </Typography>
        </>
      )}
    </>
  );
};

export default Compare;
