# BF-Fabric — Full Stack E-Commerce Application

<p align="center">
  <img src="https://img.shields.io/badge/React-16.13-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.0-brightgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/Docker-Compose-blue?logo=docker" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-black?logo=github" />
  <img src="https://img.shields.io/badge/Jenkins-Docker-red?logo=jenkins" />
</p>

A production-ready full-stack e-commerce web application built with **React** (frontend) and **Node.js/Express** (backend), using **MongoDB** as the database. The project includes a complete shopping experience — product browsing, cart, wishlist, checkout with Braintree payments, an admin panel, and a full CI/CD pipeline with Docker and GitHub Actions.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [Dataset & Images](#-dataset--images)
- [Seed Data](#-seed-data)
- [Docker Setup](#-docker-setup)
- [CI/CD Pipeline](#-cicd-pipeline)
- [API Endpoints](#-api-endpoints)
- [Version History](#-version-history)

---

## ✨ Features

### 🛍️ Shop (Customer)
- Browse all products on homepage with grid layout
- Filter products by category or price range
- Product detail page with image gallery, description, reviews & star ratings
- Add to cart / remove from cart
- Add to wishlist / remove from wishlist
- Checkout with **Braintree** payment gateway (Sandbox mode)
- Order history in user dashboard
- User profile management (name, email, address)
- Change password from dashboard
- Login / Signup with **JWT** authentication
- Protected routes (cart & checkout require login)

### 🔧 Admin Panel
- Dashboard with total sales, orders, products, categories overview
- Manage **Categories** — add, edit, delete with image upload
- Manage **Products** — add, edit, delete with 2-image upload, price, offer, quantity
- Manage **Orders** — view all orders, update status (Pending → Processing → Shipped → Delivered), delete
- **Customize** homepage slider images
- Admin-only protected routes

### 🖼️ Product Images
- Real product images sourced from the **Apparel Images Dataset** (Kaggle)
- 25 products across 4 categories with 2 images each (50 product images total)
- Images organized by type: shirts, pants, shorts, dresses, shoes
- Automatic image copy script (`copyImages.js`) to populate uploads from dataset

### 🎨 UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Fixed-height product cards — uniform grid layout regardless of image dimensions
- Smooth hover zoom effect on product images
- Loading spinner while fetching products
- Tailwind CSS utility classes for styling

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | React | 16.13.1 |
| Frontend Routing | React Router DOM | v5 |
| Frontend Styling | Tailwind CSS, Bootstrap | 4.5 |
| HTTP Client | Axios | 1.6.3 |
| Backend | Node.js + Express.js | 18+ / 4.17 |
| Database | MongoDB + Mongoose | 6.0 / 5.9 |
| Authentication | JWT (jsonwebtoken) + bcryptjs | — |
| Payments | Braintree (Sandbox) | 3.0 |
| File Upload | Multer | 1.4 |
| Dev Server | Nodemon | 2.0 |
| Containerization | Docker + Docker Compose | — |
| CI/CD | GitHub Actions + Jenkins (Docker) | — |

---

## 📁 Project Structure

```
BF-Fabric/
├── public/
│   ├── index.html                # HTML entry point
│   └── style.css
├── src/                          # React frontend source
│   ├── components/
│   │   ├── admin/                # Admin panel
│   │   │   ├── categories/       # Category CRUD UI
│   │   │   ├── dashboardAdmin/   # Admin dashboard, sales cards, customize
│   │   │   ├── layout/           # Admin layout wrapper
│   │   │   ├── orders/           # Order management UI
│   │   │   ├── partials/         # Admin navbar, sidebar, footer
│   │   │   └── products/         # Product CRUD UI
│   │   └── shop/                 # Customer-facing UI
│   │       ├── auth/             # Login, Signup, Protected routes
│   │       ├── blog/             # Blog page
│   │       ├── contact/          # Contact page
│   │       ├── dashboardUser/    # User profile, orders, settings
│   │       ├── home/             # Homepage, product grid, category filter, slider
│   │       ├── layout/           # Shop layout wrapper
│   │       ├── order/            # Checkout page
│   │       ├── partials/         # Navbar, Footer, Cart modal
│   │       ├── productDetails/   # Product detail page, reviews
│   │       └── wishlist/         # Wishlist page
│   ├── App.js                    # Routes definition
│   └── index.js                  # React entry point
├── server/                       # Express backend
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   ├── function.js           # Helper utilities
│   │   ├── keys.js               # JWT secret config
│   │   └── uploadFolderCreateScript.js  # Auto-create upload dirs
│   ├── controller/               # Business logic
│   │   ├── auth.js               # Signup, Signin
│   │   ├── braintree.js          # Payment token & processing
│   │   ├── categories.js         # Category CRUD
│   │   ├── customize.js          # Slider image management
│   │   ├── orders.js             # Order CRUD
│   │   ├── products.js           # Product CRUD, reviews, filters
│   │   └── users.js              # User profile, password change
│   ├── middleware/
│   │   └── auth.js               # JWT auth middleware, isAdmin check
│   ├── models/                   # Mongoose schemas
│   │   ├── categories.js         # Category schema
│   │   ├── customize.js          # Customize/slider schema
│   │   ├── orders.js             # Order schema
│   │   ├── products.js           # Product schema with reviews
│   │   └── users.js              # User schema with roles
│   ├── routes/                   # Express route definitions
│   │   ├── auth.js
│   │   ├── braintree.js
│   │   ├── categories.js
│   │   ├── customize.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── public/
│   │   └── uploads/              # Uploaded & seeded images (auto-created)
│   │       ├── products/         # Product images (50 images)
│   │       ├── categories/       # Category images (4 images)
│   │       └── customize/        # Slider images
│   ├── app.js                    # Express app entry point
│   ├── seed.js                   # Database seed script
│   ├── copyImages.js             # Copy dataset images into project
│   ├── generateImages.js         # Download images from Unsplash (fallback)
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CD pipeline
├── Dockerfile                    # Docker build config
├── docker-compose.yml            # App + MongoDB services
├── Jenkinsfile                   # Jenkins pipeline config
├── .env                          # Frontend env (REACT_APP_API_URL)
├── .env.example                  # Environment variable template
├── .gitignore
└── package.json                  # Frontend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js 18+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) or use Docker
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) *(optional, for containerized setup)*

### 1. Clone the repository

```bash
git clone https://github.com/chan907/DevOps.git
cd DevOps
```

### 2. Set up environment variables

```bash
cp .env.example server/.env
```

Edit `server/.env` with your values (see [Environment Variables](#-environment-variables)).

### 3. Install dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 4. Set up product images

**Option A — Use the Kaggle dataset (recommended):**

1. Download the dataset from: https://www.kaggle.com/datasets/trolukovich/apparel-images-dataset
2. Extract it to your `Downloads` folder as `archive (5)`
3. Run the copy script:

```bash
cd server
node copyImages.js
```

**Option B — Download from Unsplash (fallback):**

```bash
cd server
node generateImages.js
```

### 5. Seed the database

```bash
cd server
npm run seed
```

---

## 🔐 Environment Variables

### Frontend — `.env` (root)

```env
REACT_APP_API_URL=http://localhost:8000
```

### Backend — `server/.env`

```env
PORT=8000
DATABASE=mongodb://localhost:27017/bffabric

JWT_SECRET=your_random_secret_key_here

BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key

REACT_APP_API_URL=http://localhost:8000
```

| Variable | Description | Required |
|---|---|---|
| `PORT` | Backend server port | Yes |
| `DATABASE` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for signing JWT tokens (use a long random string) | Yes |
| `BRAINTREE_MERCHANT_ID` | Braintree sandbox merchant ID | Yes (for payments) |
| `BRAINTREE_PUBLIC_KEY` | Braintree sandbox public key | Yes (for payments) |
| `BRAINTREE_PRIVATE_KEY` | Braintree sandbox private key | Yes (for payments) |
| `REACT_APP_API_URL` | Backend base URL used by React | Yes |

> Get free Braintree sandbox credentials at https://sandbox.braintreegateway.com

---

## ▶️ Running the App

### Option 1 — Manual (Development)

**Terminal 1 — Start Backend:**
```bash
cd server
npm run start:dev     # with auto-reload (nodemon)
# or
npm start             # without auto-reload
```

**Terminal 2 — Start Frontend:**
```bash
npm start
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |

### Option 2 — Docker (Production-like)

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| App | http://localhost:8000 |
| MongoDB | mongodb://localhost:27017 |

> Note: With Docker, only the backend runs in the container. Run the frontend separately with `npm start`.

---

## 🖼️ Dataset & Images

This project uses real product images from the **Apparel Images Dataset** available on Kaggle.

### Dataset Details

| Property | Value |
|---|---|
| Source | https://www.kaggle.com/datasets/trolukovich/apparel-images-dataset |
| Total Images | ~11,000 |
| Categories | 24 clothing folders |
| Format | JPG |

### Dataset Folder → Product Mapping

| Dataset Folder | Product Name | Category |
|---|---|---|
| `white_shirt` | White Cotton Shirt | Men |
| `blue_shirt` | Blue Cotton Shirt | Men |
| `black_shirt` | Black Cotton Shirt | Men |
| `green_shirt` | Green Cotton Shirt | Men |
| `black_pants` | Black Formal Pants | Men |
| `blue_pants` | Blue Denim Pants | Men |
| `brown_pants` | Brown Chino Pants | Men |
| `green_pants` | Green Cargo Pants | Men |
| `red_pants` | Red Slim Pants | Men |
| `white_pants` | White Linen Pants | Men |
| `black_shorts` | Black Sports Shorts | Men |
| `blue_shorts` | Blue Casual Shorts | Men |
| `brown_shorts` | Brown Shorts | Men |
| `green_shorts` | Green Shorts | Men |
| `white_shorts` | White Shorts | Men |
| `black_dress` | Black Evening Dress | Women |
| `blue_dress` | Blue Summer Dress | Women |
| `red_dress` | Red Party Dress | Women |
| `white_dress` | White Casual Dress | Women |
| `black_shoes` | Black Formal Shoes | Shoes |
| `blue_shoes` | Blue Sneakers | Shoes |
| `brown_shoes` | Brown Leather Shoes | Shoes |
| `green_shoes` | Green Casual Shoes | Shoes |
| `red_shoes` | Red Sports Shoes | Shoes |
| `white_shoes` | White Sneakers | Shoes |

### How to Re-populate Images

```bash
cd server
node copyImages.js
```

This copies 2 images per product (50 total) + 4 category images into `server/public/uploads/`.

---

## 🌱 Seed Data

The seed script populates MongoDB with all categories and products:

```bash
cd server
npm run seed
```

### What gets seeded

| Type | Count | Details |
|---|---|---|
| Categories | 4 | Men, Women, Kids, Shoes |
| Products | 25 | 15 Men + 4 Women + 6 Shoes |

> Note: The seed script does **not** delete or modify existing user accounts. Only categories and products are reset.

### Re-seeding

You can safely re-run `npm run seed` at any time. It clears only categories and products, then re-inserts fresh data.

---

## 🐳 Docker Setup

### Start full stack with Docker Compose

```bash
docker-compose up --build
```

### Stop containers

```bash
docker-compose down
```

### Start only MongoDB via Docker

```bash
docker run -d --name mongodb -p 27017:27017 mongo:6
```

### Docker Compose Services

| Service | Image | Port |
|---|---|---|
| app | Built from Dockerfile | 8002 |
| mongo | mongo:6 | internal only |
| jenkins | Custom (Dockerfile.jenkins) | 8081 |

### Persistent Data

MongoDB data is stored in a named Docker volume `mongo-data` so data persists across container restarts.

---

## ⚙️ CI/CD Pipeline

### GitHub Actions (`.github/workflows/ci.yml`)

Triggers on every **push** and **pull request** to `main`:

| Job | Steps |
|---|---|
| Frontend Build | Checkout → Install → Build → Upload artifact |
| Backend Validate | Checkout → Install → Validate |
| Docker Build | Build image (on `main` branch push only) |

### Jenkins (`Jenkinsfile`)

Jenkins runs inside Docker (Linux container) with Node.js, Docker CLI and docker-compose pre-installed via `Dockerfile.jenkins`.

**Jenkins URL:** http://localhost:8081

| Stage | Description |
|---|---|
| Install Frontend | `npm install` in root |
| Install Backend | `npm install` in `server/` |
| Build Frontend | `npm run build` |
| Test Frontend | `npm test` |
| Docker Build | `docker build -t devops-app .` |
| Deploy | `docker-compose up -d app mongo` |

**To start Jenkins:**
```bash
docker-compose up -d jenkins
```

**Get initial admin password:**
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## 📡 API Endpoints

Base URL: `http://localhost:8000/api`

### Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/signup` | Register new user | No |
| POST | `/signin` | Login, returns JWT | No |

### Products

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/product/all-product` | Get all products | No |
| POST | `/product/single-product` | Get single product by ID | No |
| POST | `/product/add-product` | Add new product | Admin |
| POST | `/product/edit-product` | Edit product | Admin |
| POST | `/product/delete-product` | Delete product | Admin |
| POST | `/product/product-by-category` | Filter products by category | No |
| POST | `/product/product-by-price` | Filter products by price range | No |
| POST | `/product/cart-product` | Get products by IDs (cart) | No |
| POST | `/product/wish-product` | Get products by IDs (wishlist) | No |
| POST | `/product/add-review` | Add review to product | User |
| POST | `/product/delete-review` | Delete review | User |

### Categories

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/category/all-category` | Get all categories | No |
| POST | `/category/add-category` | Add category with image | Admin |
| POST | `/category/edit-category` | Edit category | Admin |
| POST | `/category/delete-category` | Delete category | Admin |

### Orders

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/order/get-all-orders` | Get all orders | Admin |
| POST | `/order/order-by-user` | Get orders by user ID | User |
| POST | `/order/create-order` | Create new order | User |
| POST | `/order/update-order` | Update order status | Admin |
| POST | `/order/delete-order` | Delete order | Admin |

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/user/signle-user` | Get user profile by ID | User |
| POST | `/user/edit-user` | Update user profile | User |
| POST | `/user/change-password` | Change password | User |

### Payments

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/braintree/get-token` | Get Braintree client token | User |
| POST | `/braintree/payment` | Process payment | User |

### Customize

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/customize/get-customize` | Get slider images | No |
| POST | `/customize/add-customize` | Add slider image | Admin |
| POST | `/customize/delete-customize` | Delete slider image | Admin |

---

## 📝 Version History

| Version | Date | Changes |
|---|---|---|
| v1.0 | — | Initial release — basic e-commerce with React + Node |
| v1.1 | — | SEO meta tags added |
| v1.2 | — | Title & favicon updated |
| v1.3 | — | Google Fonts integrated |
| v1.4 | — | Loading placeholder added |
| v1.5 | — | Structured data (JSON-LD) implemented |
| v2.0 | — | Full DevOps overhaul — Docker, CI/CD, bug fixes, ₹ currency, UX improvements, seed data, security fixes |
| v3.0 | 2026 | Real dataset images (Kaggle Apparel Dataset), 25 products across 4 categories, fixed product card alignment, uniform image grid, image copy automation script, detailed README |
| v4.0 | 2026 | Jenkins moved to Docker container, custom Dockerfile.jenkins with Node.js + Docker CLI + docker-compose, fixed project name in docker-compose, .dockerignore added, app running on port 8002 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m "feat: describe your change"`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request to `main`

---

## 📄 License

This project is for educational purposes.
