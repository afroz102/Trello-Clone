import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";

import BoardThumbnail from "../components/BoardThumbnail";
import { addBoard, getAllBoard } from "../redux/actions/boardActions";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 32px;
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 2px;
  border: none;
  outline-color: darkGray;
  box-shadow: 0 2px 4px grey;
  align-self: center;
  background-color: #cbcbd2;
`;

const Home = () => {
  // this is the home site that shows you your boards and you can also create a Board here.

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const boards = useSelector((state) => state.boards);
  const boardOrder = useSelector((state) => state.boardOrder);
  console.log("boards: ", boards);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  // get todo
  useEffect(() => {
    dispatch(getAllBoard());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    if (boards && boards.board && boards.board.length !== 0) {
      return boards.board.map((board) => {
        // console.log('board: ', board);
        return (
          <Link
            key={board._id}
            to={`/board/${board._id}`}
            style={{ textDecoration: "none", marginTop: "50px" }}
          >
            <BoardThumbnail {...board} />
          </Link>
        );
      });
    } else {
      /*// console.log("boardOrder: ", boardOrder);
    if (boardOrder.length !== 0) {
      return boardOrder.map((boardID) => {
        const board = boards[boardID];

        return (
          <Link
            key={boardID}
            to={`/board/${board.id}`}
            style={{ textDecoration: "none", marginTop: "50px" }}
          >
            <BoardThumbnail {...board} />
          </Link>
        );
      });
    }*/
      // console.log("no board. create one");
      return (
        <h2 style={{ marginTop: "50px", color: "#42596d", fontSize: "40px" }}>
          {" "}
          You don't have any board. Create one below...
        </h2>
      );
    }
  };

  const renderCreateBoard = () => {
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: "center",
          marginTop: "50px",
          border: "2px solid transpatent",
          borderRadius: "10px",
          backgroundColor: "#807b7d",
        }}
      >
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Add your board title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      <Thumbnails>{renderBoards()}</Thumbnails>
      {renderCreateBoard()}
    </HomeContainer>
  );
};

const mapStateToProps = (state) => {
  console.log("state props in home: ", state);
  return {
    boards: state.boards,
    boardOrder: state.boardOrder,
  };
};

// export default connect(mapStateToProps)(Home);
export default Home;
