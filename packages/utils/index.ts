import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey || !stripeSecretKey) {
  throw new Error('Missing environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });

export const subscribeToRealtimeUpdates = (table, callback) => {
  const subscription = supabase
    .from(table)
    .on('INSERT', payload => {
      callback(payload.new);
    })
    .subscribe();

  return () => {
    supabase.removeSubscription(subscription);
  };
};

export const processPayment = async (amount, currency, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment processing failed: ${error.message}`);
  }
};
