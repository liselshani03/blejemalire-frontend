# 🛍️ Blejemalire Frontend - Price Comparison Platform

Professional React + Vite frontend for the Blejemalire price comparison platform.

## 📊 Project Management

- **Jira Board:** [BlejeMaLire](https://blejemalire.atlassian.net/jira/core/projects/BLEJE/list?filter=allissues&jql=project%20%3D%20%22BLEJE%22%20ORDER%20BY%20created%20DESC)
- **Project Key:** BLEJE
- **Status:** Active Development - Lab Course 2

## 🎨 Features

- ✅ **User Authentication** - Sign up, login, logout
- ✅ **Product Listing** - Browse all products with images
- ✅ **Advanced Search** - Filter by category, price, discount
- ✅ **Shopping Cart** - Add/remove items, manage quantities
- ✅ **Admin Dashboard** - Product management (add, edit, delete)
- ✅ **Discount Tracking** - Display discount end dates
- ✅ **Professional UI** - Brown theme matching brand colors
- ✅ **Responsive Design** - Mobile-friendly interface

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## 🛠️ Setup

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
# Clone and navigate
git clone <repository-url>
cd blejemalire-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Update API_URL in .env
```

### Development

```bash
npm run dev
```

Runs on `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Product/
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   └── Navbar/
│       └── Navbar.jsx
├── pages/
│   ├── AdminDashboard.jsx
│   ├── HomePage.jsx
│   ├── CartPage.jsx
│   └── ProductDetail.jsx
├── services/
│   ├── api.js
│   └── auth.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🔗 Backend API

Connect to backend on `http://localhost:5000`

Key endpoints:
- `GET /api/products` - All products
- `GET /api/search` - Advanced search
- `POST /api/auth/login` - Login
- `POST /api/admin/products` - Create product (admin)

## 📄 License

ISC

