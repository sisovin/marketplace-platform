import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import ShopTemplate from './template/ShopTemplate';

const ShopPage = () => {
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

  return shop ? <ShopTemplate shop={shop} /> : <p>Shop not found</p>;
};

export default ShopPage;
