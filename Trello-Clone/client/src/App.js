import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TrelloBoard from './pages/TrelloBoard';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import GetSearchedPage from './pages/GetSearchedPage';

class App extends PureComponent {
  render() {
    return (
      <Router>
        {/* <Navbar /> */}
        <div className="container-fluid my-2">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/board" render={props => <Home {...props} />} />
            <Route exact path="/search/task" render={props => <GetSearchedPage {...props} />} />
            <Route exact path="/board/:boardID" render={props => <TrelloBoard {...props} />} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;