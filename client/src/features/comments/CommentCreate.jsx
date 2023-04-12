import React, { useState } from 'react';
import axios from 'axios';

export const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="content">New Comment</label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};
