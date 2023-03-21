import React from 'react';

export default function Timeline_card(props) {
  const cardCountry = props.event.country;
  const cardNamePlace = props.event.name_place;
  const cardStartDate = props.event.start_date;
  const cardEndDate = props.event.end_date;

  return (
    <div className="timeline_card">
      Visited
      <div className="timeline_dates">
        {cardStartDate} {cardEndDate}
      </div>
      <div className="timeline_location">
        {cardNamePlace}, {cardCountry}
      </div>
    </div>
  );
}
