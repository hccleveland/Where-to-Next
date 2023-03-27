import React from 'react';
// import { AppContext } from './Layout';

export default function AddTripCard(props) {

//   const { Uid } = React.useContext(AppContext);
//   const [uid, setUid] = Uid;
  const card_country = props.time.country;
  const card_city = props.time.city;
  const card_image_url = props.time.image_url;
//   const card_start_date = props.time.start_date;
//   const card_end_date = props.time.end_date;
//   const doc_id = props.time.docid;

//   props.time['uid'] = uid;

  

  return (
    <div
      className={'timeline_card'}
    //   owner={uid}
    //   docid={doc_id}
    //   onClick={handleClick}
    >
      <img src={card_image_url} />
      <div className='timeline_dates'>
        {/* {card_start_date} {card_end_date} */}
      </div>
      <div className='timeline_location'>
        {card_city}, {card_country}
      </div>
      <button>Add Trip to Timeline</button>
    </div>
  );
}
