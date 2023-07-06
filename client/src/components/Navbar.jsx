import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Login from "./Login";
import Register from "./Register";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const pages = ["Compare", "Describe"];
const settings = ["Profile", "Account", "Dashboard"];

function Navbar({ handleOpenDrawer }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const { logout, isLoggedIn, token } = React.useContext(AuthContext);

  const handleOpenRegister = () => {
    handleCloseLogin();
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleOpenLogin = () => {
    setAnchorElUser(null);
    setOpenLogin(true);
    handleCloseRegister();
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    handleCloseLogin();
  };

  return (
    <div
      style={{
        position: "fixed",
        height: "20vh",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        backgroundColor: "#030B29",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/*{ flexGrow: 0, display: { xs: "flex", md: "none" } }  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {isLoggedIn && (
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleOpenDrawer}
              // sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        )}
        <Box>
          <a href="/">
            <img
              src="logo1.png"
              alt="avi'Scanner"
              style={{ height: "20vh", borderRadius: "30px" }}
            />
          </a>
        </Box>
      </Box>

      <Container
        maxWidth="xl"
        style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={`/${page}`}>
                {" "}
                <Button
                  key={page}
                  // onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block" }}
                >
                  {page}{" "}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ m: 4 }}>
                <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              // maxWidth='70vw'
              sx={{
                mt: "11vh",
                minWidth: "200px",
                maxWidth: "18vw",
                textAlign: "center",
                borderRadius: "24px",
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!token && (
                <Login
                  open={openLogin}
                  handleOpenLogin={handleOpenLogin}
                  onClose={handleCloseLogin}
                  handleOpenRegister={handleOpenRegister}
                  openRegister={openRegister}
                  closeRegister={handleCloseRegister}
                ></Login>
              )}
              <Register
                open={openRegister}
                handleOpenRegister={handleOpenRegister}
                onClose={handleCloseRegister}
                handleOpenLogin={handleOpenLogin}
              />

              <Divider />
              {/* <Popup onClick={handleClickOpenRegister}></Popup>y */}
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  sx={{ width: "25vw", textAlign: "center" }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <Divider />
              {token && (
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={() => handleLogout()}
                >
                  Loguot
                </Button>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {/* <Abc/> */}
    </div>
  );
}
export default Navbar;
