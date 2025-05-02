import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Table } from '../../../components/ui';
import { OrderType } from '../../../../../packages/types';

const OrderManagement = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*');
        if (ordersError) throw ordersError;
        setOrders(ordersData);
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
      <h1>Order Management</h1>
      <Table data={orders} columns={['productId', 'quantity', 'totalPrice', 'orderDate', 'status']} />
    </div>
  );
};

export default OrderManagement;
