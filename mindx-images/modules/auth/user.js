const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  // tự động thêm createdAt, updatedAt
  timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
