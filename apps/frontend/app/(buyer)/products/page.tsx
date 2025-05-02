import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Card, Button, Input } from '../../../components/ui';

const ProductGridWithFilters = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`);
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product Grid</h1>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <Button onClick={handleSearch}>Search</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Card key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGridWithFilters;
