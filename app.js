//.env
require('dotenv').config();
//importamos archivo server.js
const Server = require('./models/server');

const server = new Server();

server.listen();
