
import React from "react";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import NewPost from "./components/NewPost";
import { ToastContainer } from "react-toastify";

const App = () => {
  const didUserLogin = useSelector((state) => state.user.isUserLogin);
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };
  console.log(didUserLogin,dispatch)
  return (
    <BrowserRouter>
      <Navbar checked={checked} handleChange={handleChange} />
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/newpost">
          {firebase.auth().currentUser ? <NewPost /> : <SignIn/>}
        </Route>
        <Route exact path="/posts">
          {firebase.auth().currentUser ? <Posts checked={checked} /> : <SignIn/>}
        </Route>
        <Route>
          <SignIn />
        </Route>
      </Switch>
      <ToastContainer/>
    </BrowserRouter>
  );
};

export default App;
