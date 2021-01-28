import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { signOut, changePage, addItemToCart, removeFromCart, filterCategory, searchTitle, updateSubtotal, clearCart } from '../actions';
import Modal from './modal.jsx';


const Products = (props) => {

  const products = useSelector(state => state.products);
  const subtotal = useSelector(state => state.subtotal);
  const cart = useSelector(state => state.cart);

  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState({});
  const [displaying, setDisplaying] = useState('All');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const logOut = (event) => {
    event.preventDefault();
    dispatch(clearCart());
    dispatch(signOut());
    // props.clearCart();
    // props.signOut();
  };

  const viewCart = (event) => {
    event.preventDefault();
    dispatch(changePage('checkout'));
    // props.changePage('checkout');
  }

  const addToCart = (event, product) => {
    // event.preventDefault();
    setShowModal(false);
    dispatch(updateSubtotal('add', Number(product.price)));
    dispatch(addItemToCart(product));
    // props.updateSubtotal('add', Number(product.price));
    // props.addToCart(product);
  }

  const removeFromCart = (event, index, price) => {
    event.preventDefault();
    dispatch(updateSubtotal('remove', Number(price)));
    dispatch(removeFromCart(index));
    // props.updateSubtotal('remove', Number(price));
    // props.removeFromCart(index);
  }

  const showDetails = (event, product) => {
    event.preventDefault();
    setDetails(product);
    setShowModal(true);
  }

  const filterByCategory = (event) => {
    event.preventDefault();
    const category = event.target.value || 'All';
    setDisplaying(category);
    dispatch(filterCategory(category.toLowerCase()));
    // props.filterCategory(category.toLowerCase());
  }

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm('');
    setDisplaying('');
    dispatch(searchTitle(searchCategory, searchTerm.toLowerCase()));
    // props.searchTitle(searchCategory, searchTerm.toLowerCase());
  }

  return (
    <div id='mainPage' onClick={() => {
        if (showModal) {
          setShowModal(false);
          setDetails({});
        }
    }}>
      <div id="header">
        <div id="top-bar" >
          <h1 className='storeName' id='storeName' onClick={(event) => {
            filterByCategory(event);
          }}>Generic Store</h1>
          <form id='searchbar' onSubmit={(e) => {handleSearch(e)}}>
            <select id="categoryDropDown" name="products" onChange={(event) => {
              setSearchCategory(event.target.value);
            }}>
              <option value="all">All</option>
              <option value="shoes">Shoes</option>
              <option value="jackets">Jackets</option>
              <option value="pants">Pants</option>
            </select>
            <input type="text" id="searchTerm" name="searchTerm" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}></input>
            <input id='submitSearch' type="submit" value="Search" />
          </form>

          <button className='logout' onClick={(event) => {logOut(event)}}>Log out</button>
        </div>
        <form id='categoryBar' onClick={(e) => {
          filterByCategory(e);
        }}>
          <input className={displaying === 'All' ? 'selected' : null} type="submit" value="All" />
          <input className={displaying === 'Shoes' ? 'selected' : null} type="submit" value="Shoes" />
          <input className={displaying === 'Jackets' ? 'selected' : null} type="submit" value="Jackets" />
          <input className={displaying === 'Pants' ? 'selected' : null} type="submit" value="Pants" />
        </form>
      </div>
      <div id='productsUI'>
        <div id='cardsContainer'>
          {products.map((product, index) => (
              <div id='productCards' key={index}>
                  <img src={product.url} />
                  <p>
                    {product.title}<br/>
                    ${product.price}
                  </p>
                  <button onClick={(event) => {showDetails(event, product)}}>See Details</button>
                  <button onClick={(event) => {addToCart(event, product)}}>Add to Cart</button>
              </div>
          ))}
        </div>
        <div id='cartSideBar'>
            <div id='cartDetails'>
              <h1>Cart <span>({ cart.length === 1 ? ('1 item') : (`${cart.length} items`)})</span></h1>
                <table>
                  <tbody>
                    {cart.map((product, index) => (
                      <tr key={index}>
                        <td className='productName'>{product.title}</td>
                        <td>${product.price}</td>
                        <td><button onClick={(event) => {removeFromCart(event, index, product.price)}}>Cancel</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div id='checkout-subtotal'>
                <p>Subtotal: ${subtotal.toFixed(2)} </p>
                <button disabled={cart.length === 0 ? true : false} className={cart.length === 0 ? 'disabled' : null} onClick={(event) => {viewCart(event)}}>Proceed to checkout</button>
            </div>
        </div>
      </div>
      {showModal ? <Modal product={details} atc={addToCart} close={setShowModal}/> : null}
    </div>
  );
}

// const mapDispatchToProps = dispatch => {
//   return {
//     signOut: () => dispatch(signOut()),
//     changePage: (page) => dispatch(changePage(page)),
//     addItemToCart: (product) => dispatch(addItemToCart(product)),
//     removeFromCart: (id) => dispatch(removeFromCart(id)),
//     updateSubtotal: (action, value) => dispatch(updateSubtotal(action, value)),
//     filterCategory: (category) => dispatch(filterCategory(category)),
//     searchTitle: (category, term) => dispatch(searchTitle(category, term)),
//     clearCart: () => dispatch(clearCart())
//   }
// };

export default Products;
// export default connect(null, mapDispatchToProps)(Products);