const cfg = require("dotenv");
const express = require("express");
const app = express();
app.use(express.json());
cfg.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
