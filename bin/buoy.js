"use strict";
// Memanggil kedua fungsi
require('../services/mqttConfigs.js');
require('../controllers/mqttController.js');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../models/index.js');
const mqttClient = require('../services/mqttConfigs.js')
const multer = require('multer');
const storage = multer.memoryStorage(); // menyimpan file ke memory
const upload = multer({ storage: storage });

const route = require('../routes/user.routes.js')

// konfigurasi http 
const fs = require('fs');
const http = require('http');
const https = require('https');
// konfigurasi https
const privateKey = fs.readFileSync(');
const certificate = fs.readFileSync('');
const ca = fs.readFileSync('');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
};

// apply the CORS options
app.use(cors(corsOptions));

// if you run again and don't wanna lost your data
db.sequelize.sync();

// medium route
 app.use('/', route);

// middleware setting for public directory
 app.use(express.static('public'));

// set port, listen for requests
const PORT = process.env.PORT || ;
app.listen(PORT, () => {
  console.log(`Server is running on  http:${PORT}.`);
});

// Mulai server HTTPS
const HTTPS_PORT = ;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on https:${HTTPS_PORT}`);
});
