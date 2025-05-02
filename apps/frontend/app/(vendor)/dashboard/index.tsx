import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { VendorType, ProductType, OrderType } from '../../../../../packages/types';
import { Table, Chart } from '../../../components/ui';

const SalesAnalyticsDashboard = () => {
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

  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (
    <div>
      <h1>Sales Analytics Dashboard</h1>
      <h2>Welcome, {vendor?.name}</h2>
      <div>
        <p>Total Sales: ${totalSales}</p>
        <p>Total Products: {totalProducts}</p>
        <p>Total Orders: {totalOrders}</p>
      </div>
      <h2>Products</h2>
      <Table data={products} columns={['name', 'description', 'price']} />
      <h2>Orders</h2>
      <Table data={orders} columns={['productId', 'quantity', 'totalPrice', 'orderDate', 'status']} />
      <h2>Sales Chart</h2>
      <Chart data={orders} />
    </div>
  );
};

export default SalesAnalyticsDashboard;
