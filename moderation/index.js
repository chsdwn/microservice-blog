const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }

  res.send();
});

const port = 4003;
app.listen(port, () => console.log(`Listening on ${port}`));
