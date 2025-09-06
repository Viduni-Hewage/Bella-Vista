const { findUserById } = require('../repositories/userRepo');
const { registerUserService } = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await registerUserService({ email, password, name });
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: user._id, email: user.email, name: user.name } 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get current user (Auth0-ready)
const getCurrentUser = async (req, res) => {
  try {
    // req.auth is populated by checkJwt middleware
    const auth0UserId = req.auth.sub;

    const user = await findUserById(auth0UserId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

module.exports = { registerUser, getCurrentUser };
