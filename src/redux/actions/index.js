export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  payload: email,
});

export const login = (email) => ({
  type: 'LOGIN',
  payload: email,
});
