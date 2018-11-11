import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getMonth, getYear } from 'date-fns';
import Calendar from './Calendar';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/calendar/:year/:month" component={Calendar} />
          <Route render={() => {
            const currDate = Date.now();
            const month = getMonth(currDate);
            const year = getYear(currDate);
            return <Redirect to={`/calendar/${year}/${month}`} />;
          }} />
        </Switch>
      </Router>
    );
  }
}

export default App;
