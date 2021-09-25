import { USER_LOGIN,POSTS, SHOW_WELCOME } from "../reducers/types";

export const userLogin = (e) => ({type:USER_LOGIN,payload:e})
export const showMyPosts = (e) => ({type:POSTS,payload:e})
export const setShowWelcome = (e) => ({type:SHOW_WELCOME,payload:e})