import React from 'react';
import { AppContext } from './Layout';

export default function Timeline_card(props) {

  const {Uid} = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const card_country = props.time.country;
  const card_city = props.time.city;
  const card_image_url = props.time.image_url;
  const card_start_date = props.time.start_date;
  const card_end_date = props.time.end_date;

  return (
    <div className={"timeline_card"} owner={uid} docid={props.time.docid}>
      <img src={card_image_url}/>
      Visited
      <div className="timeline_dates" owner={uid}docid={props.time.docid}>
        {card_start_date} {card_end_date}
      </div>
      <div className="timeline_location"owner={uid}docid={props.time.docid}>
        {card_city}, {card_country}
        {props.test && <input       name='input'
        className='input'
        placeholder='put your highlight'
        onKeyDown={(e)=>props.send(e)}
        onChange={(e) => props.highlight(e.target.value)} owner={uid}docid={props.time.docid}></input>}
      </div>
    </div>
  );
}
