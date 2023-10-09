// src/middleware/fileUpload.ts
import multer from 'multer';
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, './uploads/'); // Specify the directory where files will be saved
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });