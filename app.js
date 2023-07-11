const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mysql = require("mysql2");
const port = 3000;

app.use(express.static("assets"));
app.use(express.static("views"));
app.set("view engine", "ejs");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "aq_db",
});


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/create", (req, res) => {
  const item = req.query.item;
  res.render("form", { item: item, errors: [] });
});



app.post("/submit", (req, res) => {
  const { name, namekana, gender, email, address, tel, reason, inquiry } = req.body;


  const sql =
    "INSERT INTO userlist (name, namekana, gender, email, address, tel, reason, inquiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [name, namekana, gender, email, address, tel, reason, inquiry];

  con.query(sql, values, function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    res.redirect("/edit");
  });
});

app.get("/edit", (req, res) => {
  res.render("edit");
});


app.get("/", (req, res) => {
  res.redirect("/create");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
