const cartReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_TO_CART':
        return [...state, action.payload];
      case 'REMOVE_FROM_CART':
        const updatedCart = state.map(x => {return x});
        updatedCart.splice(action.payload, 1);
        return updatedCart;
      case 'CLEAR_CART':
        return [];
      default:
        return state;
    };
};

export default cartReducer;