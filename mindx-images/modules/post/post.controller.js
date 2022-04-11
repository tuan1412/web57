const PostModel = require('./post');
const mongoose = require('mongoose');

const getHotPosts = async (req, res) => {
  // DO that
  const posts = await 
    PostModel.find({ likeCount: { $gt: 100 }}).sort({ likeCount: -1 });

  // NOT DO That
  // const posts = await PostModel.find({});
  // const hotPosts = posts.filter(p => p.likeCount > 100);

  res.send({ success: 1, data: posts });
}

// req.query
const getPosts = async (req, res, next) => {
  console.log('req.user=', req.user);

  const { createdBy, keyword, tag, offset, limit, sort } = req.query;

  const offsetNumber = offset && Number(offset) ? Number(offset) : 0;
  const limitNumber = limit && Number(limit) ? Number(limit) : 4;

  let filter = {};
  let sortCond = {};

  if (sort) {
    const [sortField, sortDirection] = sort.split('_');
    if (sortField && sortDirection) {
      sortCond[sortField] = sortDirection === 'desc' ? -1 : 1;
    }
  }

  if (createdBy) {
    filter.createdBy = createdBy
  }

  if (keyword) {
    const regex = new RegExp(`${keyword}`, 'i');
    const regexCond = { $regex: regex };
    console.log(regexCond);

    // filter.title = { $regex: regex }
    filter['$or'] = [
      { title: regexCond },
      { description: regexCond }
    ]
  }

  if (tag) {
    filter.tags = tag
  }

  console.log(filter);
  
  const posts = await 
    PostModel
      .find(filter)
      .skip(offsetNumber)
      .limit(limitNumber)
      .sort(sortCond);

  const totalPost = await PostModel.countDocuments(filter);

  res.send({ 
    success: 1, 
    data: {
      data: posts,
      total: totalPost
    }
  });
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

  const notAuthor = foundPost.createdBy !== senderUser._id;
  if (notAuthor) {
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

const likePost = async (req, res) => {
  const { postId } = req.params;
 
  const updatedPost = await PostModel
    .findByIdAndUpdate(
      postId, 
      { $inc: { likeCount: 1 } }, 
      { new: true }
    );

  res.send({ success: 1, data: updatedPost });

}

const addTag = async (req, res) => {
  const { postId } = req.params;
  const { tag:newTag } = req.body;
 
  const updatedPost = await PostModel
    .findByIdAndUpdate(
      postId, 
      { $push: { tags: newTag } }, 
      { new: true }
    );

  res.send({ success: 1, data: updatedPost });

}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  likePost,
  addTag,
  getHotPosts
}