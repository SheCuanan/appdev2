require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const User = require('../models/User');
const Book = require('../models/book.model');

const MONGO_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connection successful');

    await User.deleteMany();
    await Book.deleteMany();
    console.log('Old users and books removed');

    // Create fake users
    const userList = [];

    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      await user.save();
      userList.push(user);
    }

    console.log('Users generated');

    // Create books and assign to random users
    for (let i = 0; i < 10; i++) {
      const selectedUser = faker.helpers.arrayElement(userList); 
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.name.fullName(),
        year: faker.number.int({ min: 1990, max: 2024 }),
        userId: selectedUser._id,
      });
      await book.save();
    }

    console.log('Book entries added');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
