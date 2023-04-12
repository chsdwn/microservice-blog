import React from 'react';

export const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.status === 'approved' && comment.content}
          {comment.status === 'pending' && 'Pending'}
          {comment.status === 'rejected' && 'Rejected'}
        </li>
      ))}
    </ul>
  );
};
