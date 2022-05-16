import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import React from 'react';

function DetailPost() {
  const { isAuthenticated } = useAuth()

  const { postId } = useParams();
  return (
    <div>
      detail post { postId }
      { isAuthenticated ? <input type="text" /> : null }
    </div>
  )
}

export default DetailPost;