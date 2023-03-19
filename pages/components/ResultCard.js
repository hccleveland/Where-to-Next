import React from 'react';
export default function ResultCard(props) {
  let countryNameEnglish = props.city['countryNameEnglish'];
  let countryId = props.city['countryId'];
  let countryImageUrl = props.city['countryImageUrl'];
  let name = props.city['name'];
  let imageUrl = props.city['imageUrl'];
  let price = props.city['price'];

  return (
    <div className='result-card'>
      <img className='result-card-image' src={imageUrl}></img>
      <div className='result-card-desc'>
        {name}, {countryNameEnglish}
        <br></br>
        Mon, Jan 01 - Sun, Jan 07<br></br>${Math.floor(price)}
      </div>
    </div>

    // <div className='result-card'>
    //   <img
    //     className='result-card-image'
    //     src={
    //       'https://content.skyscnr.com/53628704cd04914234be0037f639b2f7/GettyImages-476817068.jpg?crop=400px:400px&quality=75'
    //     }
    //   ></img>
    //   <div className='result-card-desc'>
    //     city, country
    //     <br></br>
    //     Mon, Jan 01 - Sun, Jan 07
    //     <br></br>
    //     $100
    //   </div>
    // </div>
  );
}
