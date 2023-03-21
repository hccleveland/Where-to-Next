import React from 'react';

export default function Timeline_card(props) {
  const card_country = props.event.country;
  const card_city = props.event.city;
  const card_image_url = props.event.image_url;
  const card_start_date = props.event.start_date;
  const card_end_date = props.event.end_date;

  return (
    <div className="timeline_card">
      <img src={card_image_url}/>
      Visited
      <div className="timeline_dates">
        {card_start_date} {card_end_date}
      </div>
      <div className="timeline_location">
        {card_city}, {card_country}
      </div>
    </div>
  );
}
