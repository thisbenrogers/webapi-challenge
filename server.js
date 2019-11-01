const express = require('express'); // importing a CommonJS modu
const helmet = require('helmet');

// const projectsRouter = require('./data/routers/projectRouter');

const server = express();

server.use(helmet());
server.use(express.json());

// server.use('/api/projects', projectsRouter);


module.exports = server;