import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const vendor1 = await prisma.vendor.create({
    data: {
      name: 'Vendor One',
      email: 'vendor1@example.com',
      password: passwordHash,
      products: {
        create: [
          {
            name: 'Product One',
            description: 'Description for product one',
            price: 10.0,
          },
          {
            name: 'Product Two',
            description: 'Description for product two',
            price: 20.0,
          },
        ],
      },
    },
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      name: 'Vendor Two',
      email: 'vendor2@example.com',
      password: passwordHash,
      products: {
        create: [
          {
            name: 'Product Three',
            description: 'Description for product three',
            price: 30.0,
          },
          {
            name: 'Product Four',
            description: 'Description for product four',
            price: 40.0,
          },
        ],
      },
    },
  });

  const stripeAccount1 = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email: 'vendor1@example.com',
  });

  const stripeAccount2 = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email: 'vendor2@example.com',
  });

  await prisma.vendor.update({
    where: { id: vendor1.id },
    data: { stripeAccountId: stripeAccount1.id },
  });

  await prisma.vendor.update({
    where: { id: vendor2.id },
    data: { stripeAccountId: stripeAccount2.id },
  });

  await prisma.order.create({
    data: {
      total: 30.0,
      vendorId: vendor1.id,
      productId: vendor1.products[0].id,
      stripePaymentId: 'pi_1J2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M',
    },
  });

  await prisma.order.create({
    data: {
      total: 40.0,
      vendorId: vendor2.id,
      productId: vendor2.products[0].id,
      stripePaymentId: 'pi_1J2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6N',
    },
  });

  const stripeCustomer1 = await stripe.customers.create({
    email: vendor1.email,
  });

  const stripeCustomer2 = await stripe.customers.create({
    email: vendor2.email,
  });

  await prisma.stripeCustomer.create({
    data: {
      email: vendor1.email,
      vendorId: vendor1.id,
    },
  });

  await prisma.stripeCustomer.create({
    data: {
      email: vendor2.email,
      vendorId: vendor2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
