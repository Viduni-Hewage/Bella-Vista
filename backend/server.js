const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});