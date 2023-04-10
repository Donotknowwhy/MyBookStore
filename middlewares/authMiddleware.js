const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Lấy token từ header của request
  const token = req.headers['authorization'];

  if (!token) {
    // Nếu không tồn tại token, trả về lỗi 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Xác thực token và lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Nếu xác thực thất bại, trả về lỗi 401 Unauthorized
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;