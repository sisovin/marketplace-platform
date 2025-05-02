import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Card, Button } from '../../components/ui';

export default function HomePage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data, error } = await supabase
          .from('shops')
          .select('*');
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Shop Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map(shop => (
          <Card key={shop.id}>
            <h2>{shop.name}</h2>
            <p>{shop.description}</p>
            <Button href={`/shops/${shop.id}`}>View Shop</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
