import React from 'react'

const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h2> Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} is in your cart.</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart