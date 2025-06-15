const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.routes");
const authRoutes = require('./routes/auth.routes');
const authenticateToken = require('./middleware/auth.middleware');


require("dotenv").config();
// console.log('DEBUG ENV:', process.env.SMTP_HOST);
 const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/api/books", bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', authenticateToken, bookRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Simple Book API using Node.js, Express, and MongoDB");
});

// Database connection
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server ONLY after DB connection is ready
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
