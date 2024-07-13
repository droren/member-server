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
  useUnifiedTopology: true,
  useCreateIndex: true, // Suppresses ensureIndex deprecation warning
  useFindAndModify: false // Suppresses findOneAndUpdate and findOneAndDelete deprecation warning
});

mongoose.connection.on('connected', async () => {
  try {
    // Clear existing data
    await User.deleteMany({});

    // Add default admin user
    const adminUser = new User({
      username: 'admin',
      password: 'adminpassword123'
    });
    await adminUser.save();

    console.log('Database reset and default user created');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error resetting database:', err);
    mongoose.connection.close();
  }
});
