const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../repositories/userRepo');

const registerUserService = async ({ email, password, name }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ email, password: hashedPassword, name });
  return newUser;
};

module.exports = { registerUserService };

