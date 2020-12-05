const express = require('express');
const router = express.Router();


// Load List Controller
const {
    createList,
    updateListTitle,
    deleteList,
} = require('../controllers/list.controller');


router.post('/create', createList);
router.post('/update', updateListTitle);
router.post('/delete', deleteList);

module.exports = router;