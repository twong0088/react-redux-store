const passwordErrReducer = (state = '', action) => {
  switch(action.type) {
    case 'CLEAR_ERR':
      return '';
    case 'SHOW_PASSWORD_ERROR':
      return action.payload;
    default:
      return state;
  }
};

export default passwordErrReducer;