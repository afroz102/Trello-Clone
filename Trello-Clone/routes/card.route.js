const express = require('express');
const router = express.Router();


// Load Card Controller
const {
    createCard,
    updateCardText,
    deleteCard,
} = require('../controllers/card.controller');


router.post('/create', createCard);
router.post('/edit', updateCardText);
router.post('/delete', deleteCard);

module.exports = router;