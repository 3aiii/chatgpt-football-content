const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const rootRouter = require("./routes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const prisma = new PrismaClient();

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

const connectDataBase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.log("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

const main = () => {
  startServer();
  connectDataBase();
};

app.use("/api", rootRouter);
app.use("/image", express.static(path.join(__dirname, "uploads")));

main();
