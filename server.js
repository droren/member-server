const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Member = require('./models/Member');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/memberDB', {});

const secret = 'your_jwt_secret'; // Use a more secure secret in production

const createDefaultUser = async () => {
  const defaultUsername = 'göranadmin';
  const defaultPassword = 'skogsrojet2012';

  const user = await User.findOne({ username: defaultUsername });
  if (!user) {
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const newUser = new User({ username: defaultUsername, password: hashedPassword });
    await newUser.save();
    console.log('Default user created');
  } else {
    console.log('Default user already exists');
  }
};

createDefaultUser().catch(err => console.error('Error creating default user:', err));

// User Registration and Login
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Member Routes
app.post('/members', authenticateToken, async (req, res) => {
  const { name, birthday, contactInfo, phoneNumber, group, feePaid } = req.body;
  const memberNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const newMember = new Member({ name, birthday, contactInfo, phoneNumber, memberNumber, group, feePaid });
  try {
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/members', authenticateToken, async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.put('/members/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedMember = await Member.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
