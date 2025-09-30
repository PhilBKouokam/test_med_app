const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const connectToMongo = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8181;

app.use(cors({
  origin: "https://kouokambryan-3001.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai", // Match HTTPS origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('/api/auth/register', cors());

app.use(express.json());

connectToMongo();

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});