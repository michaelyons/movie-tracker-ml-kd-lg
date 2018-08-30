export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.user;
    default:
      return state;
  }
};
