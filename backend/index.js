require('dotenv').config()
const express = require("express");

const connectToMongo = require("./db");
connectToMongo();
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.REACT_APP_PORT

app.use(express.json());
//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));



app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
