import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import firebase from "firebase";
import Modals from "./Modals";
import "react-toastify/dist/ReactToastify.css";
import { copyToClipboard } from "./functions";
import SignIn from "../pages/SignIn";
import { deleteHandler, useFetch } from "../firebase/database";
import { setShowWelcome} from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { DeleteOutline } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

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
const Posts = () => {
  console.log("rendered");
  const dispatch = useDispatch();
  const { postList } = useFetch();
  const matches = useMediaQuery("(min-width:800px)");
  const showOwnPosts = useSelector((state) => state.user.showMyPosts);
  const showWelcome = useSelector((state) => state.user.showWelcome);

  const expanded = false
  const [isLiked, setIsLiked] = React.useState(false);

  const handleDelete = (e) => {
    deleteHandler(e);
  };
  const handleLiked = async (e) => {
    postList.filter((el) => el.id === e)[0].like = !postList.filter(
      (el) => el.id === e
    )[0].like;
    setIsLiked(!isLiked);
    if (firebase.auth().currentUser?.like) {
      firebase.auth().currentUser.like[e]
        ? (postList.filter((el) => el.id === e)[0].likeCounter -= 1)
        : (postList.filter((el) => el.id === e)[0].likeCounter += 1);
      firebase.auth().currentUser.like[e] =
        !firebase.auth().currentUser.like[e];
    }
  };
  const [time, setTime] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setTime(true);
    }, 1000);
    setTimeout(() => {
      dispatch(setShowWelcome(false));
      setTime(false);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return showWelcome && time ? (
    <p className="welcomeText"> Welcome to MelihMedia... </p>
  ) : showWelcome ? (
    <p></p>
  ) : showOwnPosts ? (
    firebase.auth().currentUser ? (
      postList
        .slice(0)
        .reverse()
        ?.map((e) =>
          e.sharedBy === firebase.auth().currentUser.email.split("@")[0] ? (
            <Card
              key={e.id}
              sx={{
                width: matches ? "90%" : "97%",
                display: "block",
                margin: "20px auto",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={e.pp}
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  >
                    {e.pp}
                  </Avatar>
                }
                action={
                  <IconButton
                    onClick={() => handleDelete(e)}
                    color="error"
                    aria-label="settings"
                  >
                    <DeleteOutline />
                  </IconButton>
                }
                title={e.title}
                subheader={e.date}
              />
              <CardMedia
                sx={{ maxHeight: "50vh" }}
                component="img"
                image={e.img}
                alt="img"
              />
              <CardContent sx={{ padding: "15px 20px 0px" }}>
                <Typography variant="body1" color="text.secondary">
                  <Typography
                    sx={{ display: "inline" }}
                    variant="body1"
                    color="text.primary"
                  >
                    {" "}
                    {e.sharedBy}:{" "}
                  </Typography>
                  {e.content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => {
                    handleLiked(e.id);
                  }}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon sx={{ color: e.like ? "red" : "gray" }} />
                  <p style={{ margin: "0px 5px", fontSize: "1.2rem" }}>
                    {e.likeCounter}
                  </p>
                </IconButton>
                <IconButton
                  onClick={() => {
                    copyToClipboard(window.location.href);
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
                  <Modals e={e} />
                </ExpandMore>
              </CardActions>
            </Card>
          ) : (
            <div></div>
          )
        )
    ) : (
      <SignIn />
    )
  ) : firebase.auth().currentUser ? (
    postList
      .slice(0)
      .reverse()
      ?.map((e) => (
        <Card
          key={e.id}
          sx={{
            width: matches ? "90%" : "97%",
            display: "block",
            margin: "20px auto",
          }}
        >
          <CardHeader
            avatar={
              <Avatar src={e.pp} sx={{ bgcolor: red[500] }} aria-label="recipe">
                {e.pp}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={e.title}
            subheader={e.date}
          />
          <CardMedia
            sx={{ maxHeight: "50vh" }}
            component="img"
            image={e.img}
            alt="img"
          />
          <CardContent sx={{ padding: "15px 20px 0px" }}>
            <Typography variant="body1" color="text.secondary">
              <Typography
                sx={{ display: "inline" }}
                variant="body1"
                color="text.primary"
              >
                {" "}
                {e.sharedBy}:{" "}
              </Typography>
              {e.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => {
                handleLiked(e.id);
              }}
              aria-label="add to favorites"
            >
              <FavoriteIcon sx={{ color: e.like ? "red" : "gray" }} />
              <p style={{ margin: "0px 5px", fontSize: "1.2rem" }}>
                {e.likeCounter}
              </p>
            </IconButton>
            <IconButton
              onClick={() => {
                copyToClipboard(window.location.href);
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
              <Modals e={e} />
            </ExpandMore>
          </CardActions>
        </Card>
      ))
  ) : (
    <SignIn />
  );
};
export default withRouter(Posts);
