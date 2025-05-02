import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { Table, Button } from '../../../../components/ui';

const ShopsApprovalPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data, error } = await supabase
          .from('shops')
          .select('*')
          .eq('status', 'pending');
        if (error) throw error;
        setShops(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const { error } = await supabase
        .from('shops')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      setShops((prevShops) => prevShops.filter((shop) => shop.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Shops Pending Approval</h1>
      {shops.length === 0 ? (
        <p>No shops pending approval</p>
      ) : (
        <Table data={shops} columns={['name', 'description', 'actions']} renderRow={(shop) => (
          <tr key={shop.id}>
            <td>{shop.name}</td>
            <td>{shop.description}</td>
            <td>
              <Button onClick={() => handleApproval(shop.id, 'approved')}>Approve</Button>
              <Button onClick={() => handleApproval(shop.id, 'rejected')}>Reject</Button>
            </td>
          </tr>
        )} />
      )}
    </div>
  );
};

export default ShopsApprovalPage;
