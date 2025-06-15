const express = require("express");
const {
  fetchAllBooks,
  fetchBookById,
  addBook,
  modifyBook,
  removeBook,
} = require("../controllers/bookController");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();
router.use(authenticateToken);

router.get("/", fetchAllBooks);
router.get("/:id", fetchBookById);
router.post("/", addBook);
router.patch("/:id", modifyBook);
router.delete("/:id", removeBook);

module.exports = router;
