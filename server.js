const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/memberDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const Member = require('./models/Member');
const User = require('./models/User');

const secret = 'your_jwt_secret'; // Use a more secure secret in production

const generateMemberNumber = async () => {
  const lastMember = await Member.findOne().sort({ memberNumber: -1 }).exec();
  const nextMemberNumber = lastMember ? lastMember.memberNumber + 1 : 1;
  return nextMemberNumber;
};

// Register User (for testing, not used in production)
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

// Login User
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
  const memberNumber = await generateMemberNumber();
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

// Get single member by ID
app.get('/members/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findById(id);
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/members/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Member.findByIdAndDelete(id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
