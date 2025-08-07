require("dotenv").config();
const express = require("express");
const PORT = 4242;
const app = express();
const routes = require("./routers");
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
