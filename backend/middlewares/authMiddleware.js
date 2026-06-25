const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await pool.query(
      `
      SELECT 
        u.*,
        r.name AS role_name
      FROM users u
      JOIN roles r
      ON u.role_id = r.id
      WHERE u.id = ?
      `,
      [decoded.id],
    );

    if (!users.length) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = users[0];

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
