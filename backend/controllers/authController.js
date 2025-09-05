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

module.exports = { registerUser, loginUser };
