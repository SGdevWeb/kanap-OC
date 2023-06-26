const express = require("express");
const path = require("path");

const productRoutes = require("./routes/product");

const app = express();

const PORT = 3002;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/kanap/products", productRoutes);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
