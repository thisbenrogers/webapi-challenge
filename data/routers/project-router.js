const express = require('express');

const Projects = require('../helpers/projectModel');


const router = express.Router();

// get()
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the projects',
    });
  }
});

// get(id)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const project = await Projects.get(id);
    if (id) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: 'Project not Found.'
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error retrieving the Project."
    })
  }
})

// insert(req.body)
router.post('/', async (req, res) => {
  try{
    const obj = req.body;
    const project = await Projects.insert(obj);
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error creating Project"
    })
  }
});

// update(id, changesObj)
router.put('/:id', async (req, res) => {
  try{
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error updating Project"
    })
  }
});

// remove(id)
router.delete('/:id', async (req, res) => {
  try{
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The project has been nuked' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error deleting Project"
    })
  }
});

module.exports = router;