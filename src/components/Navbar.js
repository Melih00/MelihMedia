import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import firebase from "firebase";
import TemporaryDrawer from "./TemporaryDrawer";
import { ListItemIcon } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#212121",
      dark: "#000",
      contrastText: "#ffff00",
    },
  },
});
const Navbar = () => {
  const handleNotLoginAlert = () => {
    alert("You must login to access Menu");
    firebase.auth()?.signOut();
    window.location.reload();
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            {firebase.auth().currentUser ? (
              <TemporaryDrawer />
            ) : (
              <ListItemIcon onClick={handleNotLoginAlert}>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2, color: "yellow" }}>
                  <MenuIcon />
                </IconButton>
              </ListItemIcon>
            )}

            <Typography
              variant="h6"
              component="div"
              sx={{
                letterSpacing: "4px",
                cursor: "default",
                margin: "0px auto",
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              𝓜𝓮𝓵𝓲𝓱𝓜𝓮𝓭𝓲𝓪
            </Typography>
            <Button
              onClick={() => console.log(firebase.auth().currentUser)}
              sx={{ margin: "0px" }}
              color="inherit"
            >
              @{firebase.auth().currentUser?.email.split("@")[0]}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
