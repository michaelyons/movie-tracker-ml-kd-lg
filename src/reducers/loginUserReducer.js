export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
    console.log(action.user)
      return action.user;
    default:
      return state;
  }
};
