import { USER_LOGIN ,POSTS, SHOW_WELCOME} from "./types";

const initialState = {
  isUserLogin: false,
  showMyPosts:false,
  showWelcome:true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, isUserLogin: action.payload };
    case POSTS:
      return { ...state, showMyPosts: action.payload };
    case SHOW_WELCOME:
      return { ...state, showWelcome: action.payload };
    default:
      return { ...state };
  }
};
export default userReducer