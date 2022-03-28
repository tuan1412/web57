const PostModel = require('./post');

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
    const { title, description, imageUrl } = req.body;

    const newPost = await PostModel.create({
      title,
      description,
      imageUrl
      // createdBy,
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