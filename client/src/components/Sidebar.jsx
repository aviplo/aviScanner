import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import CompareIcon from "@mui/icons-material/Compare";
import apiClient from "../services/api-client";
import axios from "axios";
import { Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function Sidebar({
  window,
  handleOpenDrawer,
  openDrawer,
  setComparison,
  setImages,
}) {
  const [history, setHistory] = useState("");
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "x-auth-token": token,
        };

        const response = await axios.get(
          "http://localhost:3000/api/userComparison",
          { headers }
        );
        const { data } = response;

        setHistory(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, openDrawer]);

  const drawerWidth = 240;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleClick = (data) => {
    setComparison(JSON.parse(data.savedResponse));
    setImages(data.productImages);
    handleOpenDrawer();
  };
  const styles = (theme) => ({
    listItemText: {
      fontSize: "0.7em", //Insert your required size
    },
  });
  console.log(history);
  return (
    <Box
      component="nav"
      sx={{
        marginTop: "20vh",
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={openDrawer}
        onClose={handleOpenDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            minWidth: "200px",
            width: "20vw",
            mt: "20vh",
          },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="history of compares">
            <List>
              {Array.isArray(history) &&
                history.map((item, idx) => (
                  <ListItem
                    disablePadding
                    key={idx}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <ListItemButton onClick={() => handleClick(item)}>
                      {/* <ListItemIcon>
                      <CompareIcon fontSize="small" />
                      </ListItemIcon> */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5em",
                        }}
                      >
                        <ListItemText
                          primary={item.product1}
                          primaryTypographyProps={{
                            style: { fontSize: "0.7em" },
                          }}
                        />
                        <Box sx={{ marginLeft: "0.5em", marginRight: "0.5em" }}>
                          VS
                        </Box>
                        <ListItemText
                          primary={item.product2}
                          primaryTypographyProps={{
                            style: { fontSize: "0.7em" },
                          }}
                        />
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </ListItem>
                ))}
            </List>
          </nav>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
