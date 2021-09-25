import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as firebase from "../firebase/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/actions";
import Firebase from "firebase";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { withRouter } from "react-router";
import { auth } from "../firebase/firebase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
function Register() {
  const history = useHistory();
  const [imgUrl, setImgUrl] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handleEmail = (e) => setEmail(e.target.value);
  const dispatch = useDispatch();
  const handleRegister = async () => {
    await firebase.createUser(email, values.password, imgUrl);
    if (Firebase.auth().currentUser) {
      setTimeout(() => {
        dispatch(userLogin(true));
        history.push("/posts");
      }, 1000);
    }
  };
  React.useEffect(() => {
    auth.signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "45ch", margin: "5% auto 0px" },
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ margin: "0", fontSize: "21px", textAlign: "center" }}>
        {" "}
        Your e-mail adress will be your username. please choose a proper e-mail
        adress
      </Box>
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
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          id="filled-basic"
          label="Profile Photo"
          placeholder="Image URL"
          variant="filled"
        />
        <TextField
          value={email}
          onChange={(e) => handleEmail(e)}
          onKeyUp={(e) => (e.key === "Enter" ? handleRegister() : null)}
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
          onClick={() => handleRegister()}
        >
          Register
        </Button>
        <Box
          sx={{ cursor: "pointer", color: "blue" }}
          onClick={() =>
            setTimeout(() => {
              history.push("/signin");
            }, 1000)
          }
        >
          Already have an account?
        </Box>
      </Box>
    </Box>
  );
}
export default withRouter(Register);
