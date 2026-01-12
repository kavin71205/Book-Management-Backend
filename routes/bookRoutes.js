const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks,
  deleteBook,
  updateBook
} = require("../controllers/bookController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, addBook);
router.get("/", auth, getBooks);
router.delete("/:id", auth, deleteBook);
router.put("/:id", auth, updateBook);

module.exports = router;
