import React from 'react';

const ShopTemplate = ({ shop }) => {
  return (
    <div className="shop-template">
      <header className="shop-header">
        <h1>{shop.name}</h1>
        <p>{shop.description}</p>
      </header>
      <main className="shop-main">
        <section className="shop-products">
          <h2>Products</h2>
          <ul>
            {shop.products.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="shop-footer">
        <p>Contact: {shop.contact}</p>
      </footer>
    </div>
  );
};

export default ShopTemplate;
