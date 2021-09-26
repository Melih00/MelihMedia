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
import { ListItemIcon, Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: yellow[300],
    "&:hover": {
      backgroundColor: alpha(yellow[300], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: yellow[300],
  },
}));
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
const Navbar = ({ checked, handleChange }) => {
  const handleNotLoginAlert = () => {
    alert("You must login to access Menu");
    firebase.auth()?.signOut();
    window.location.reload();
  };
  const [opacity, setOpacity] = React.useState(0);
  const [disabled, setDisabled] = React.useState(false);
  const matches800 = useMediaQuery("(min-width:800px)");
  const userName = firebase.auth()?.currentUser?.email.split("@")[0].replace(/[0-9]/g, '');
  const label = { inputProps: { "aria-label": "Switch demo" } };
  React.useEffect(() => {
    setOpacity(1);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      setOpacity(0);
    }, 2000);
  }, [checked]);
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
                  sx={{ mr: 2, color: "yellow" }}
                >
                  <MenuIcon />
                </IconButton>
              </ListItemIcon>
            )}
            <GreenSwitch
              disabled={disabled}
              sx={{ display: matches800 ? "flex" : "none" }}
              onChange={handleChange}
              checked={checked}
              {...label}
              color="default"
            />{" "}
            <Typography
              sx={{
                position: "absolute",
                left: "140px",
                display: matches800 ? "inline" : "none",
                transitions: "all 400ms linear",
                opacity: opacity,
              }}
            >
              Sizing: {checked ? "small" : "big"}
            </Typography>
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
            <Button sx={{ margin: "0px" }} color="inherit">
              @{userName}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
