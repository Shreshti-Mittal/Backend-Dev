const jwt = require("jsonwebtoken");

const MFA = (req, res, next) => {
  const token = req.headers["authorization"];
  const otp = req.headers["otp"];

  if (!token) return res.status(401).json({ message: "Token missing" });
  if (!otp) return res.status(401).json({ message: "OTP missing" });

  try {
    const decoded = jwt.verify(token, "secretKey");

    // example OTP check (normally from DB)
    if (otp !== "123456") {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = MFA;