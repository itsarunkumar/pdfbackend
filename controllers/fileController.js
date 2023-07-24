const { Client, Storage, ID, InputFile } = require("node-appwrite");
const fs = require("fs");

const appwriteEndpoint = "https://cloud.appwrite.io/v1"; // Replace with your Appwrite API endpoint
const appwriteProjectId = "64b76125ede8ab6b92ff"; // Replace with your Appwrite project ID
const appwriteStorageBucketId = "64b76e54df9db91f5cf6"; // Replace with your Appwrite storage bucket ID
let appwriteAPIKey =
  "cdb04bd8be82e03fde7df649466e5e269dd3b162e0b11fa043275cd8489424c75a5c1d3eecec8c4a7cc9dea2f055a1af14af52bcd5b4fdd7be2de9d1d2f9b6bd0f9240866b42fbb377ee89a544d297e0f369adaf21ac3d67763f1831629c1956cc415d32a3a099c632c92c801c94e256c6113ec462f19e816c0356c886da0dd7"; // Replace with your Appwrite API key

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64b76125ede8ab6b92ff")
  .setKey(appwriteAPIKey);

const storage = new Storage(client);

exports.fileUpload = async (req, res) => {
  try {
    // Check if the file exists in the request
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const fileData = req.file;
    const fileName = fileData.originalname;
    const filePath = fileData.path;

    // Manually create a Blob object from the file buffer
    fs.readFileSync(filePath);

    // console.log(fileName, filePath, fileBlob);

    const response = await storage.createFile(
      appwriteStorageBucketId,
      ID.unique(),
      InputFile.fromPath(filePath, fileName)
    );

    fs.unlinkSync(filePath);

    res.json({ success: true, response });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};

exports.listAllFiles = async (req, res) => {
  const result = await storage.listFiles(appwriteStorageBucketId);

  const links = result.files.map((file) => {
    return `${appwriteEndpoint}/storage/buckets/${appwriteStorageBucketId}/files/${file.$id}/view?project=${appwriteProjectId}`;
  });

  const files = result.files.map((file) => {
    return {
      id: file.$id,
      name: file.name,
      size: file.sizeOriginal,
      url: `${appwriteEndpoint}/storage/buckets/${appwriteStorageBucketId}/files/${file.$id}/view?project=${appwriteProjectId}`,
      type: file.mimeType,
    };
  });

  res.status(200).json({
    length: files.length,
    files,
  });
};

exports.getSingleFile = async (req, res) => {
  const { id } = req.params;

  const result = await storage.getFile(appwriteStorageBucketId, id);

  const file = {
    id: result.$id,
    name: result.name,
    size: result.sizeOriginal,
    url: `${appwriteEndpoint}/storage/buckets/${appwriteStorageBucketId}/files/${result.$id}/view?project=${appwriteProjectId}`,
    type: result.mimeType,
  };

  res.status(200).json(file);
};
