import React from 'react'

export const sampleProducts = [
  { id: 1, name: 'Apple',  category: 'Fruits', price: 1.2 },
  { id: 2, name: 'Banana', category: 'Fruits', price: 0.5 },
  { id: 3, name: 'Milk',   category: 'Dairy',  price: 2.5 },
  { id: 4, name: 'Cheese', category: 'Dairy',  price: 3.0 },
  { id: 5, name: 'Mango',  category: 'Fruits', price: 1.8 },
]

const ProductList = ({ selectedCategory, onAddToCart, cart = [] }) => {
  const filtered =
    selectedCategory === 'all'
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === selectedCategory)

  return (
    <div className="product-list">
      {filtered.length === 0 ? (
        <p>No products available.</p>
      ) : (
        filtered.map((product) => {
          const inCart = cart.find((item) => item.id === product.id)
          return (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <button onClick={() => onAddToCart(product)} disabled={!!inCart}>
                {inCart ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          )
        })
      )}
    </div>
  )
}

export default ProductList