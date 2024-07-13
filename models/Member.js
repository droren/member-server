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

memberSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastMember = await mongoose.model('Member').findOne({}, {}, { sort: { 'memberNumber': -1 } });
    const lastMemberNumber = lastMember ? parseInt(lastMember.memberNumber, 10) : 0;
    this.memberNumber = (lastMemberNumber + 1).toString().padStart(5, '0');
  }
  next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
