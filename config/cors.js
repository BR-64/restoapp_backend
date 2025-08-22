const allowedOrigins = [
  'http://localhost:5173', // vite dev
  process.env.CLIENT_URL,
];

const corsOptions = {
  // origin: process.env.CLIENT_URL,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

module.exports = corsOptions;
