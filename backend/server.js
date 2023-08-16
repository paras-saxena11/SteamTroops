const express = require("express");
const { connectDb } = require("./config/db");
const experimentRoute = require("./routes/experimentRoute");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", experimentRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
