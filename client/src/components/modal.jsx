import React from 'react';
import ReactDom from 'react-dom';


const Modal = ({ product, atc, close }) => {
  return ReactDom.createPortal(
    <div id='overlay'>
      <div id='suggestionModal' >
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <img src={product.url}/>
          <div id='product-details' style={{paddingLeft: 20}}>
            <p>{product.title}</p>
            <p>Product type: {product.category}</p>
            <p>${product.price}</p>
          </div>
        </div>
        <p><strong>Details: </strong>{product.description}</p>
        <button onClick={() => {close()}}>Continue shopping</button>
        <button onClick={(e) => {atc(e, product)}}>Add to Cart</button>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;