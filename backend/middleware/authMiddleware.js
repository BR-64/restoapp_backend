// middleware/auth.js
const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(403).json({ message: 'Access denied, token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded; // Store decoded user data (e.g., userId, isAdmin)
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = verifyToken;

const verifyToken = (req, res, next) => {
  // const token = req.header('Authorization')?.split(' ')[1];

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // userId will be available as req.user.userId
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = { verifyToken };
