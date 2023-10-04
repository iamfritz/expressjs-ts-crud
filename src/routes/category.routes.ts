import express from 'express';
const router = express.Router();

const { authenticator } = require("../middleware/authJWT");

const {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

/* group method */
router
  .route("/")
  .get(getAllCategory)
  .post(authenticator, createCategory);

router
  .route("/:id")
  .get(getCategory)
  .delete(authenticator, deleteCategory)
  .put(authenticator, updateCategory);

export default router;
