const INITIAL_STATE = {
  email: '',
  loggedIn: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
