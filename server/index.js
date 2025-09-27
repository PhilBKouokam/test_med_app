const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8181;

// Enhanced CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow React app origin
  credentials: true, // Allow cookies or auth headers if needed
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
}));

app.use(express.json());

connectToMongo();

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});