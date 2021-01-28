const emailErrReducer = (state = '', action) => {
  switch(action.type) {
    case 'CLEAR_ERR':
      return '';
    case 'SHOW_EMAIL_ERROR':
      return action.payload;
    default:
      return state;
  }
};

export default emailErrReducer;