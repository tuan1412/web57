const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
  }
}, {
  timestamps: true
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;
