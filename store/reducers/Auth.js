import { SIGNUP, LOGIN, AUTHENTICATION, LOGOUT } from "../actions/Auth";

const initialState = {
  userId: null,
  token: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION: {
      return {
        userId: action.userId,
        token: action.token,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    case SIGNUP:
      return {
        userId: action.userId,
        token: action.token,
      };

    case LOGIN: {
      return {
        userId: action.userId,
        token: action.token,
      };
    }
    default:
      return state;
  }
};
