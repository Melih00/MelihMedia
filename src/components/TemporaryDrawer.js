import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { showMyPosts, userLogin } from "../redux/actions/actions";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function TemporaryDrawer() {
  const didUserLogin = useSelector((state) => state.user.isUserLogin);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const showOwnPosts = useSelector((state) => state.user.showMyPosts);
  const [newPost, setNewPost] = React.useState("My Posts");
  
  const handleDispatch = () => {
    dispatch(showMyPosts(!showOwnPosts));
    showOwnPosts ? setNewPost("My Posts") : setNewPost("All Posts");
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const history = useHistory();
  const handleHistory = () => {
    history.push("/newpost");
    dispatch(userLogin(!didUserLogin));
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[ newPost, "New Post"].map((text, index) =>
          text === "New Post" ? (
            <ListItem onClick={() => handleHistory()} button key={text}>
              <ListItemIcon>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                >
                  <AddBoxIcon sx={{ margin: "0" }} />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ) : (
            <ListItem onClick={handleDispatch} button key={text}>
              <ListItemIcon>
                <VideocamOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["GitHub", "logout"].map((text, index) => (
          <ListItem
            onClick={() => {
              if (text === "logout") {
                setTimeout(() => {
                  firebase.auth().signOut();
                  window.location.reload();
                }, 1000);
              }else if (text === 'GitHub'){
                window.location = ('https://github.com/Melih00/MelihMedia')
              }
            }}
            button
            key={text}
          >
            <ListItemIcon>
              {text === "GitHub" ? (
                <GitHubIcon />
              ) : text === "logout" ? (
                <LogoutIcon />
              ) : (
                <MailIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <React.Fragment key={"left"}>
      {/* <MenuIcon onClick={toggleDrawer('left', true)}>{'left'}</MenuIcon> */}
      <IconButton
        onClick={toggleDrawer("left", true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
