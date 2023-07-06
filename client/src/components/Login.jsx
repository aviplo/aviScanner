import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import apiClient from "../services/api-client";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Register from "./Register";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = ({
  open,
  handleOpenLogin,
  onClose,
  handleOpenRegister,
  openRegister,
  closeRegister,
}) => {
  const { isLoggedIn, token, login } = useContext(AuthContext);
 const navigate = useNavigate()
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).max(50).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("login", data);
      const token = response.headers["x-auth-token"];
      login(token)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div sx={{ p: 50 }}>
      <Button
        variant="contained"
        onClick={handleOpenLogin}
        sx={{ my: "3vh" }}
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
      <Dialog open={open} onClose={onClose}>
        <ThemeProvider theme={createTheme()}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="logo2.png" width="50%" alt="" className="center" />

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("email")}
                  margin="normal"
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                {errors.email && (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.email.message}
                  </Typography>
                )}
                <TextField
                  {...register("password")}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Box>
                  {errors.password && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.password.message}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Box>
                <Button
                  type="submit"
                  //   disabled={!isValid}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        <Button
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={handleOpenRegister}
        >
          Don't have an account? Sign Up
        </Button>
        <Register
          open={openRegister}
          handleOpenRegister={handleOpenRegister}
          onClose={closeRegister}
          handleOpenLogin={handleOpenLogin}
        />
      </Dialog>
    </div>
  );
};

export default Login;
