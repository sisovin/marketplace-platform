import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../../lib/supabase';
import { Card, Button, Image } from '../../../../components/ui';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          setProduct(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product Details</h1>
      {product && (
        <Card>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Image src={product.image_url} alt={product.name} />
          <Button>Add to Cart</Button>
        </Card>
      )}
    </div>
  );
};

export default ProductDetailsPage;
