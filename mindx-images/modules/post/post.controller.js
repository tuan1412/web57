const PostModel = require('./post');

const getPosts = async (req, res, next) => {
  console.log('req.user=', req.user);

  throw new Error('fake error');
  
  const posts = await PostModel.find({});
  res.send({ success: 1, data: posts });
}

const createPost = async (req, res, next) => {
  const senderUser = req.user;

  const { title, description, imageUrl } = req.body;

  const newPost = await PostModel.create({
    title,
    description,
    imageUrl,
    createdBy: senderUser._id,
  });

  res.send({ success: 1, data: newPost });
}

const updatePost = async (req, res) => {
  
  const senderUser = req.user;

  // find của model mongoose thì tự động convert string => ObjectId ở những trường có type là ObjectId
  // aggregate => mongoose thì ko convert
  const foundPost = await PostModel.findOne({ _id: postId });

  if (!foundPost) {
    throw new Error('Not found post');
  }

  if (foundPost.createdBy !== senderUser._id) {
    throw new Error('Can not update other post');
  }

  const { postId } = req.params;
  const dataUpdatePost = req.body;

  // const updatedPost = await PostModel
  //   .findOne({ postId, createdBy: userId }, dataUpdatePost, { new: true });
  const updatedPost = await PostModel
    .findByIdAndUpdate(postId, dataUpdatePost, { new: true });

  res.send({ success: 1, data: updatedPost });
  
}

module.exports = {
  getPosts,
  createPost,
  updatePost
}