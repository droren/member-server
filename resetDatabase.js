const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Member = require('./models/Member');

mongoose.connect('mongodb://localhost:27017/memberDB', {});

const resetDatabase = async () => {
  try {
    await User.deleteMany({});
    await Member.deleteMany({});

    const defaultUsername = 'MongoDB';
    const defaultPassword = 'skogsrojet2012';

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const defaultUser = new User({ username: defaultUsername, password: hashedPassword });
    await defaultUser.save();

    console.log('Database reset and default user created');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error resetting database:', err);
    mongoose.disconnect();
  }
};

resetDatabase();
