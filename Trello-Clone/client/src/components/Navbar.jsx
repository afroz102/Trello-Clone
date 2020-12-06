import React, { Component } from "react";
import { connect } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { searchLists } from "../redux/actions/searchListAction";
import "../includes/bootstrap";

// const Navbar = (props) => {
class Navbar extends Component {
  // const [searchInput, setSearchInput] = useState("");
  // const dispatch = useDispatch();
  // const activeBoard = useSelector((state) => state.activeBoard);
  state = {
    searchQuery: "",
  };
  updateInput = (e) => {
    this.setState({ searchQuery: e.target.value });
  };
  render() {
    const boardId = this.props.activeBoard.board.board._id;
    const searchQuery = this.state.searchQuery;

    console.log("props: ", this.props);

    const submitForm = (e) => {
      e.preventDefault();
      console.log(searchQuery, boardId);
      this.props.dispatch(searchLists(searchQuery, boardId));
    };

    return (
      <>
        <nav className="navbar navbar-dark bg-light">
          <div className="d-flex container-fluid justify-content-center">
            <div className="d-flex align-items-center">
              <form onSubmit={(e) => submitForm(e)}>
                <div className="input-group">
                  <input
                    type="text"
                    id="search-button"
                    className="form-control rounded"
                    placeholder="Search Lists"
                    onChange={(e) => this.updateInput}
                  />
                </div>
              </form>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeBoard: state.activeBoard,
  searchLists: state.searchLists,
});

export default connect(mapStateToProps)(Navbar);
