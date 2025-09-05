const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../repositories/userRepo');

const registerUserService = async ({ email, password, name }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ email, password: hashedPassword, name });
  return newUser;
};

const loginUserService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  return { token, user: { id: user._id, email: user.email, name: user.name } };
};

module.exports = {
  registerUserService,
  loginUserService,
};
