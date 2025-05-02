import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Card } from '../../../components/ui';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*');
        if (error) throw error;
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
