const { connection } = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const generateSecretKey = require("../utils/generateSecretKey");

const secretKey = process.env.DB_SECRET_KEY || generateSecretKey();
console.log("SecretKey :", secretKey);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received Token:", token);

  if (!token) {
    console.log("Unauthorized: Token not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log("Forbidden: Invalid token");
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      } else {
        req.user = decoded;
        console.log("Decoded User :", decoded);
        connection.query(
          "SELECT * from users where email = ?",
          [req.user.email],
          (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ message: "Error fetching user data" });
            } else {
              req.uid = result[0].uid;
              req.email = result[0].email;
              console.log("UID :", req.uid);
              console.log("Email :", req.email);
              next();
            }
          }
        );
      }
    });
  }
}

module.exports = authenticateToken;
