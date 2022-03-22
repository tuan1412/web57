const fs = require('fs');

const createPost = async ({ content, createdBy }) => {
  const oldPostsStr = await
    fs.promises.readFile('posts.json', { encoding: 'utf-8'});

  const oldPosts = JSON.parse(oldPostsStr);

  const newPost = {
    id: Date.now(),
    content,
    createdBy,
  };

  const newPosts = [...oldPosts, newPost];

  await fs.promises.writeFile(
    'posts.json', 
    JSON.stringify(newPosts),
  )

  return newPost;
}

const getPosts = async () => {
  const oldPostsStr = await
  fs.promises.readFile('posts.json', { encoding: 'utf-8'});

  const oldPosts = JSON.parse(oldPostsStr);

  return oldPosts;
}

const getPost = async (postId) => {
  const oldPostsStr = await
  fs.promises.readFile('posts.json', { encoding: 'utf-8'});

  const oldPosts = JSON.parse(oldPostsStr);

  const foundPost = oldPosts.find(post => String(post.id) === postId);

  return foundPost;
}

const updatePost = async (updatePostData) => {
  const { content, postId } = updatePostData;
  
  const oldPostsStr = await
    fs.promises.readFile('posts.json', { encoding: 'utf-8'});

  const oldPosts = JSON.parse(oldPostsStr);

  const newPosts = oldPosts.map(post => {
    if (String(post.id) === postId) {
      return {
        ...post,
        content
      }
    }
    return post;
  });

  await fs.promises.writeFile(
    'posts.json', 
    JSON.stringify(newPosts),
  )

  return postId;
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost
}