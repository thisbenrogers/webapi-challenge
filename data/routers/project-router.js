const express = require('express');

const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

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

// insert()
// router.post();

// update(id, changesObj)
// router.put();

// remove(id)
// router.delete();

module.exports = router;