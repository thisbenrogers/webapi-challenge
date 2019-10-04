const express = require('express');


// Projects
const Projects = require('../helpers/projectModel');
//  Actions
const Actions = require('../helpers/actionModel');

const router = express.Router();

// get()
//  currently gets ALL actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the actions',
    });
  }
});

// get(id)
// WORKS
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const action = await Actions.get(id);
    if (id) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        message: 'Action not Found.'
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error retrieving the Action."
    })
  }
})

// insert(req.body)
// works
router.post('/', async (req, res) => {
  try{
    const obj = req.body;
    const action = await Actions.insert(obj);
    res.status(201).json(action);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error creating Action"
    })
  }
});

// update(id, changesObj)
// WORKS
router.put('/:id', async (req, res) => {
  try{
    const action = await Actions.update(req.params.id, req.body);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error updating Action"
    })
  }
});

// remove(id)
// WORKS
router.delete('/:id', async (req, res) => {
  try{
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The Action has been nuked' });
    } else {
      res.status(404).json({ message: 'The Action could not be found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error deleting Action"
    })
  }
});

module.exports = router;