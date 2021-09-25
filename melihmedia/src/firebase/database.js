import firebase from "./firebase";

import { useState, useEffect } from "react";
import { successToastify } from "../styling/customToasitfy";
export const useFetch = () => {
  const [postList, setPostList] = useState([]);
  const postsRef = firebase.database().ref("posts");
  useEffect(() => {
    postsRef.on("value", (snapshot) => {
      const posts = snapshot.val();
      const postList = [];
      for (let id in posts) {
        postList.push({ id, ...posts[id] });
      }
      setPostList(postList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { postList };
};
export const addInfo = (info) => {
  const postsRef = firebase.database().ref("posts");
  postsRef.push(info);
};
export const deleteHandler = (e) => {
  const postRef = firebase.database().ref("posts").child(e.id);
  postRef.remove();
  successToastify("Deleted successfully");
};
