const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  likeCount: {
    type: Number,
  },
  tags: [String],
  imageUrl: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
}, {
  // tự động thêm createdAt, updatedAt
  timestamps: true
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
