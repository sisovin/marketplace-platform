import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { Input, Button, Form, Upload } from '../../../../components/ui';

const CreateProductPage = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(`public/${file.name}`, file);

    if (error) {
      setError(error.message);
      return null;
    }

    return data.Key;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const imageUrl = await handleImageUpload(image);

      if (!imageUrl) {
        throw new Error('Image upload failed');
      }

      const { data, error } = await supabase
        .from('products')
        .insert([{ name: productName, description, price: parseFloat(price), image_url: imageUrl }]);

      if (error) throw error;

      alert('Product created successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <Upload
          onChange={(file) => setImage(file)}
          accept="image/*"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </Form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateProductPage;
