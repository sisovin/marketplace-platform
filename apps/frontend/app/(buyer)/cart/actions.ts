import { supabase } from '../../../lib/supabase';

export const checkout = async (cartItems) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert(cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        total_price: item.price * item.quantity,
      })));

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error during checkout:', error.message);
    throw error;
  }
};
