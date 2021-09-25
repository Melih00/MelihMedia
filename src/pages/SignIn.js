import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Firebase from "firebase";
import * as firebase from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import { userLogin } from "../redux/actions/actions";
import Posts from "../components/Posts";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function SignIn() {
  const history = useHistory();
  Firebase.auth().onAuthStateChanged(() => {
    if (Firebase.auth().currentUser) {
      history.push("/posts");
    }
  });
  const [email, setEmail] = useState("");
  useEffect(() => {
    auth.signOut();
    history.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    await firebase.signIn(email, values.password);
    console.log("signedIn");
    await Firebase.auth().onAuthStateChanged(() => {
      if (Firebase.auth().currentUser) {
        setTimeout(() => {
          console.log(Firebase.auth().currentUser);
          dispatch(userLogin(true));
          history.push("/posts");
          setEmail("");
        }, 1000);
      }
    });
  };
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return Firebase.auth().currentUser ? (
    <Posts />
  ) : (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "45ch", margin: "10% auto 0px" },
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "24ch",
            margin: "6% auto 0px",
            padding: "0",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          },
        }}
      >
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          label="E-mail"
          variant="filled"
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ height: "50px" }}
          onClick={handleSignIn}
        >
          sign in
        </Button>

        <Box
          sx={{ cursor: "pointer", color: "blue" }}
          onClick={() =>
            setTimeout(() => {
              history.push("/");
            }, 1000)
          }
        >
          Don't have an account?
        </Box>
      </Box>
    </Box>
  );
}
export default SignIn;
