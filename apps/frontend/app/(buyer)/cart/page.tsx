import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Card, Button, Input } from '../../../components/ui';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data, error } = await supabase
          .from('cart')
          .select('*');
        if (error) throw error;
        setCartItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, quantity) => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', id);
      if (error) throw error;
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckout = async () => {
    // Implement checkout logic here
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id}>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
            <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
          </Card>
        ))
      )}
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default CartPage;
