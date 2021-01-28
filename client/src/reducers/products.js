import products from '../components/dummyData.js';

const productReducer = (state = products, action) => {
  switch(action.type) {
    case 'CATEGORY_SORT': {
      let updatedCart = products.filter(product => product.category === action.payload)
      return updatedCart;
    }
    case 'SEARCH_TITLE': {
      let updatedCart;
      if (action.payload.category === 'all') {
        updatedCart = products.filter(product => product.title.toLowerCase().includes(action.payload.term));
      } else {
        updatedCart = products.filter(product => product.title.toLowerCase().includes(action.payload.term) && product.category === action.payload.category);
      }
      return updatedCart;
    }
    case 'SHOW_ALL': {
      return products;
    }
    default:
      return state;
  }
};

export default productReducer;