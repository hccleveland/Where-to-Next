import React from 'react';
export default function ResultCard(props) {
  let countryNameEnglish = props.city['countryNameEnglish'];
  let countryId = props.city['countryId'];
  let countryImageUrl = props.city['countryImageUrl'];
  let name = props.city['name'];
  let imageUrl = props.city['imageUrl'];
  let price = props.city['price'];

  console.log(
    countryNameEnglish,
    countryId,
    countryImageUrl,
    name,
    imageUrl,
    price
  );
  return (
    <div className='result-card'>
      <img className='result-card-image' src={imageUrl}></img>
      <div className='result-card-desc'>
        {name}, {countryNameEnglish}
        <br></br>
        Mon, Jan 01 - Sun, Jan 07<br></br>${Math.floor(price)}
      </div>
    </div>
  );
}
