const router = require("express").Router();
const fileController = require("../controllers/fileController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/file/upload", upload.single("file"), fileController.fileUpload);
router.get("/file/listfiles", fileController.listAllFiles);

module.exports = router;
