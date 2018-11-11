import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getMonth, getYear } from 'date-fns';
import Calendar from './Calendar';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/calendar/:year/:month" render={(props) => {
            const { match: { params: { month, year } } } = props;
            if (month < 13 && month > 0 && year >= 1990) {
              return <Calendar {...props} />;
            }
            const currDate = Date.now();
            return <Redirect
              to={`/calendar/${getYear(currDate)}/${getMonth(currDate) + 1}`} />;
          }} />
          <Route render={() => {
            const currDate = Date.now();
            return <Redirect
              to={`/calendar/${getYear(currDate)}/${getMonth(currDate) + 1}`} />;
          }} />
        </Switch>
      </Router>
    );
  }
}

export default App;
