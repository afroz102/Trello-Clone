import { CONSTANTS } from "../actionType";

const initialState = {
  // "card-0": {
  //   text: "clone trello board",
  //   id: `card-0`,
  //   list: "list-0"
  // }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      
      // const { text, listID, id } = action.payload;
      // const newCard = {
      //   text,
      //   id: `card-${id}`,
      //   list: listID
      // };
      const newState = { ...state, newCard: action.payload };

      return newState;
    }
    case CONSTANTS.EDIT_CARD: {
      console.log('action.payload Edit card: ', action.payload);
      return { ...state, updatedCard: action.payload };
    }

    case CONSTANTS.DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id];
      return newState;
    }
    default:
      return state;
  }
};

export default cardsReducer;
