import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';
import { Card, Button } from '../../../components/ui';

export default function ShopPage() {
  const router = useRouter();
  const { id } = router.query;
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchShop = async () => {
        try {
          const { data, error } = await supabase
            .from('shops')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          setShop(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchShop();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{shop.name}</h1>
      <p>{shop.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shop.products.map(product => (
          <Card key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Button>Add to Cart</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
