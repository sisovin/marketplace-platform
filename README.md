# Marketplace Platform

The **Marketplace Platform** is an online marketplace designed for small and local vendors to create digital storefronts, mimicking the experience of a local or provincial market. This platform empowers shop owners to reach townspeople and nearby communities with an affordable and user-friendly e-commerce solution tailored for their needs.

---

## Table of Contents

1. [About the Project](#about-the-project)
   - [Core Idea](#core-idea)
   - [Unique Selling Points](#unique-selling-points)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Monorepo Structure](#monorepo-structure)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Setup Instructions](#setup-instructions)
6. [Marketing Strategies](#marketing-strategies)
7. [Contributing](#contributing)
8. [License](#license)
9. [Community and Support](#community-and-support)

---

## About the Project

The **Marketplace Platform** is aimed at small and local vendors who often lack access to affordable, user-friendly e-commerce tools. By focusing on local markets and providing features tailored to their needs, the platform bridges the gap between traditional market experiences and modern digital commerce.

### Core Idea

- Enable small/local vendors to create digital storefronts targeting their local communities.
- Mimic the traditional market experience while providing the benefits of e-commerce.

### Unique Selling Points

1. **Localized Focus**: Tailored for specific towns and communities with support for regional languages and currencies.
2. **Affordable Solution**: Low transaction fees and cost-effective plans for small businesses.
3. **Vendor-Friendly Design**: Simplified onboarding and management tools for non-technical shop owners.
4. **Community-Oriented Features**: Tools to promote local products and foster a sense of community.

---

## Tech Stack

The platform is built with modern and efficient technologies, leveraging AI tools for rapid development and scalability:

- **Frontend**: Next.js + React (with Cursor AI for rapid prototyping)
- **Backend**: Nest.js (using Cody AI for autocompletion)
- **Database**: PostgreSQL + Prisma ORM (schema design assisted by DataButton)
- **Authentication**: Supabase and Clerk (AI-integrated auth solutions)
- **Infrastructure**: Docker for containerized deployments

---

## Features

- **Vendor Registration**: Easy onboarding for shop owners with Clerk-based authentication.
- **Product Management**: Vendors can add, edit, and manage their product listings with AI-generated CRUD APIs.
- **Order Management**: Track and process customer orders seamlessly.
- **Vendor Dashboard**: A responsive and intuitive dashboard for managing storefronts, built with AI-assisted UI components.
- **Localized Experience**: Regional language support and tools tailored for local communities.
- **Mobile and Desktop Accessibility**: Fully responsive design for a seamless experience across devices.

---

## Monorepo Structure

The repository uses a monorepo-based structure to centralize all the components of the platform:

```
marketplace-platform/
├── 📁 apps/
│   ├── 📁 frontend/               # Next.js 14 (App Router)
│   │   ├── 📁 public/             # Static assets
│   │   ├── 📁 src/
│   │   │   ├── 📁 app/            # App Router
│   │   │   │   ├── (auth)/        # Auth routes
│   │   │   │   │   ├── login/     # Auth UI
│   │   │   │   │   └── register/
│   │   │   │   ├── (vendor)/      # Vendor dashboard (protected)
│   │   │   │   │   ├── products/  # CRUD products
│   │   │   │   │   └── orders/
│   │   │   │   ├── (public)/      # Public marketplace
│   │   │   │   │   ├── shops/     # Shop listings
│   │   │   │   │   └── products/
│   │   │   │   ├── api/           # Next.js API routes (proxies to NestJS)
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx       # Homepage
│   │   │   ├── 📁 components/     # Reusable UI (shadcn)
│   │   │   │   ├── ui/            # shadcn components
│   │   │   │   ├── auth/
│   │   │   │   └── vendor/
│   │   │   ├── 📁 lib/            # Utilities
│   │   │   │   ├── supabase.ts    # Supabase client
│   │   │   │   └── constants.ts
│   │   │   ├── 📁 types/          # TypeScript types
│   │   │   └── 📁 styles/         # Tailwind/global CSS
│   │   ├── next.config.mjs
│   │   └── tsconfig.json
│   │
│   └── 📁 backend/              # NestJS
│       ├── 📁 src/
│       │   ├── 📁 auth/          # Auth module
│       │   │   ├── auth.service.ts
│       │   │   └── auth.controller.ts
│       │   ├── 📁 vendor/        # Vendor logic
│       │   ├── 📁 product/       # Product CRUD
│       │   ├── 📁 order/         # Order processing
│       │   ├── 📁 prisma/        # Prisma schema
│       │   │   └── schema.prisma
│       │   ├── main.ts          # App entry
│       │   └── app.module.ts
│       ├── .env
│       └── package.json
│
├── 📁 packages/                # Shared code
│   └── 📁 types/               # Shared TS types
│       └── index.ts
│
├── 📁 supabase/                # Supabase configs
│   ├── migrations/             # SQL migrations
│   └── seed.ts                 # Mock data
│
├── docker-compose.yml          # Postgres/NestJS
└── package.json                # Monorepo root
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **Docker** (>= 20.x)
- **PostgreSQL** (>= 12.x)
- **Supabase Account** (for authentication setup)

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/sisovin/marketplace-platform.git
   cd marketplace-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your-database-url
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-api-key
   ```

4. Start the development servers:

   - **Backend**:

     ```bash
     cd apps/backend
     npm start
     ```

   - **Frontend**:

     ```bash
     cd apps/frontend
     npm start
     ```

5. Access the application in your browser:

   - **Frontend**: `http://localhost:3000`
   - **Admin Dashboard**: `http://localhost:3001`

---

## Marketing Strategies

To ensure the platform reaches its target audience, the following strategies are recommended:

1. **Influencer Outreach**:
   - Partner with local business influencers on TikTok and Instagram to demo the platform and showcase shop success stories.

2. **SEO Optimization**:
   - Use AI tools like MarketMuse to identify key phrases such as “affordable local online market” and optimize content accordingly.

3. **Geo-Targeted Ads**:
   - Run Facebook ads targeting towns with high traditional market usage, emphasizing the benefits of a digital marketplace.

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Description of changes"`.
4. Push your branch: `git push origin feature-name`.
5. Open a Pull Request.

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure all contributions are well-documented and tested.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Community and Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/sisovin/marketplace-platform/issues).
- **Discussions**: Join the [GitHub Discussions](https://github.com/sisovin/marketplace-platform/discussions) to share ideas and ask questions.
- **Contact**: Reach out to the maintainers at [email@example.com](mailto:email@example.com).

---
