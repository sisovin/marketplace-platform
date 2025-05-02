import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../../lib/supabase';
import { Card } from '../../../../components/ui';

const OrderStatusPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          setOrder(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrder();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Order Status</h1>
      {order && (
        <Card>
          <h2>Order ID: {order.id}</h2>
          <p>Total: ${order.total}</p>
          <p>Status: {order.status}</p>
        </Card>
      )}
    </div>
  );
};

export default OrderStatusPage;
