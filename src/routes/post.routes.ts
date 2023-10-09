import express from 'express';
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { authenticator } = require("../middleware/authJWT");
const { upload } = require("../middleware/fileUpload");

const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

/* group method */
router
  .route("/")
  .get(getAllPost)  
  .post(authenticator, upload.single('image'), createPost);

router
  .route("/:id")
  .get(getPost)
  .delete(authenticator, deletePost)
  .put(authenticator, upload.single('image'), updatePost);

export default router;

//sample only
//const logStuff = [lib.logOriginalUrl, lib.logMethod];

/* router.use( (req, res, next) => {
  console.log("User Routes - Time:", Date.now());
  next();
}); */

//Post Method
//router.post("/", createPost);

//Get all Method
//router.get("/", getAllPost);

//Get by ID Method
//router.get("/:id", getPost);

//Update by ID Method
//router.patch("/:id", updatePost);

//Delete by ID Method
//router.delete("/:id", deletePost);
