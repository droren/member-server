const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  streetAddress: { type: String, required: true },
  postalNumber: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  memberNumber: { type: Number, unique: true },
  group: { type: String },
  feePaid: { type: Boolean, default: false },
  paymentDate: { type: Date },
  removed: { type: Boolean, default: false },
  removalReason: { type: String, default: '' }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
