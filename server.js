const express = require('express'); // importing a CommonJS modu
const helmet = require('helmet');

const projectsRouter = require('./data/routers/projectRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: "It's working" });
})


module.exports = server;