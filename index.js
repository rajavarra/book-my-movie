require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const theatresRouter = require('./routes/v1/theatresRoute');
const PORT = process.env.PORT || 8000;

const app = express();

const { connectDb } = require('./configuration/mysql.db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To Book My Show!' });
});

app.use('/api/v1/theaters', theatresRouter);

app.listen(PORT, async (error) => {
  if (!error) {
    await connectDb();
    console.log(`Server running on port: ${PORT}`);
  } else {
    console.log(`Server Failed To Start. error: ${error}`);
  }
});
