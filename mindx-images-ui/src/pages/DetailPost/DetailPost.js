import { useParams } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from "../../slices/postSlice";
import Card from '../../components/Card/Card';

function DetailPost() {
  const dispatch = useDispatch();

  const { postId } = useParams();
  const status = useSelector((state) => state.post.status);
  const post = useSelector((state) => state.post.post);

  const isLoading = status === "idle" || status === "loading";
  const isError = status === "error";

  React.useEffect(() => {
    dispatch(fetchPost(postId));
  }, [postId]);

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error</div>;

  return (
    <Card
      title={post.title}
      description={post.description}
      imageUrl={post.imageUrl}
      note={post.createdName}
    />
  );
}

export default DetailPost;
