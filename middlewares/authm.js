const jwt = require('jsonwebtoken');
const secretKey ="emergencyKit"; 

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '') || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // jwt.verify(token, secretKey, (err, decoded) => {
  //   if (err) {
  //     console.error('Token verification error:',err)
  //     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  //   }

  //   req.user = decoded;
  //   next(); 
  // });
  try{
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { authenticateUser };
