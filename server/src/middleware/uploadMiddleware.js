import multer from "multer";

const storage = multer.memoryStorage();

function imageFileFilter(req, file, callback) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(
      new Error(
        "Only JPG, PNG, WebP, and GIF images are allowed."
      )
    );
  }

  callback(null, true);
}

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: imageFileFilter,
});