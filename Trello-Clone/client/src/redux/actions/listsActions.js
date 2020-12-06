import axios from 'axios';
import { CONSTANTS } from './../actionType';

// create a List Title
export const addList = (title, boardId) => async (dispatch) => {
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
    },
  };

  // Set body
  const body = JSON.stringify({ title, boardId });

  await axios.post(`${process.env.REACT_APP_API_URL}/list/create`, body, config)
    .then((response) => {

      console.log('response create list: ', response);

      dispatch({
        type: CONSTANTS.ADD_LIST,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err);
    });
}


export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    });
  };
};

export const editTitle = (listId, newTitle) => async (dispatch) => {
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
    },
  };

  // Set body
  const body = JSON.stringify({ newTitle, listId });

  await axios.post(`${process.env.REACT_APP_API_URL}/list/edit`, body, config)
    .then((response) => {

      console.log('response edit list: ', response);

      dispatch({
        type: CONSTANTS.EDIT_LIST_TITLE,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err);
    });
}

export const deleteList = (listId) => async (dispatch) => {
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
    },
  };

  // Set body
  const body = JSON.stringify({ listId });
  await axios.post(`${process.env.REACT_APP_API_URL}/list/delete`, body, config)
    .then((response) => {
      console.log('response create list: ', response);

      dispatch({
        type: CONSTANTS.DELETE_LIST,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err);
    });

  // return dispatch({
  //   type: CONSTANTS.DELETE_LIST,
  //   payload: {
  //     listID,
  //     boardID
  //   }
  // });

};
