import React from 'react';
import './Event.css';

const Event = ({ title }) => (
  <div className="Event">
    <span>{title}</span>
  </div>
);

export default Event;
