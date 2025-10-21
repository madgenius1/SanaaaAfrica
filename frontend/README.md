# Sanaa African Curios

> Handcrafted African Jewelry, Garments & Décor — A high-end ecommerce platform showcasing authentic artisan goods with stories that preserve culture and support livelihoods.

## 🎨 Project Overview

Sanaa African Curios is a production-ready, SEO-optimized ecommerce platform built with:

- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Backend/CMS**: PayloadCMS (self-hosted, headless CMS)
- **Payments**: Stripe (test mode)
- **Deployment**: Vercel (frontend) + DigitalOcean/Railway (backend)

## 📁 Repository Structure

/sanaa-african-curios
├── /frontend          # Next.js App Router application
├── /backend           # PayloadCMS headless CMS
├── /shared            # Shared types and constants
├── README.md          # This file
├── pnpm-workspace.yaml
└── package.json       # Root workspace scripts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm 8+
- Stripe account (test mode keys)
- (Optional) MongoDB instance for Payload (or use local file storage)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd sanaa-african-curios

# Install all dependencies
pnpm install
```

### 2. Environment Setup

#### Frontend (.env.local in /frontend)

```bash
cp frontend/.env.example frontend/.env.local
```

Edit `frontend/.env.local`:

```env
# Payload CMS Backend
PAYLOAD_URL=http://localhost:3001
PAYLOAD_SERVER_URL=http://localhost:3001
PAYLOAD_API_KEY=your-payload-api-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Image CDN (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (.env in /backend)

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
# Database
DATABASE_URI=mongodb://localhost:27017/sanaa
# OR use file-based (for quick local dev)
# DATABASE_URI=

# Payload
PAYLOAD_SECRET=your-secret-key-min-32-chars
PAYLOAD_PORT=3001

# Admin user (for first setup)
PAYLOAD_ADMIN_EMAIL=admin@sanaa.com
PAYLOAD_ADMIN_PASSWORD=changeme123

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### 3. Run Development Servers

#### Option A: Run both concurrently (from root)

```bash
pnpm dev
```

#### Option B: Run separately

```bash
# Terminal 1 - Backend
cd backend
pnpm dev

# Terminal 2 - Frontend
cd frontend
pnpm dev
```

- Frontend: <http://localhost:3000>
- Backend Admin: <http://localhost:3001/admin>

### 4. Seed Sample Data

```bash
# From root directory
pnpm seed

# Or from backend directory
cd backend
pnpm seed
```

This populates:

- 8 sample products (jewelry, bags, garments, décor)
- 4 artisans with portraits and stories
- 2 collections (Heritage & Contemporary)
- 3 customer testimonials
- Site settings

### 5. Access Admin Panel

1. Navigate to <http://localhost:3001/admin>
2. Login with credentials from `.env`:
   - Email: `admin@sanaa.com`
   - Password: `changeme123`
3. Browse collections, upload images, edit products

## 🧪 Testing

### Run Tests

```bash
# Frontend unit tests
cd frontend
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Test Stripe Integration

1. Use Stripe test cards: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any billing ZIP

### Webhook Testing (Local)

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhook

# Copy webhook signing secret to STRIPE_WEBHOOK_SECRET in .env.local
```

## 📦 Build & Production

### Frontend Build

```bash
cd frontend
pnpm build
pnpm start
```

### Backend Build

```bash
cd backend
pnpm build
pnpm start
```

## 🚢 Deployment

### Frontend (Vercel - Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variables from `.env.example`
5. Deploy

**Environment Variables for Vercel:**

- All variables from `frontend/.env.example`
- Set `PAYLOAD_URL` and `PAYLOAD_SERVER_URL` to your backend URL

### Backend (DigitalOcean/Railway/Render)

#### Option 1: DigitalOcean App Platform

1. Create new app from GitHub
2. Set root directory to `backend`
3. Build command: `pnpm install && pnpm build`
4. Run command: `pnpm start`
5. Add environment variables
6. Attach managed MongoDB database

#### Option 2: Railway

1. Create new project from GitHub
2. Set root directory to `backend`
3. Railway auto-detects Node.js
4. Add environment variables
5. Attach MongoDB plugin

#### Option 3: Docker Deployment

```bash
cd backend
docker build -t sanaa-backend .
docker run -p 3001:3001 --env-file .env sanaa-backend
```

#### Database Options

- **Production**: MongoDB Atlas (recommended)
- **Alternative**: PostgreSQL with Payload 2.0+
- **Local**: File-based storage (not recommended for production)

### Post-Deployment Checklist

- [ ] Update CORS origins in backend `.env`
- [ ] Configure Stripe webhook endpoint (use production URL)
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Enable domain in Cloudinary (if using)
- [ ] Test checkout flow end-to-end
- [ ] Verify email notifications work
- [ ] Check SEO meta tags and OG images
- [ ] Run Lighthouse audit (aim for 90+ scores)

## 🎨 Design System

### Color Palette

```css
--rust: #D8712A        /* Primary accent */
--terracotta: #C75B3A  /* Secondary accent */
--sage: #A5B08A        /* Tertiary accent */
--emerald: #1E6F49     /* Success/nature */
--ivory: #FAF5EB       /* Background/light */
--burgundy: #6B1F2E    /* Dark accent */
--navy: #0B233F        /* Text/headers */
```

### Typography

- **Headings**: Playfair Display (editorial, elegant)
- **Body**: Inter (clean, readable)
- **Accents**: Libre Franklin (buttons, labels)

## 🔧 Development Scripts

### Root (workspace)

- `pnpm dev` - Run frontend + backend concurrently
- `pnpm build` - Build both projects
- `pnpm lint` - Lint all code
- `pnpm seed` - Seed backend with sample data

### Frontend

- `pnpm dev` - Start dev server (port 3000)
- `pnpm build` - Production build
- `pnpm start` - Serve production build
- `pnpm lint` - ESLint check
- `pnpm format` - Prettier format
- `pnpm test` - Run tests

### Backend

- `pnpm dev` - Start dev server (port 3001)
- `pnpm build` - Build Payload
- `pnpm start` - Serve production
- `pnpm seed` - Import sample data

## 📊 SEO & Marketing

### Homepage Meta

- **Title**: Sanaa African Curios — Handcrafted African Jewelry, Garments & Décor
- **Description**: Discover authentic, hand-made curios from Kenya. Every purchase preserves culture and supports artisan livelihoods. Shop ethical jewelry, garments, bags and home décor.
- **Keywords**: Kenyan handcrafted jewelry, African artisan goods, ethical African fashion, handmade bags Kenya, African home decor, Kenyan artisans, sustainable fashion Africa, African gifts, cultural jewelry, export quality curios, artisan stories, fair trade jewelry

### Social Integration

- Instagram: Display feed via Basic Display API
- TikTok: Embedded video content
- Share buttons on all product pages
- OG images auto-generated for products

## 🔐 Security Notes

- Never commit `.env` files
- Use test Stripe keys in development
- Rotate `PAYLOAD_SECRET` in production
- Enable CORS restrictions in backend
- Use HTTPS in production
- Implement rate limiting on API routes (recommended)

## 🐛 Troubleshooting

### Frontend won't start

- Check Node.js version (18+)
- Delete `node_modules` and `.next`, reinstall
- Verify `.env.local` exists with all required vars

### Backend connection error

- Ensure backend is running on correct port
- Check `PAYLOAD_URL` in frontend `.env.local`
- Verify CORS settings in backend allow frontend origin

### Images not loading

- Verify image URLs in seed data
- Check `next.config.mjs` has correct `remotePatterns`
- For Cloudinary: verify cloud name is correct

### Stripe checkout fails

- Use test card: 4242 4242 4242 4242
- Check Stripe keys are in test mode
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [PayloadCMS Docs](https://payloadcms.com/docs)
- [Stripe API Docs](https://stripe.com/docs/api)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📄 License

MIT License - feel free to use for commercial projects

## 🆘 Support

For issues or questions:

- GitHub Issues: [your-repo-url]/issues
- Email: <admin@sanaa.com>
