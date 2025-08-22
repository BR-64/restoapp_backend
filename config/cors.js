const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173', // vite default dev server
];

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

module.exports = corsOptions;
