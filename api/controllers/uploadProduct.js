


const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

// AWS S3 Configuration
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA4MTWJGWQAK5SLAX6",
    secretAccessKey: "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",
  },
});

// Configure multer to use S3 as the storage destination
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "mywebstores",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, `${file.fieldname}/${fileName}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/mpeg",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and videos are allowed."));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Controller Function for File Upload
const uploadFile = (req, res) => {
  upload.single("file")(req, res, (err) => {

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }


    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Correctly Constructed File URL
    const fileUrl = `https://mywebstores.s3.ap-south-1.amazonaws.com/${req.file.key}`;

    res.status(200).json({ message: "File uploaded successfully.", fileUrl });
  });
};

module.exports = {
  uploadFile,
};
