const express = require('express');

const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

const router = express.Router();

// * COMPLETED
router.post('/', (req, res) => {
  const projObj = req.body;
  Projects.insert(projObj)
    .then(proj => {
      res.status(201).json(proj)
    })
    .catch(err => {
      res.status(500).json({ message: "Server error while creating project" })
    })
});

// * COMPLETED
router.post('/:id/actions', (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then(proj => {
      if (proj) {
        Actions.insert({ project_id: id, ...req.body })
          .then(action => {
            // console.log('action:', action)
            res.status(201).json(action)
          })
          .catch(err => {
            res.status(500).json({ message: 'Error creating action' })
          })
      } else {
        res.status(404).json({ message: "project not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Custom Action server error message" })
    })
  // Actions.insert() 
});

// * COMPLETED
router.get('/', (req, res) => {
  Projects.get()
    .then(proj => {
      res.status(200).json(proj)
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get projects" })
    })
});

// * COMPLETED
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then(proj => {
      res.status(200).json(proj)
    })
    .catch(err => {
      res.status(500).json({ message: "There was a server error while getting this project." })
    })
});

// * COMPLETED
router.get('/:id/actions', (req, res) => {
  const projId = req.params.id;
  Projects.getProjectActions(projId)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({ message: "There was a server error while fetching the actions" })
    })
});

// * COMPLETED
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Projects.remove(id)
    .then((proj) => {
      res.status(204).json(proj)
    })
    .catch(err => {
      res.status(500).json({ message: "Server error while deleting Project." })
    })
});

router.delete('/:id/actions/:action-id', (req, res) => {
  // TODO
})

// * COMPLETED
router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Projects.update(id, changes)
    .then(proj => {
      res.status(204).json(proj)
    })
    .catch(err => {
      res.status(500).json({ message: "Server error while editing project" })
    })
})

router.put('/:id/actions/:action-id', (req, res) => {
  // TODO
})


module.exports = router;