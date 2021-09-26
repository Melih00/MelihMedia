import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Card, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { withRouter } from "react-router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import firebase from "firebase";
import Modals from "./Modals";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import { copyToClipboard } from "./functions";
import EditIcon from "@mui/icons-material/Edit";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { addInfo, useFetch } from "../firebase/database";
import { successToastify } from "../styling/customToasitfy";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../styling/buttons.css";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function NewPost() {
  const history = useHistory();
  const userName = firebase.auth()?.currentUser?.email.split("@")[0].replace(/[0-9]/g, '');
  console.log(userName)
  const { postList } = useFetch();
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [view, setView] = useState(false);
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleShare = async () => {
    await firebase
      .database()
      .ref("posts")
      .on("value", (snapshot) => {
        const posts = snapshot.val();
        const postList = [];
        for (let id in posts) {
          postList.push({ id, ...posts[id] });
        }
      });

    setTimeout(() => {
      addInfo({
        counter: postList.length,
        img: imgUrl,
        pp: firebase.auth().currentUser.photoURL,
        sharedBy: userName,
        content: content,
        title: userName,
        liked: false,
        date: Date()
          .toString()
          .substr(0, 11)
          .concat(Date().toString().substr(15, 6)),
        likeCounter: 0,
      });
    }, 1000);

    history.push("/posts");
    successToastify("Post Shared!");
  };
  const matches = useMediaQuery("(max-width:500px)");
  const horizontal = matches ? "vertical" : "horizontal";
  const horizontal1 = matches
    ? "vertical small contained button group"
    : "horizontal small contained button group";
  const [state, setstate] = React.useState(false);
  React.useEffect(() => {
    setstate(!state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);
  const handleCancel = () => {
    history.push("/posts");
  };
  const handleImgUrl = (e) => {
    setImgUrl(e.target.value);
  };
  const handleEdit = () => {
    setView(false);
  };
  const handleView = () => {
    imgUrl && content ? setView(true) : alert("You must fill the blanks.");
  };
  const handleViewBack = () => {
    history.push("posts");
  };
  const expanded = false;
  const buttons = [
    <Button
      onClick={handleCancel}
      color="error"
      sx={{
        width: matches ? "100%" : "33%",
        fontSize: "1.9rem",
        display: "flex",
        padding: "15px 50px",
      }}
      key="one"
      className="buttonForHover"
    >
      <Box className="text"> Cancel</Box>
      <CancelRoundedIcon
        className="icon"
        sx={{ position: "absolute", fontSize: "2rem", margin: "0px 1rem" }}
      />{" "}
    </Button>,
    <Button
      onClick={() => handleEdit()}
      sx={{
        width: matches ? "100%" : "33%",
        fontSize: "1.9rem",
        padding: "15px 50px",
      }}
      key="two"
      className="buttonForHover"
    >
      <Box className="text"> Edit</Box>{" "}
      <EditIcon
        className="icon"
        sx={{ position: "absolute", fontSize: "2rem", margin: "0px 1rem" }}
      />{" "}
    </Button>,
    <Button
      onClick={handleShare}
      color="secondary"
      sx={{
        transition: "all 300ms ease-in-out ",
        width: matches ? "100%" : "34%",

        fontSize: "1.9rem",
        padding: "15px 50px",
      }}
      key="three"
      className="buttonForHover"
    >
      <Box className="text"> Share</Box>
      <IosShareRoundedIcon
        className="icon"
        sx={{ position: "absolute", fontSize: "2rem", margin: "0px 1rem" }}
      />
    </Button>,
  ];
  return !view ? (
    <Box
      sx={{
        "& > :not(style)": { margin: "30px auto" },
      }}
    >  <Box sx={{
      margin:'auto',
      display:'flex',
      width:'50%',
      padding:'0'
    }}>
   
    <Box
      sx={{
        margin: "0",
        fontSize: "20px",
        boxSizing: "border-box",
        display: "inline",
        height: "auto",
        textAlign: "center",
      }}
      >
      Do not share meaningless content. It'll be seen by every user
    </Box>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
            display: "flex",
            margin: "12px auto",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => handleContent(e)}
          value={content}
          id="filled-basic"
          label="Content"
          variant="filled"
        />
        <TextField
          onChange={(e) => handleImgUrl(e)}
          value={imgUrl}
          id="filled-basic"
          label="Image URL"
          variant="filled"
        />
        <Button onClick={handleView} variant="contained">
          Preview
        </Button>
        <Button onClick={handleViewBack} variant="contained">
          Back
        </Button>
      </Box>
    </Box>
  ) : (
    <>
      <Box
        sx={{
          width: "52ch",
          display: "block",
          margin: "30px auto",
          fontSize: "20px",
          textAlign: "center",
        }}
        autoComplete="off"
      >
        Your Post will be look like this when you share it :
      </Box>
      <Card
        sx={{
          width: matches ? "90%" : "97%",
          display: "block",
          margin: "20px auto",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={firebase.auth().currentUser?.photoURL}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={firebase.auth().currentUser.email.split("@")[0]}
          subheader={Date()
            .toString()
            .substr(0, 11)
            .concat(Date().toString().substr(15, 6))}
        />
        <CardMedia
          sx={{ maxHeight: "60vh" }}
          component="img"
          image={imgUrl}
          alt="img link broken"
        />
        <CardContent sx={{ padding: "15px 20px 0px" }}>
          <Typography variant="body1" color="text.secondary">
            <Typography
              sx={{ display: "inline" }}
              variant="body1"
              color="text.primary"
            >
              {" "}
              {firebase.auth().currentUser.email.split("@")[0]}:{" "}
            </Typography>
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: true ? "red" : "gray" }} />
            <p style={{ margin: "0px 5px", fontSize: "1.2rem" }}>9</p>
          </IconButton>
          <IconButton
            onClick={() => {
              copyToClipboard("a");
            }}
            aria-label="share"
          >
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            aria-label="show more"
            sx={{
              height: "40px",
              borderRadius: "18%",
              color: "#1976d2",
              fontSize: "1.2rem",
            }}
          >
            <Modals e={{ img: imgUrl }} />
          </ExpandMore>
        </CardActions>
      </Card>{" "}
      <Box sx={{ width: "100%", margin: "30px 0px" }}>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            size="small"
            sx={{ width: "90%" }}
            orientation={horizontal}
            aria-label={horizontal1}
            variant="contained"
          >
            {buttons}
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
}
export default withRouter(NewPost);
