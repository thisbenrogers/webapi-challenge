const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./data/routers/project-router.js');

const server = express();

const logger = (req, res, next) => {
  console.log(`${req.method} to ${req.path}`);
  next();
}

server.use(logger);
server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter);

const port = process.env.PORT || 4444;
server.listen(port, () => {
  console.log(`\napi running on port ${port}\n`)
});

server.get('/', (req, res) => {
  res.send('This is running');
})



module.exports = server;