star

Post
+ totalStar
+ countStar
+ averageStar

- Load list bài viết xác định bài viết mình đã star
- Action star (0-5*)
- Sort base filed starAverage
- Load list bài viết hiển thị star trung bình


star
post_id
user_id
star_count

star => tạo hôặc chỉnh sửa star (upsert) => totalStar, countStar, averageStar = totalStar / countStar 

input: posts { title, des, _id }
output: posts { title, des, starCounted }

Có token => user_id
posts_id {}

posts: [1, 2, 3, 4, 5], user: 'X'

stars = Model.find({ user_id, post_id: $in posts_id })

=> [{ X, 1 }, { X, 2}] => starMap { 1: true, 2: true }
posts.map(post => ({
  ...post,
  startCount: starMap[post_id].count;
})