const express = require("express");

const app = express();
const port = 3000;
const visaRoutes = require("./src/visa/routes");

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Received a get request on the path /");
  res.send("Hello World!");
});

app.use("/api/v1/visa", visaRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
