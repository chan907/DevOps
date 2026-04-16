// Centralized config for secret keys loaded from environment variables
// JWT_SECRET is used to sign and verify JWT tokens in middleware/auth.js
// Set this value in .env (local) or docker-compose.yml environment section

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
};
