import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { Input, Button, Form, Upload } from '../../../../components/ui';

const CreateShopPage = () => {
  const [shopName, setShopName] = useState('');
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogoUpload = async (file) => {
    const { data, error } = await supabase.storage
      .from('shop-logos')
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
      const logoUrl = await handleLogoUpload(logo);

      if (!logoUrl) {
        throw new Error('Logo upload failed');
      }

      const { data, error } = await supabase
        .from('shops')
        .insert([{ name: shopName, logo_url: logoUrl }]);

      if (error) throw error;

      alert('Shop created successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Shop</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Shop Name"
          required
        />
        <Upload
          onChange={(file) => setLogo(file)}
          accept="image/*"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Shop'}
        </Button>
      </Form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateShopPage;
