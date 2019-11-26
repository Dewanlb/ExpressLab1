const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", cartRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
