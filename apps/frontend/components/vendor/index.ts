import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Table, Button, Input, Modal } from '../ui';
import { VendorType, ProductType, OrderType } from '../../../../packages/types';

export function VendorDashboard() {
  const [vendor, setVendor] = useState<VendorType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const { data: vendorData, error: vendorError } = await supabase
          .from('vendors')
          .select('*')
          .single();
        if (vendorError) throw vendorError;
        setVendor(vendorData);

        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('vendorId', vendorData.id);
        if (productsError) throw productsError;
        setProducts(productsData);

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('vendorId', vendorData.id);
        if (ordersError) throw ordersError;
        setOrders(ordersData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Welcome, {vendor?.name}</h1>
      <h2>Products</h2>
      <Table data={products} columns={['name', 'description', 'price']} />
      <h2>Orders</h2>
      <Table data={orders} columns={['productId', 'quantity', 'totalPrice', 'orderDate', 'status']} />
    </div>
  );
}
