const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const comments = posts[data.postId].comments;
    const comment = comments.find((comment) => comment.id === data.id);
    comment.content = data.content;
    comment.status = data.status;
  }
};

app.get('/posts', (_, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send();
});

const port = 4002;
app.listen(port, async () => {
  console.log(`Listening on ${port}`);

  const res = await axios
    .get('http://localhost:4005/events')
    .catch(() => console.log('An error occured to while fetching events.'));

  if (!res.data) return;

  for (let event of res.data) {
    console.log('Processing event:', event.type);
    handleEvent(event.type, event.data);
  }
});
