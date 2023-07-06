import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonWrapper = styled("div")({
  flex: "1 25% 1 ",
  alignItems: "center",
  marginTop: 20,
  position: "relative",
  display: "inline-block",
  width: "11vw",
  height: "11vw",
  backgroundColor: "gold",
  borderRadius: "50%",
  border: "1vw solid #b8883d",
  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.5s ease-in-out",
  "&:hover": {
    transform: "rotate(360deg)",
  },
});

const LetterWrapper = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5vw",
  fontWeight: "bold",
  color: "gold",
  textShadow: "1px 1px 1px #b8883d, -1px -1px 1px #b8883d",
  transition: "all 0.5s ease-in-out",
  "&:hover": {
    textShadow: "3px 3px 5px #b8883d, -3px -3px 5px #b8883d",
  },
});

const ButtonCompare = ({ clickEvent, isLoading }) => {

  return (
    <ButtonWrapper onClick={clickEvent} >
      <LetterWrapper>
        {isLoading ? <CircularProgress size={48} color="warning" /> : "VS"}
      </LetterWrapper>
    </ButtonWrapper>
  );
};

export default ButtonCompare;
