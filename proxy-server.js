import express from 'express';
import axios from 'axios';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/s3-data', async (req, res) => {
  try {
    const response = await axios.get('https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json');
    res.status(200).json({
        success: true,
        data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(4000, () => {
  console.log('Proxy server listening on port 4000');
});