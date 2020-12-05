const ListModel = require('../models/list.model');
const BoardModel = require('../models/board.model');
exports.createList = async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        const boardId = req.body.boardId;
        const listTitle = req.body.title;

        // const board = await BoardModel.findById(boardId);
        // console.log('Action in board: ', board);

        const newList = new ListModel({
            boardId: boardId,
            title: listTitle
        });

        newList.save((err, list) => {
            if (err) {
                console.log("Can not Create List. Error: ", err);
                return res.status(401).json({
                    // error: errorHandler(err)
                    error: err
                });
            }
            console.log('list created: ', list);

            return res.json({ list });
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}



exports.updateListTitle = async (req, res) => {

}

exports.deleteList = async (req, res) => {

}