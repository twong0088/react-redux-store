import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { signOut, changePage, removeFromCart, updateSubtotal, clearCart } from '../actions';
const isKenny = require('iskenny');

const Checkout = (props) => {

  const cart = useSelector(state => state.cart);
  const subtotal = useSelector(state => state.subtotal);
  // const dispatch = useDispatch();

  const [kenny, setKenny] = useState(false);
  const[formValues, setValues] = useState({
    fname: '',
    lname: '',
    address: '',
    address2: '',
    company: '',
    city: '',
    state:'',
    zip: '',
    country: '',
    phone: '',
    billingfname: '',
    billinglname: '',
    billingAddress: '',
    billingAddress2: '',
    billingCompany: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: '',
    billingPhone: '',
    CC: '',
    month: '',
    year: '',
    cvv: ''
  });

  const[addressError, setAddressError] = useState({
    fname: false,
    lname: false,
    address: false,
    city: false,
    state: false,
    zip: false,
    country: false,
    phone: false,
  });

  const[billingAddressError, setBillingAddressError] = useState({
    billingfname: false,
    billinglname: false,
    billingAddress: false,
    billingCity: false,
    billingState: false,
    billingZip: false,
    billingCountry: false,
    billingPhone: false,
  });

  const [CCErr, setCCErr] = useState({
    CC: false,
    month: false,
    year: false,
    cvv: false,
  });

  const [sameBillingAddress, setSameBilling] = useState(true);
  const [page, setPage] = useState(1);

  const errStyling = {
    borderColor: 'red',
    borderWidth: 1
  }

  const removeFromCart = (event, index, price) => {
    event.preventDefault();
    // dispatch(updateSubtotal('remove', Number(price)));
    // dispatch(removeFromCart(index));
    props.updateSubtotal('remove', Number(price));
    props.removeFromCart(index);
  }

  const exit = () => {
    // dispatch(changePage('products'));
    // dispatch(clearCart());
    // dispatch(updateSubtotal('remove', Number(subtotal)));
    props.changePage('products');
    props.clearCart();
    props.updateSubtotal('remove', Number(subtotal));
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({...formValues, [name]: value});
  }

  const handleSelection = (event) => {
    const { name, value } = event.target;
    const updatedInputState = formValues;
    updatedInputState[name] = value;
    setValues(updatedInputState);
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    let pass = true;

    if (page === 2) {
      const updatedAddErr = {...addressError};
      const updatedBillingErr = {...billingAddressError};
      for (let key in updatedAddErr) {
        if (formValues[key].length === 0) {
          updatedAddErr[key] = true;
          pass = false;
        } else {
          updatedAddErr[key] = false;
        }
      }

      if (!sameBillingAddress) {
        for (let key in updatedBillingErr) {
          if (formValues[key].length === 0) {
            updatedBillingErr[key] = true;
            pass = false;
          } else {
            updatedBillingErr[key] = false;
          }
        }
      }
      setAddressError(updatedAddErr);
      setBillingAddressError(updatedBillingErr);
    }

    if (page === 3) {
      const updatedCCErr = {...CCErr};
      for (let key in updatedCCErr) {
        if (formValues[key] === '') {
          updatedCCErr[key] = true;
          pass = false;
        } else {
          updatedCCErr[key] = false;
        }
      }
      setCCErr(updatedCCErr);
    }
    if (isKenny(formValues.fname)) {
      props.updateSubtotal('remove', Number(subtotal));
      setKenny(true);
    }
    if (pass) {
      setPage(page + 1);
    }
  }

  const OrderSummary = () => (
    <div id='checkoutCartSideBar'>
      <div id='checkoutCartDetails'>
        <h1>Order details <span>({ cart.length === 1 ? ('1 item') : (`${cart.length} items`)})</span></h1>
        {cart.length === 0 ? <p>Cart is empty</p> : null}
        <table>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>
                  <img style={{width: 80}} src={product.url}/>
                </td>
                <td className='productName'>{product.title}</td>
                <td>${product.price}</td>
                <td><button onClick={(event) => {removeFromCart(event, index, product.price)}}>Cancel</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='checkout-page-subtotal'>
          <p>Subtotal: ${subtotal.toFixed(2)} </p>
          <p>Sales Tax (10%): ${(subtotal * .1).toFixed(2)}</p>
          <p>Total: ${(subtotal * 1.1).toFixed(2)}</p>
          <button disabled={cart.length === 0 ? true : false} className={cart.length === 0 ? 'disabled' : null} onClick={handleSubmission}>Continue</button>
      </div>
    </div>
  );

  const OrderConfirmation = () => (
    <div>
      <h1>Thank you for your purchase!</h1>
      <div id='confirmation'>
        <div id='confirmationCartDetails'>
          <p className='confirmHeader'>Order Summary ({ cart.length === 1 ? ('1 item') : (`${cart.length} items`)})</p>
          {kenny ? <p style={{color: 'red'}}>100% discount for Kenny</p> : null}
          <table>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img style={{width: 50}} src={product.url}/>
                  </td>
                  <td className='productName'>{product.title}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subtotal: ${subtotal.toFixed(2)} </p>
          <p>Sales Tax (10%): ${(subtotal * .1).toFixed(2)}</p>
          <p>Total: ${(subtotal * 1.1).toFixed(2)}</p>
        </div>
        <div id='confirmContainer'>
            <div id='addresses'>
              <div id='addressConfirm'>
                <p className='confirmHeader' >Shipping Address:</p>
                <p>{formValues.fname} {formValues.lname}</p>
                {formValues.company ? <p>{formValues.company}</p> : null}
                <p>{formValues.address}</p>
                {formValues.address2 ? <p>{formValues.address2}</p> : null}
                <p>{formValues.city}, {formValues.state}, {formValues.country}</p>
                <p>{formValues.zip}</p>
                <p>{formValues.phone}</p>
                {sameBillingAddress ? <p>Billing address is the same as Shipping address</p> : null}
              </div>
              {sameBillingAddress ? null : (
                <div id='addressConfirm'>
                  <p className='confirmHeader' >Billing Address:</p>
                  <p>{formValues.billingfname} {formValues.billinglname}</p>
                  {formValues.billingCompany ? <p>{formValues.billingCompany}</p> : null}
                  <p>{formValues.billingAddress}</p>
                  {formValues.billingAddress2 ? <p>{formValues.billingAddress2}</p> : null}
                  <p>{formValues.billingCity}, {formValues.billingState}, {formValues.billingCountry}</p>
                  <p>{formValues.billingZip}</p>
                  <p>{formValues.billingPhone}</p>
                </div>
              )}
            </div>
        </div>
      </div>
      <button className='logout' id='back-products' onClick={() => {
           exit();
        // props.changePage('products');
        // props.clearCart();
        // props.updateSubtotal('remove', Number(subtotal));
      }}>Return to Shopping</button>
    </div>
  );

  return (
    <div id='mainCheckout'>
      <div id="checkout-header">
        <div id="checkout-top-bar" >
          <h1 className='storeName'>Generic Store</h1>
          <h1 className='storeName'>Checkout</h1>
          {page === 4 ? (
            <button className='logout' onClick={() => {
              exit();
              // props.clearCart();
              // props.signOut();
              // props.updateSubtotal('remove', Number(subtotal));
            }}>Log out</button>
          ) : (
            <button className='logout' onClick={() => {props.changePage('products')}}>Return to Shopping</button>
          )}

        </div>
      </div>
      <div>
        {page === 1 ? <OrderSummary /> : null}
        {page === 2 ? (
          <div>
            <p id='title'>Enter your full delivery address below <span>(* indicates required field)</span></p>
            <table className='checkout'>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="fname">First Name*</label><br />
                    {addressError.fname ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.fname ? errStyling : null} type="text" name="fname" value={formValues.fname} onChange={handleInput}/>
                  </td>
                  <td>
                    <label htmlFor="lname">Last Name*</label><br />
                    {addressError.lname ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.lname ? errStyling : null} type="text" id="lname" name="lname" value={formValues.lname} onChange={handleInput}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <label htmlFor="address">Address* </label> <br />
                    {addressError.address ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.address ? errStyling : null} type="text" id="address" name="address" value={formValues.address} onChange={handleInput}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <label htmlFor="address2">Address 2 (optional) </label> <br />
                    <input className='checkout' type="text" id="address2" name="address2" value={formValues.address2} onChange={handleInput}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <label htmlFor="company">Company Name (optional) </label> <br />
                    <input className='checkout' type="text" id="company" name="company" value={formValues.company} onChange={handleInput}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="city">City*</label> <br />
                    {addressError.city ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.city ? errStyling : null} type="text" id="city" name="city" value={formValues.city} onChange={handleInput}/>
                  </td>
                  <td>
                    <label htmlFor="state">State* </label> <br />
                    {addressError.state ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.state ? errStyling : null} type="text" id="state" name="state" value={formValues.state} onChange={handleInput}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="zip">Zip Code* </label> <br />
                    {addressError.zip ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.zip ? errStyling : null} type="text" id="zip" name="zip" value={formValues.zip} onChange={handleInput}/>
                  </td>
                  <td>
                    <label htmlFor="country">Country* </label> <br />
                    {addressError.country ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.country ? errStyling : null} type="text" id="country" name="country" value={formValues.country} onChange={handleInput}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <label htmlFor="phone">Phone Number* </label> <br />
                    {addressError.phone ? <span className='errorMsg'>field cannot be empty</span> : null}
                    <input className='checkout' style={addressError.phone ? errStyling : null} type="text" id="phone" name="phone" value={formValues.phone} onChange={handleInput}/>
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="checkbox" checked={sameBillingAddress} onChange={() => {setSameBilling(!sameBillingAddress)}} />
            <span>My Billing address is the same as my Shipping address</span> <br /><br />


            {sameBillingAddress ? null : (
              <div>
                <p id='title'>Billing Address <span>(* indicates required field)</span></p>
                <table className='checkout'>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="billingfname">First Name* </label> <br />
                        {billingAddressError.billingfname ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingfname ? errStyling : null} type="text" id="billingfname" name="billingfname" value={formValues.billingfname} onChange={handleInput} required/>
                      </td>
                      <td>
                        <label htmlFor="billinglname">Last Name* </label> <br />
                        {billingAddressError.billinglname ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billinglname ? errStyling : null} type="text" id="billinglname" name="billinglname" value={formValues.billinglname} onChange={handleInput}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="address">Address* </label> <br />
                        {billingAddressError.billingAddress ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingAddress ? errStyling : null} type="text" id="billingAddress" name="billingAddress" value={formValues.billingAddress} onChange={handleInput}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="address2">Address 2 (optional): </label> <br />
                        <input className='checkout' type="text" id="billingAddress2" name="billingAddress2" value={formValues.billingAddress2} onChange={handleInput}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="billingCompany">Company Name (optional) </label> <br />
                        <input className='checkout' type="text" id="billingCompany" name="billingCompany" value={formValues.billingCompany} onChange={handleInput}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="city">City* </label> <br />
                        {billingAddressError.billingCity ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingCity ? errStyling : null} type="text" id="billingCity" name="billingCity" value={formValues.billingCity} onChange={handleInput}/>
                      </td>
                      <td>
                        <label htmlFor="state">State* </label> <br />
                        {billingAddressError.billingState ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingState ? errStyling : null} type="text" id="billingState" name="billingState" value={formValues.billingState} onChange={handleInput}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="zip">Zip Code* </label> <br />
                        {billingAddressError.billingZip ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingZip ? errStyling : null} type="text" id="billingZip" name="billingZip" value={formValues.billingZip} onChange={handleInput}/>
                      </td>
                      <td>
                        <label htmlFor="billingCountry">Country* </label> <br />
                        {billingAddressError.billingCountry ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingCountry ? errStyling : null} type="text" id="billingCountry" name="billingCountry" value={formValues.billingCountry} onChange={handleInput}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="phone">Phone Number* </label> <br />
                        {billingAddressError.billingPhone ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='checkout' style={billingAddressError.billingPhone ? errStyling : null} type="text" id="billingPhone" name="billingPhone" value={formValues.billingPhone} onChange={handleInput}/>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              )}
              <br />
              <div>
                <button onClick={() =>{setPage(page - 1)}}>Back</button>
                <button onClick={handleSubmission}>Continue</button>
              </div>
            </div>
        ) : null}
        {page === 3 ? (
          <div id='creditCardForm'>
            <div id='finalReviewDetails'>
              <p>Order Summary ({ cart.length === 1 ? ('1 item') : (`${cart.length} items`)})</p>
              {kenny ? <p style={{color: 'red'}}>100% discount for Kenny</p> : null}
              <table>
                <tbody>
                  {cart.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img style={{width: 50}} src={product.url}/>
                      </td>
                      <td className='productName'>{product.title}</td>
                      <td>${product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <p>Subtotal: ${subtotal.toFixed(2)} </p>
                <p>Sales Tax (10%): ${(subtotal * .1).toFixed(2)}</p>
                <p>Total: ${(subtotal * 1.1).toFixed(2)}</p>
            </div>
            <div id='finalCC'>
              <p>Payment</p>
                <table className='creditCard'>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="CC">Credit Card Number</label><br />
                        {CCErr.CC ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='creditCard' style={CCErr.CC ? errStyling : null} type="text" id="CC" name="CC" value={formValues.CC} onChange={handleInput}/> <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="expiration">Expiration Date</label><br />
                        {CCErr.month ? <span className='errorMsg'>Invalid Month</span> : null}
                        <input className='creditCard' style={CCErr.month ? errStyling : null} list='expiration' name='month' onSelect={handleSelection}/>
                          <datalist id='expiration'>
                            <option value='Jan' />
                            <option value='Feb' />
                            <option value='Mar' />
                            <option value='Apr' />
                            <option value='May' />
                            <option value='Jun' />
                            <option value='Jul' />
                            <option value='Aug' />
                            <option value='Sept' />
                            <option value='Oct' />
                            <option value='Nov' />
                            <option value='Dec' />
                          </datalist>
                      </td>
                      <td>
                        <label  htmlFor="expiration">Expiration Date</label><br />
                        {CCErr.year ? <span className='errorMsg'>Invalid Month</span> : null}
                        <input className='creditCard' style={CCErr.year ? errStyling : null} list='expirationYear' name='year' onSelect={handleSelection}/>
                          <datalist id='expirationYear'>
                            <option value='2020' />
                            <option value='2021' />
                            <option value='2022' />
                            <option value='2023' />
                            <option value='2024' />
                            <option value='2025' />
                            <option value='2026' />
                            <option value='2027' />
                            <option value='2028' />
                            <option value='2029' />
                            <option value='2030' />
                          </datalist>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="cvv">CVV</label> <br />
                        {CCErr.cvv ? <span className='errorMsg'>field cannot be empty</span> : null}
                        <input className='creditCard' style={CCErr.cvv ? errStyling : null} type="password" id="cvv" name="cvv" value={formValues.cvv} onChange={handleInput}/> <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              <div>
                <button onClick={() =>{setPage(page - 1)}}>Previous</button>
                <button onClick={handleSubmission}>Place order</button>
              </div>
            </div>
          </div>
        ) : null}
        {page === 4 ? <OrderConfirmation /> : null}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    changePage: (page) => dispatch(changePage(page)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    updateSubtotal: (action, value) => dispatch(updateSubtotal(action, value)),
    clearCart: () => dispatch(clearCart())
  }
};

export default connect(null, mapDispatchToProps)(Checkout);
// export default Checkout;
