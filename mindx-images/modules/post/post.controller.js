const PostModel = require('./post');
const UserModel = require('../auth/user');

const jwt = require('jsonwebtoken');

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.send({ success: 1, data: posts });
  } catch (err) {
    res.status(400).send({ success: 0, data: [] });
  }
}

const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Not found token');
    }

    const jwtToken = token.split(' ')[1];

    // check token có thuộc token của dự án mình ko
    // check token có hết hạn hay ko
    // trả về payload
    const data = jwt.verify(jwtToken, process.env.SECRET_KEY);

    const { userId } = data;
    if (!userId) {
      throw new Error('Authorization fail');
    }

    const existedUser = await UserModel.findById(userId);

    if (!existedUser) {
      throw new Error('Authorization fail');
    }

    // if (existedUser.role !== 'admin') {
    //   throw new Error('Authorization fail');
    // }
    
    const { title, description, imageUrl } = req.body;

    const newPost = await PostModel.create({
      title,
      description,
      imageUrl,
      createdBy: existedUser._id,
    });

    res.send({ success: 1, data: newPost });
  } catch (err) {
    res.status(400).send({ success: 0, data: null });
  }
}

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const dataUpdatePost = req.body;

    const updatedPost = await PostModel
      .findByIdAndUpdate(postId, dataUpdatePost, { new: true });

    res.send({ success: 1, data: updatedPost });
  } catch (err) {
    res.status(400).send({ success: 0, data: null });
  }
}

module.exports = {
  getPosts,
  createPost,
  updatePost
}