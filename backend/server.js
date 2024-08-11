//Importing Modules
const connectToMongo = require("./middlewares/middleware");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

//Connecting to MongoDB
connectToMongo();

//Defining Limits of body parser
app.use(bodyParser.json({ limit: "5000mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 500000000,
  })
);
app.use(bodyParser.text({ limit: "5000mb" }));

//Cors and files directory
app.use(cors());
app.use(express.json());
// app.use('/public/', express.static(__dirname + 'public'))
app.use("/", express.static(path.join(__dirname, "/public/")));
// http://localhost:8000/static/products/Full-t.png

//Routes
app.use("/routes/files", require("./routes/filesroute"));
app.use("/routes/users", require("./routes/usersroute"));

//Port Listening
app.listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}`);
});
