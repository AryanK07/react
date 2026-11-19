import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectCartItems, updateQuantity } from './CartSlice.jsx';
import { ShopNav } from './ProductList.jsx';
import { formatPrice } from './money.js';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const total = items.reduce((amount, item) => amount + item.price * item.quantity, 0);

  return (
    <>
      <ShopNav page="cart" />
      <main className="shell cart-page">
        <div className="shop-intro"><h1>Shopping Cart</h1></div>
        <div className="cart-layout">
          <section aria-label="Items in your cart">
            {items.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              <ul className="cart-items">
                {items.map((item) => (
                  <li className="cart-row" key={item.id}>
                    <img src={item.image} alt={item.name} width="96" height="96" />
                    <div className="cart-product">
                      <h2>{item.name}</h2>
                      <p>{formatPrice(item.price)} per plant</p>
                      <button className="text-button" aria-label={`Delete ${item.name}`}
                        onClick={() => dispatch(removeItem(item.id))}>Delete</button>
                    </div>
                    <div className="quantity" aria-label={`${item.name} quantity`}>
                      <button aria-label={`Decrease quantity of ${item.name}`} onClick={() => dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      }))}>−</button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button aria-label={`Increase quantity of ${item.name}`} onClick={() => dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      }))}>+</button>
                    </div>
                    <strong className="line-total">{formatPrice(item.price * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="cart-summary" aria-labelledby="cart-summary-title">
            <h2 id="cart-summary-title">Order summary</h2>
            <div className="order-total">
              <span>Total</span>
              <strong aria-live="polite">{formatPrice(total)}</strong>
            </div>
            <button className="button" onClick={() => setCheckoutMessage('Checkout is coming soon.')}>
              Checkout
            </button>
            <p className="checkout-message" role="status">{checkoutMessage}</p>
            <a className="continue-link" href="#plants">Continue Shopping <span aria-hidden="true">↗</span></a>
          </section>
        </div>
      </main>
    </>
  );
}
