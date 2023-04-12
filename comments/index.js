const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  res.send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;

  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[postId] || [];
  const comment = { id: commentId, content, status: 'pending' };

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { ...comment, postId },
  });

  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const comments = commentsByPostId[data.postId];
    const comment = comments.find((comment) => comment.id === data.id);
    comment.status = data.status;
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { ...comment, postId: data.postId },
    });
  }

  res.send();
});

const port = 4001;
app.listen(port, () => console.log(`Listening on ${port}`));
