import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../../lib/supabase';
import { Input, Button, Form, Upload } from '../../../../components/ui';

const EditShopPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [shop, setShop] = useState(null);
  const [shopName, setShopName] = useState('');
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchShop = async () => {
        const { data, error } = await supabase
          .from('shops')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setShop(data);
          setShopName(data.name);
        }
      };

      fetchShop();
    }
  }, [id]);

  const handleLogoUpload = async (file) => {
    const { data, error } = await supabase.storage
      .from('logos')
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
      let logoUrl = shop.logo_url;

      if (logo) {
        logoUrl = await handleLogoUpload(logo);

        if (!logoUrl) {
          throw new Error('Logo upload failed');
        }
      }

      const { data, error } = await supabase
        .from('shops')
        .update({ name: shopName, logo_url: logoUrl })
        .eq('id', id);

      if (error) throw error;

      alert('Shop updated successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Shop</h1>
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
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Shop'}
        </Button>
      </Form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default EditShopPage;
