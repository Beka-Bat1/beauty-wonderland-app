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
            ...state,
            token: action.payload.token,
            userId: action.payload.userId,
            isAuth: true,
         };
      case AUTHENTICATE:
      console.log('auhtenticated')
         return {
            ...state,
            userId: action.payload.userId,
            token: action.payload.token,
            isAuth: true,
         };
      case SIGNOUT:
      console.log("signing out in reducer")
         return {
            ...initialState,
            isAuth: false,
         };

      default:
         return state;
   }
};
