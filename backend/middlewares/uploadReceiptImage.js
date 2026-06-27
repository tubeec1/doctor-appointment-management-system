const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/* -------------------------------------------------------------------------- */
/* Upload Directory                                                           */
/* -------------------------------------------------------------------------- */

const uploadDir = "uploads/receipts";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* -------------------------------------------------------------------------- */
/* Storage                                                                    */
/* -------------------------------------------------------------------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, `${uuidv4()}${extension}`);
  },
});

/* -------------------------------------------------------------------------- */
/* File Filter                                                                */
/* -------------------------------------------------------------------------- */

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;

  const mimeType = allowedTypes.test(file.mimetype);

  const extension = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (mimeType && extension) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG and PNG images are allowed."));
};

/* -------------------------------------------------------------------------- */
/* Upload Middleware                                                          */
/* -------------------------------------------------------------------------- */

const uploadReceiptImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("receiptImage");

module.exports = uploadReceiptImage;
