import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  addDays,
  addMonths,
  endOfMonth,
  getDate,
  getDay,
  format,
  getDaysInMonth,
  getMonth,
  getYear,
  isSameMonth,
} from 'date-fns/fp';
import uuid from 'uuid/v4';
import { compose, mapProps } from 'recompose';
import Day from './Day';
import './Calendar.css';

const addOneMonth = addMonths(1);
const subOneMonth = addMonths(-1);
const formatMonthYear = format('MMMM yyyy');

class Calendar extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    // In the future we may want to move this into
    // a functionality where we only retrieve events in the current months instead of all months
    // Either via external state management or a combination of this method and componentDidUpdate
    window.fetch('http://localhost:3030/')
      .then((res) => res.json())
      .then(({ data: events }) => this.setState({ events }));
  }

  getDateMonthAdjustment = (prev = false) => {
    const date = prev
      ? subOneMonth(this.props.date)
      : addOneMonth(this.props.date);

    return {
      year: getYear(date),
      month: getMonth(date),
    };
  };

  getMonthLink = (prev = false) => {
    const { year, month } = this.getDateMonthAdjustment(prev);
    return `/calendar/${year}/${month + 1}`;
  };

  renderHeader = () => {
    const { date } = this.props;

    return (<div className="Header">
      <Link className="Link" to={this.getMonthLink(true)}>&larr;</Link>
      <span>{formatMonthYear(date)}</span>
      <Link className="Link" to={this.getMonthLink()}>&rarr;</Link>
    </div>)
  };

  renderDates = () => {
    const { events } = this.state;
    const sameMonthAsCurrent = isSameMonth(this.props.date);
    const eventsThisMonthPerDay = events
      .reduce((acc, event) => {
        if (!sameMonthAsCurrent(event.launch_date)) {
          return acc;
        }
        const day = getDate(event.launch_date);
        if (acc[day]) {
          return { ...acc, [day]: acc[day].concat(event)};
        }
        return { ...acc, [day]: [event] };
      }, {});
    const totalDays = getDaysInMonth(this.props.date);
    return Array(totalDays).fill('').map((_, idx) => {
      const date = addDays(idx, this.props.date)
      return (
        <Day
          key={data}
          date={date}
          events={eventsThisMonthPerDay[idx + 1]}
        />
      );
    });
  };

  renderPaddedDates = () => {
    const dayOfWeek = getDay(this.props.date);
    return dayOfWeek !== 0 && Array(dayOfWeek)
      .fill('').map(() => <Day key={uuid()} />);
  };

  renderPaddedTailingDates = () => {
    const dayOfWeek = getDay(endOfMonth(this.props.date));
    return dayOfWeek !== 0 && Array(6 - dayOfWeek)
      .fill('').map(() => <Day key={uuid()} />);
  };

  render() {
    return (
      <div className="Calendar">
        {this.renderHeader()}
        <div className="CalendarBody">
          <div className="CalendarHeader">Sunday</div>
          <div className="CalendarHeader">Monday</div>
          <div className="CalendarHeader">Tuesday</div>
          <div className="CalendarHeader">Wednesday</div>
          <div className="CalendarHeader">Thursday</div>
          <div className="CalendarHeader">Friday</div>
          <div className="CalendarHeader">Saturday</div>
          {this.renderPaddedDates()}
          {this.renderDates()}
          {this.renderPaddedTailingDates()}
        </div>
      </div>
    );
  }
}

const mapPathToProps = mapProps(
  ({ match: { params: { month, year } } }) => {
    return ({ date: new Date(year, month - 1) });
  }
);

const enhancer = compose(
  mapPathToProps,
);

export default enhancer(Calendar);
