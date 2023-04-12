const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (_, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title };
  posts[id] = post;

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: post,
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(`Received event ${type}`);

  res.send();
});

const port = 4000;
app.listen(port, () => console.log(`Listening on ${port}`));
