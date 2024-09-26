const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token is required!' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token após o "Bearer"

  if (!token) {
    return res.status(403).json({ message: 'Token is required!' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token!' });
    }

    req.user = decoded;
    next();
  });
};

const checkRole = (req, res, next) => {
  const user = req.user; 

  if (user && user.role === 'GERENCY') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Only GERENCY role can perform this action.' });
  }
};

module.exports =  {
  authMiddleware,
  checkRole,
}
