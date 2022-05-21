reaction

- Load list bài viết xác định bài viết mình đã like
- Action like
- Action unlike
- Sort base filed likeCount


reaction
post_id
user_id

like => create reaction (user_id, post_id) => inc likeCount post
unlike => delete reaction (user_id, post_id) => inc -1 likeCount post

input: posts { title, des, _id }
output: posts { title, des, isLiked }

Có token => user_id
posts_id {}

posts: [1, 2, 3, 4, 5], user: 'X'

reactions = Model.find({ user_id, post_id: $in posts_id })

=> [{ X, 1 }, { X, 2}] => reactionMap { 1: true, 2: true }
posts.map(post => ({
  ...post,
  isLiked: reactionMap[post_id]
})