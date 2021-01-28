const pageReducer = (state = 'login', action) => {
    switch(action.type) {
      case 'CHANGE_PAGE':
        return action.payload;
      default:
        return state;
    }
};

export default pageReducer;