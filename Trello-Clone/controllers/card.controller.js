const CardModel = require('../models/card.model');
const ListModel = require('../models/list.model')

exports.createCard = async (req, res) => {
    try {
        console.log('req.body: ', req.body);

        const listId = req.body.listId;
        const cardTitle = req.body.title;

        const newCardObject = {
            listId: listId,
            title: cardTitle
        }



        const newCard = new CardModel(newCardObject);
        newCard.save(async (err, card) => {
            if (err) {
                console.log("Can not Create Card. Error: ", err);
                return res.status(401).json({
                    error: err
                });
            }
            console.log('card created: ', card);

            await ListModel.findById(listId, function (err, list) {
                if (err) {
                    console.log(err);
                }
                list.cards.push(newCardObject);
                list.save((err, doc) => {
                    if (err) {
                        console.log("error while updating list: ", err);
                    }
                    console.log("updated doc: ", doc);
                    return res.json({ card });
                });
            });
            //   (
            //     { _id: listId },
            //     { $push: { cards: newCardObject } },
            //     function (err, doc) {
            //         if (err) {
            //             console.log("Error while updating card : ", err);
            //         }
            //         console.log("updated doc: ", doc);
            //         return res.json({ card });
            //     }
            // );

        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.updateCardText = async (req, res) => {

}

exports.deleteCard = async (req, res) => {

}