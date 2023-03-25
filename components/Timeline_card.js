import React from 'react';
import { AppContext } from './Layout';
import { useRouter } from 'next/router';

export default function Timeline_card(props) {
  const router = useRouter();
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const card_country = props.time.country;
  const card_city = props.time.city;
  const card_image_url = props.time.image_url;
  const card_start_date = props.time.start_date;
  const card_end_date = props.time.end_date;
  const doc_id = props.time.docid;

  props.time['uid'] = uid;

  const handleClick = () => {
    router.push({
      pathname: '/timeline_actions',
      query: { data: JSON.stringify(props.time) },
    });
  };

  return (
    <div
      className={'timeline_card'}
      owner={uid}
      docid={doc_id}
      onClick={handleClick}
    >
      <img src={card_image_url} />
      Visited
      <div className='timeline_dates' owner={uid} docid={doc_id}>
        {card_start_date} {card_end_date}
      </div>
      <div className='timeline_location' owner={uid} docid={doc_id}>
        {card_city}, {card_country}
        {/* {props.test && (
          <input
            name='input'
            className='input'
            placeholder='put your highlight'
            onKeyDown={(e) => props.send(e)}
            onChange={(e) => props.highlight(e.target.value)}
            owner={uid}
            docid={props.time.docid}
          ></input>
        )} */}
      </div>
    </div>
  );
}
