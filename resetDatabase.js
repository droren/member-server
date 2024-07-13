require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Member = require('./models/Member');

const saltRounds = 10;

const mongoDBServerIP = process.env.MONGODB_SERVER_IP || 'localhost';
const mongoDBDatabase = process.env.MONGODB_DATABASE || 'yourDatabase';

mongoose.connect(`mongodb://${mongoDBServerIP}:27017/${mongoDBDatabase}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Member.deleteMany({});

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash('skogsrojet2012', saltRounds);

    // Add default admin user
    const adminUser = new User({
      username: 'goranadmin',
      password: 'skogsrojet2012'
    });
    await adminUser.save();

    console.log('Database reset and default user created');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error resetting database:', err);
    mongoose.connection.close();
  }
});
