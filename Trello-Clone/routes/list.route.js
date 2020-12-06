const express = require('express');
const router = express.Router();


// Load List Controller
const {
    createList,
    editListTitle,
    deleteList,
} = require('../controllers/list.controller');


router.post('/create', createList);
router.post('/edit', editListTitle);
router.post('/delete', deleteList);

module.exports = router;