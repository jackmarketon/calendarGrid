import React from 'react';
import { getDate } from 'date-fns/fp';
import Event from './Event';
import './Day.css';

const Day = ({ date, events = [] }) => {
  return (
    <div className="Day">
      {date && <div className="date">{getDate(date)}</div> }
      {events.map(({ id, title }) => <Event key={id} title={title} />)}
    </div>
  );
};

export default Day;
