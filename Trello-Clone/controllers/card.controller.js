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
                list.cards.push(card);
                list.save((err, doc) => {
                    if (err) {
                        console.log("error while updating list: ", err);
                    }
                    console.log("updated doc: ", doc);
                    return res.json({ card });
                });
            });

        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.updateCardText = async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        const cardId = req.body.cardId;
        const listId = req.body.listId;
        const newTitle = req.body.newTitle;

        await CardModel.findById(cardId, async function (err, card) {
            if (err) {
                console.log("Error in finding card while updating card: ", err);
            }

            // const newCard = card;
            // console.log('list found:', card);
            card.title = newTitle;

            console.log('newCard to be updated: ', card);

            card.save((err, updatedCard) => {
                if (err) {
                    console.log("error while updating Card title: ", err);
                }
                console.log("updated doc in card model: ", updatedCard);

                ListModel.findById(listId, function (err, list) {
                    if (err) {
                        console.log(err);
                    }

                    const indexToUpdate = list.cards.findIndex(card => card._id == cardId);

                    list.cards[indexToUpdate] = updatedCard;

                    list.markModified('cards');

                    console.log('list: ', list);

                    list.save((err, updatedCardInList) => {
                        if (err) {
                            console.log("error while updating card in list model: ", err);
                        }
                        console.log("updated doc in list model: ", updatedCardInList);

                        return res.json({ updatedCardInList });
                    });
                });
                // return res.json({ updatedCard });
            });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteCard = async (req, res) => {

}