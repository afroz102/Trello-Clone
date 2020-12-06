import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

import TrelloButton from "./TrelloButton";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

import { addCard } from "../redux/actions/cardsActions";
import { addList } from "../redux/actions/listsActions";
import { setActiveBoard } from "../redux/actions/boardActions";

class TrelloCreate extends React.PureComponent {
  state = {
    formOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = (e) => {
    const { dispatch } = this.props;
    const { text } = this.state;
    const activeBoard = this.props.activeBoard;
    console.log("activeBoard in trello create: ", activeBoard);
    const boardId = activeBoard.board.board._id;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addList(text, boardId));
      dispatch(setActiveBoard(this.props.boardID));
    }

    return;
  };

  handleAddCard = (e) => {
    console.log("this.props: ", this.props);
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addCard(text, listID));
      dispatch(setActiveBoard(this.props.boardID));
    }
  };

  renderOpenForm = () => {
    const { list } = this.props;
    console.log("this.props: ", this.props);

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <TrelloForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <TrelloButton
          onClick={
            list ? (e) => this.handleAddList(e) : (e) => this.handleAddCard(e)
          }
        >
          {list ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
    ) : (
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {list ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state props in home: ", state);
  return {
    activeBoard: state.activeBoard,
  };
};

export default connect(mapStateToProps)(TrelloCreate);
