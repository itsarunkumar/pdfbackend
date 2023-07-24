const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
//require prisma client
const prisma = require("./prisma/client");
const { Client, Storage, ID, InputFile } = require("node-appwrite");

const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

let appwriteAPIKey =
  "cdb04bd8be82e03fde7df649466e5e269dd3b162e0b11fa043275cd8489424c75a5c1d3eecec8c4a7cc9dea2f055a1af14af52bcd5b4fdd7be2de9d1d2f9b6bd0f9240866b42fbb377ee89a544d297e0f369adaf21ac3d67763f1831629c1956cc415d32a3a099c632c92c801c94e256c6113ec462f19e816c0356c886da0dd7"; // Replace with your Appwrite API key

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64b76125ede8ab6b92ff")
  .setKey(appwriteAPIKey);

//routes
const userRoute = require("./routes/userRoute");
const fileRoute = require("./routes/fileRoute");
const { authenticateToken } = require("./utils/jwtAuth");

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//api routes
app.use("/api", userRoute);
app.use("/api", authenticateToken, fileRoute);

const appwriteEndpoint = "https://cloud.appwrite.io/v1"; // Replace with your Appwrite API endpoint
const appwriteProjectId = "64b76125ede8ab6b92ff"; // Replace with your Appwrite project ID

const appwriteStorageBucketId = "64b76e54df9db91f5cf6"; // Replace with your Appwrite storage bucket ID

const upload = multer({ dest: "uploads/" });

module.exports = app;
