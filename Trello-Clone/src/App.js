import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TrelloBoard from './pages/TrelloBoard';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/board" render={props => <Home {...props} />} />
            <Route exact path="/board/:boardID" render={props => <TrelloBoard {...props} />} />
            {/* <Route exact path="/home" component={Home} />
            <Route exact path="/:boardID" component={TrelloBoard} /> */}
            {/* <Redirect to="/home" /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;