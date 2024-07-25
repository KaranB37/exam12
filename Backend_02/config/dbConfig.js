require("dotenv").config();
const mysql = require("mysql");

//Database Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307,
});

connection.connect((err) => {
  if (err) {
    console.error("Error Connecting to the database :", err);
    return;
  }
  console.log("Successfully connected to MySql");
});

module.exports = {
  connection,
};
