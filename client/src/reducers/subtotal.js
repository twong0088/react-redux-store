const subtotalReducer = (state = 0, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return state + action.payload;
    case 'REMOVE_ITEM':
      return state - action.payload;
    default:
      return state;
  }
};

export default subtotalReducer;