import { SIGNUP, SIGNIN, AUTO_LOGIN, SIGNOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: "u1",
  isAuth: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case SIGNIN:
      return {
        userId: action.payload.userId,
        token: action.payload.token,
        isAuth: true,
      };
    case SIGNOUT:
      return {
        ...initialState,
        isAuth: false,
      }

    default:
      return state;
  }
};
