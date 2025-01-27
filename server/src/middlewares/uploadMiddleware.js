const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.params.blogId) {
      cb(null, "src/uploads");
    } else {
      cb(new Error("Invalid URL parameter. Upload path not found."), null);
    }
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images.jpeg|jpg|png only!"));
  }
};

const uploadImage = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
}).single("upload");

module.exports = uploadImage;
