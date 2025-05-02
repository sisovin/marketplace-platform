import { z } from 'zod';

export const Vendor = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  vendorId: z.string(),
});

export const Order = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
  orderDate: z.date(),
  status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']),
});

export type VendorType = z.infer<typeof Vendor>;
export type ProductType = z.infer<typeof Product>;
export type OrderType = z.infer<typeof Order>;
