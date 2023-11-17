const express = require('express');
const { body } = require('express-validator');
const battleController = require('../controllers/battleController')
const router = express.Router();
const db = require('../db');


router.post("/Battle", battleController.newBattle)
router.get('/inProgress', battleController.getInProgress)
router.get(`/inProgress/filter`, (req, res) => {
    const searchTerm = req.query.q;
  
    console.log(searchTerm)
  
    if (!searchTerm ) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    // Use parameterized query to prevent SQL injection
    const query = 'SELECT * FROM battle WHERE status = "InProgress" AND (userIdF = ? OR userIdS = ?)';
    
    // Use an array to pass values securely to the query
    db.query(query, [searchTerm,searchTerm], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(results);
    });
  });

module.exports = router;
