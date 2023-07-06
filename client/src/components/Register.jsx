import * as React from "react";
import {
  Button,
  CssBaseline,
  Checkbox,
  Link,
  Grid,
  TextField,
  FormControlLabel,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  Container,
  createTheme,
} from "@mui/material";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  const {  token,isLoggedIn } = React.useContext(AuthContext);
const navigate =useNavigate()
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        avi'Scanner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
export default function Register({ open, onClose, handleOpenLogin }) {
  const [user, setUser] = React.useState({});
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
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
      const response = await apiClient.post("register", data);
      const userData = response.data;
      setUser(userData);
      const token = response.headers['x-auth-token'];
      localStorage.setItem("token", token);
      navigate('/')
      onClose()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <ThemeProvider theme={defaultTheme}> */}
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstName")}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                  {errors.firstName && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.firstName.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName")}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                  {errors.lastName && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.lastName.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("email")}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("password")}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.password.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to stay updated."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                // disabled={!isValid}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="text"
                    sx={{ textTransform: "none" }}
                    onClick={handleOpenLogin}
                  >
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Dialog>
    </div>
  );
}
