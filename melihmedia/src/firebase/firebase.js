import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  databaseURL:process.env.REACT_APP_databaseURL,
}
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      return true;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  return false;
};

export const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential);
      firebase.auth().currentUser.like = {};
    })
    .catch((error) => {
      alert(error);
    });
  return firebase.auth().currentUser;
};
export const createUser = async (email, password, imgUrl = "") => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      firebase.auth().currentUser.updateProfile({ photoURL: imgUrl });
    })
    .then()
    .catch((error) => {
      alert(error);
    });
  signIn(email, password);
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};
export {
  auth,
  db,
  signInWithGoogle,
  // signInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
export default firebase;
