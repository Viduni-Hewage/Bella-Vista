# Bella Vista - Fashion & Lifestyle E-Commerce

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)
![Auth0](https://img.shields.io/badge/Auth0-Authentication-yellow)

**Bella Vista** is a full-featured e-commerce web application specializing in **fashion accessories, jewelry, home decorations, and watches**. Users can browse curated products, manage their carts, and complete purchases seamlessly. The platform also includes an admin panel to efficiently manage order summaries and order statuses.

## Features

### User Features
- Browse a variety of products with detailed descriptions and images.
- Add items to the cart and manage quantities easily.
- Checkout securely with **Card Payment** or **Cash on Delivery**.
- View past orders and track order status.
- Manage personal profile integrated with **Auth0** authentication.
- Automatic update of user details during checkout for convenience.

### Admin Features
- View **order summaries** for all customers.
- Track payment and delivery status.
- Update order status dynamically.

### General Features
- Fully responsive design for desktop and mobile devices.
- Secure authentication and authorization using **Auth0**.
- Integration with **MongoDB** for storing users, products, orders, and payments.
- Optional usage tracking for admin insights.
## Technologies Used
- **Frontend:** React, React Router, Ant Design, CSS  
- **Authentication:** Auth0  
- **Backend & Database:** Node.js, Express.js, MongoDB  
- **APIs & Utilities:** Axios, JWT for token verification  

## Project Structure
```bash
bella-vista/
│
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── assets/           # Images, icons, styles, etc.
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Cart and other contexts
│   │   ├── hoc/              # Higher Order Components (e.g., Layout)
│   │   ├── pages/            # App pages like Profile, Checkout
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Entry point for React
│
├── backend/                  # Node.js backend
│   ├── routes/               # API routes
│   ├── controllers/          # Route handlers
│   ├── services/             # Business logic
│   ├── repositories/         # Database access
│   ├── pipelines/            # Data processing pipelines
│   ├── models/               # MongoDB schemas
│   ├── middlewares/          # Express middlewares
│   ├── config/               # Configuration files
│   └── server.js             # Server entry point
│
└── README.md
```
## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bella-vista.git
cd bella-vista
```
2. Install frontend dependencies:
```bash
cd frontend
npm install
```
3. Install backend dependencies:
```bash
cd ../backend
npm install
```
4. Create `.env` files for frontend and backend:

   - **Frontend `.env`:**
     ```bash
     VITE_AUTH0_DOMAIN=your-auth0-domain
     VITE_AUTH0_CLIENT_ID=your-auth0-client-id
     VITE_AUTH0_AUDIENCE=your-api-audience
     VITE_API_URL=your-api-url
     ```

   - **Backend `.env`:**
     ```bash
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     PORT=your-backend-port
     CORS_ORIGIN=your-frontend-url
     AUTH0_DOMAIN=your-auth0-domain
     AUTH0_AUDIENCE=your-api-audience
     ```

## Usage
1. Start the backend server:
```bash
cd backend
npm run dev
```
2. Start the frontend server:
```bash
cd frontend
npm run dev
```
3. Open your browser at http://localhost:5173  to access the application.

## Future Enhancements

- Add multiple payment gateways (Stripe, PayPal).

- Implement product reviews and ratings.

- Add personalized product recommendations.

- Enhance admin dashboard with additional management features.
