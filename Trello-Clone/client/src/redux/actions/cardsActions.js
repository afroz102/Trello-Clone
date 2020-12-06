import { CONSTANTS } from './../actionType';
import axios from 'axios';

// import uuid from 'uuidv4';
// export const addCard = (listID, text) => {
//   const id = uuid();
//   return {
//     type: CONSTANTS.ADD_CARD,
//     payload: { text, listID, id }
//   };
// };

// create a new Card
export const addCard = (title, listId) => async (dispatch) => {
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
    },
  };

  // Set body
  const body = JSON.stringify({ title, listId });

  await axios.post(`${process.env.REACT_APP_API_URL}/card/create`, body, config)
    .then((response) => {

      console.log('response create list: ', response);

      dispatch({
        type: CONSTANTS.ADD_CARD,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err);
    });
}

export const editCard = (cardId, listId, newTitle) => async (dispatch) => {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
    },
  };

  // Set body
  const body = JSON.stringify({ cardId, listId, newTitle });

  await axios.post(`${process.env.REACT_APP_API_URL}/card/edit`, body, config)
    .then((response) => {

      console.log('response edited list: ', response);

      dispatch({
        type: CONSTANTS.EDIT_CARD,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (id, listID) => {
  return {
    type: CONSTANTS.DELETE_CARD,
    payload: { id, listID }
  };
};
