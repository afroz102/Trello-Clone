import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import styled from "styled-components";

import TrelloList from "../components/TrelloList";
import TrelloCreate from "../components/TrelloCreate";
import { setActiveBoard } from "../redux/actions/boardActions";
import { sort } from "../redux/actions/listsActions";
import Navbar from "../components/Navbar";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

class TrelloBoard extends PureComponent {
  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { searchLists, activeBoard } = this.props;

    // console.log("activeBoard: ", activeBoard);
    console.log("searchLists: ", searchLists);
    let board, lists;
    if (activeBoard) {
      board = activeBoard.board.board;
      lists = activeBoard.board.lists;
      if (!board) {
        return <p>Board not found</p>;
      }
    }

    return activeBoard ? (
      <>
        <Navbar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Link style={{ margin: "10px 0 0 10px" }} to="/board">
            Go Back
          </Link>
          <h2 style={{ margin: "20px 0 20px 10px" }}>{board.title}</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              // <ListsContainer
              //   {...provided.droppableProps}
              //   ref={provided.innerRef}
              // >
              <ListsContainer ref={provided.innerRef}>
                {lists.map((list, index) => {
                  // const list = lists[listID];
                  if (list) {
                    const listCards = list.cards;

                    return (
                      <TrelloList
                        listID={list._id}
                        key={list._id}
                        title={list.title}
                        cards={listCards}
                        index={index}
                        boardID={board._id}
                      />
                    );
                  }
                })}
                {provided.placeholder}
                <TrelloCreate list />
              </ListsContainer>
            )}
          </Droppable>
        </DragDropContext>
      </>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
  activeBoard: state.activeBoard,
  searchLists: state.searchLists,
});

export default connect(mapStateToProps)(TrelloBoard);
