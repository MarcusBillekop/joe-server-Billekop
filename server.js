const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use("/static", express.static("public"));
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

// ----------------------------------------------------------------------------------------------------
// OPGAVE 1: Lav et endpoint /location for at sende locations.html filen
app.get("/locations", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "locations.html"));
});

// ----------------------------------------------------------------------------------------------------
// Adgangskodebeskyttelse for /astrid ruten med Basic Authentication




app.use('/astrid', (req, res, next) => {
  const auth = { login: 'user', password: 'dinhemmeligeadgangskode' }; // Erstat med login og adgangskode

  // Basic Auth check
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login && password && login === auth.login && password === auth.password) {
    return next(); // Adgang givet, fortsæt til ruten
  }

  res.set('WWW-Authenticate', 'Basic realm="401"'); // Prompt til login
  res.status(401).send('Adgang nægtet'); // Adgang nægtet
});


app.get("/astrid", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "astrid.html")); // Sørg for, at astrid.html ligger i public-mappen
});
// ----------------------------------------------------------------------------------------------------

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
