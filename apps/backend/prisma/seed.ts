import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

  await prisma.order.create({
    data: {
      total: 30.0,
      vendorId: vendor1.id,
      productId: vendor1.products[0].id,
    },
  });

  await prisma.order.create({
    data: {
      total: 40.0,
      vendorId: vendor2.id,
      productId: vendor2.products[0].id,
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
