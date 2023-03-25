import React from 'react';

const Item = (props) => {
  console.log(props);
  return (
    <div className='item'>
      <div className='name'>
        <p>
          {props.name} {props.city} {props.country} {props.iata_code}
        </p>
      </div>
    </div>
  );
};

export default Item;
