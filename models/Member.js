const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: { type: Date, required: true },
  contactInfo: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  memberNumber: { type: String, unique: true },
  group: { type: String },
  feePaid: { type: Boolean, default: false },
  removed: { type: Boolean, default: false },
  removalReason: { type: String, default: '' }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
