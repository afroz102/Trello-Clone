const express = require('express');
const router = express.Router();


// Load search Controller
const { searchCard, getSearchedCard } = require('../controllers/search.controller');


router.post('/', searchCard);
router.get('/task/:searchQuery', getSearchedCard);

module.exports = router;