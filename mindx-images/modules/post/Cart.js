const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
  sellProducts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
}, {
  // tự động thêm createdAt, updatedAt
  timestamps: true
});

const Product = new mongoose.Schema({
  title: String,
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
}, {
  // tự động thêm createdAt, updatedAt
  timestamps: true
});


const CartModel = mongoose.model('Cart', Cart);

CartModel.findOne({ createdBy: ''})
  .populate({
    path: 'sellProducts',
    populate: {
      path: 'category',
      select: 'title'
    }
  })
  .populate({
    path: 'createdBy',
    select: 'username'
  })
module.exports = CartModel;

/*
  {
    createdBy: {
      _id: '',
      username: '',
    },
    products: [
      {
        _id,
        title: '',
        category: {
          _id
          title: '',
        }
      }
    ]

  }
*/

