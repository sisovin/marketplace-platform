import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Table, Button, Input, Modal } from '../../../components/ui';
import { ProductType } from '../../../../../packages/types';

const ProductCRUD = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductType>({
    id: '',
    name: '',
    description: '',
    price: 0,
    vendorId: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const { data, error } = await supabase.from('products').insert([newProduct]);
      if (error) throw error;
      setProducts((prevProducts) => [...prevProducts, data[0]]);
      setModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product Management</h1>
      <Button onClick={() => setModalOpen(true)}>Add Product</Button>
      <Table data={products} columns={['name', 'description', 'price']} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Add New Product</h2>
        <Input
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <Input
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
        />
        <Input
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </Modal>
    </div>
  );
};

export default ProductCRUD;
