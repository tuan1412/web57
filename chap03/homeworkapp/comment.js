// content string, createBy string, postId string, likeCount number
// CRUD

const fs = require('fs');

const createComment = async ({ content, createdBy, postId }) => {
  const oldCommentsStr = await
    fs.promises.readFile('comments.json', { encoding: 'utf-8'});

  const oldComments = JSON.parse(oldCommentsStr);

  const newComment = {
    id: Date.now(),
    content,
    createdBy,
    postId
  };

  const newComments = [...oldComments, newComment];

  await fs.promises.writeFile(
    'comments.json', 
    JSON.stringify(newComments),
  )

  return newComment;
}

const getComments = async () => {
  const oldCommentsStr = await
  fs.promises.readFile('comments.json', { encoding: 'utf-8'});

  const oldComments = JSON.parse(oldCommentsStr);

  return oldComments;
}

const getCommentsByPost = async (postId) => {
  const oldCommentsStr = await
  fs.promises.readFile('comments.json', { encoding: 'utf-8'});

  const oldComments = JSON.parse(oldCommentsStr);

  const inPostComments = oldComments.filter(
    comment => String(comment.postId) === postId
  );

  return inPostComments;
}

module.exports = {
  createComment,
  getComments,
  getCommentsByPost
}
