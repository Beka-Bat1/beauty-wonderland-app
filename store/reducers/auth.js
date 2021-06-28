import { SIGNUP, SIGNIN, AUTO_LOGIN } from "../actions/auth";

const initialState = {
  token: null,
  userId: "u1",
  isAuth: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNIN:
      return {
        ...state,
        isAuth: true,
      };

    default:
      return state;
  }
};
