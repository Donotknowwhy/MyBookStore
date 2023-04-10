const { User } = require("../model/model")

const adminMiddleware = async (req, res, next) => {
    const user = req.user;
    try {
      const foundUser = await User.findOne({ email: user.email });
      if (foundUser && foundUser.role === 'admin') {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
module.exports = adminMiddleware;