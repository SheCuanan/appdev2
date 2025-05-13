const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); 


// In-memory collection of books
let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
  { id: 4, title: "Book 4", author: "Author 4" }
];


app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js and Express');
});

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const {id} = req.params;
  const book = books.find(b => b.id === parseInt(id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Post
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.json (newBook);
  res.status(201).json(newBook);
});

// Patch
app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookExists = books.some(b => b.id === id);

  if (!bookExists) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books = books.filter(book => book.id !== id);
  res.json({ message: 'Book deleted successfully' });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
