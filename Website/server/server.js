const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/furnitura', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose schema and model
const requestSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Request = mongoose.model('Request', requestSchema);

// Routes
app.post('/api/requests', async (req, res) => {
  const { name, phone } = req.body;
  const newRequest = new Request({ name, phone });

  try {
    await newRequest.save();
    res.status(201).json({ message: 'Request saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
