import {SIGNUP, AUTHENTICATE, SIGNOUT} from '../actions/auth';

const initialState = {
   token: '',
   userId: '',
   isAuth: false,
   isAdmin: true,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SIGNUP:
         return {
            token: action.payload.token,
            userId: action.payload.userId,
            isAuth: true,
            ...state,
         };
      case AUTHENTICATE:
         return {
            userId: action.payload.userId,
            token: action.payload.token,
            isAuth: true,
            ...state,
         };
      case SIGNOUT:
         return {
            ...initialState,
            isAuth: false,
         };

      default:
         return state;
   }
};
