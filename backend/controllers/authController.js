const jwt = require('jsonwebtoken'); 
const { findUserById } = require('../repositories/userRepo');
const { registerUserService, loginUserService } = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await registerUserService({ email, password, name });
    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please fill all fields' });

    const { token, user } = await loginUserService({ email, password });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };
