import { combineReducers } from 'redux';
import listsReducer from './reducers/listsReducer';
import cardsReducer from './reducers/cardsReducer';
import boardsReducer from './reducers/boardsReducer';
import boardOrderReducer from './reducers/boardOrderReducer';
import activeBoardReducer from './reducers/activeBoardReducer';
import searchListReducer from './reducers/searchListReducer';

const rootReducer = combineReducers({
    activeBoard: activeBoardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    boards: boardsReducer,
    boardOrder: boardOrderReducer,
    searchLists: searchListReducer,
});

export default rootReducer;
