const books = require("../data/books");

exports.addBook = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author required" });
  }

  const book = {
    id: Date.now(),
    title,
    author,
    userId: req.user.id
  };

  books.push(book);

  res.status(201).json({ message: "Book added", book });
};

exports.getBooks = (req, res) => {
  const { title, author } = req.query;

  let userBooks = books.filter(
    b => b.userId === req.user.id
  );

  if (title) {
    userBooks = userBooks.filter(b =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  
  if (author) {
    userBooks = userBooks.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  res.json(userBooks);
};

exports.deleteBook = async (req, res, next) => {
  try {
    const index = books.findIndex(
      b => b.id == req.params.id && b.userId === req.user.id
    );

    if (index === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);
    res.json({ message: "Book deleted" });

  } catch (err) {
    next(err);
  }
};
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const book = books.find(
    b => b.id == id && b.userId === req.user.id
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.json({
    message: "Book updated",
    book
  });
};