import React, { useState } from 'react';
import axios from 'axios';

export const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    await axios.post('http://posts.com/posts/create', { title });
    setTitle('');
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};
