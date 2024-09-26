const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());

// Serverer alt i "public" mappen som statiske filer
app.use(express.static("public"));

app.use((req, res, next) => {
    console.log("----- HTTP Request -----");
    console.log(`Method: ${req.method}`); // HTTP Method
    console.log(`URL: ${req.originalUrl}`); // Requested URL
    console.log("Headers:", req.headers); // Request Headers
    console.log(`IP: ${req.ip}`); // IP Address
    console.log("------------------------");
    next();
});
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint til locations.html filen
app.get("/locations", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "locations.html"));
});

// Endpoint for at servere HTML-filen til Astrid (uden adgangskodebeskyttelse)
app.get("/astrid", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "astrid.html")); // Sørg for, at astrid.html ligger i public-mappen
});

app.get("/res", (req, res) => {
  res.send("Response message from server");
});

app.get("/cookie", (req, res) => {
  res.cookie("taste", "chocolate");
  res.send("Cookie set");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
