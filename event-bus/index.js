const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios
    .post('http://posts-clusterip-srv:4000/events', event)
    .catch(() => console.log(`Failed to post ${event.type} to Posts Service`));
  axios
    .post('http://comments-srv:4001/events', event)
    .catch(() =>
      console.log(`Failed to post ${event.type} to Comments Service`),
    );
  axios
    .post('http://query-srv:4002/events', event)
    .catch(() => console.log(`Failed to post ${event.type} to Query Service`));
  axios
    .post('http://moderation-srv:4003/events', event)
    .catch(() =>
      console.log(`Failed to post ${event.type} to Moderation Service`),
    );

  res.send();
});

app.get('/events', (_, res) => {
  res.send(events);
});

const port = 4005;
app.listen(port, () => console.log(`Listening on ${port}`));
