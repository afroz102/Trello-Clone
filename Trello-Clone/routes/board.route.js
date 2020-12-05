const express = require('express');
const router = express.Router();


// Load Board Controller
const {
    getBoard,
    getBoardById,
    createBoard,
} = require('../controllers/board.controller');



router.get('/', getBoard);
router.post('/createboard', createBoard);
router.get('/:boardId', getBoardById);

module.exports = router;