import { useParams } from 'react-router-dom';

function DetailPost() {
  const { postId } = useParams();
  return (
    <div>
      detail post { postId }
    </div>
  )
}

export default DetailPost;