require("dotenv").config();
const asyncHand = require("express-async-handler");
const { connection } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateSecretKey = require("../utils/generateSecretKey");

const secretKey = process.env.DB_SECRET_KEY || generateSecretKey();

// Login Form
const login = asyncHand((req, res) => {
  console.log("Called ");
  const { email, password } = req.body;
  const searchQuery = "SELECT * from users where email = ?";
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.log(1);
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }

        const uid = user.uid;
        const email = user.email;

        const token = jwt.sign(
          {
            email: email,
          },
          secretKey,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Logged in successfully",
          token: token,
          email: email,
          uid: uid,
        });
      }
    });
  } catch (error) {
    console.log(2);

    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const handleUserExists = (res) => {
  return res.status(400).json({ error: "User already exists" });
};

const handleServerError = (res, errMessage) => {
  console.error(errMessage);
  return res.status(500).json({ error: "Internal Server Error" });
};

const handleSuccess = (res, message) => {
  console.log(message);
  return res.status(200).json({ message });
};

const signUp = asyncHand(async (req, res) => {
  const formData = req.body;

  console.log("Form Data:", formData);

  try {
    const searchQuery = "SELECT * FROM users WHERE email = ?";

    connection.query(searchQuery, [formData.email], async (err, result) => {
      if (err) {
        return handleServerError(res, "Error running the query: " + err);
      }

      if (result.length > 0) {
        return handleUserExists(res);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      const insertQuery = "INSERT INTO users (email, password) VALUES (?,?)";
      connection.query(
        insertQuery,
        [formData.email, hashedPassword],
        (err, result) => {
          if (err) {
            return handleServerError(res, "Error inserting data: " + err);
          } else {
            return handleSuccess(res, "User Registered Successfully");
          }
        }
      );
    });
  } catch (error) {
    return handleServerError(res, "Error inserting data: " + error);
  }
});

module.exports = {
  login,
  signUp,
};
