import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Ranking(props) {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/friend/${props.index.id}`);
  };

  return (
    <div onClick={clickHandler}>
      <br />
      {props.myKey + 1} {props.index.name} {props.index.point}
    </div>
  );
}



 /*pathname: `/friend/${props.index.name}`,
      query: {
        id: props.index.id,
        points: props.index.points
      }
    });*/