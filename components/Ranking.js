import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';

export default function Ranking(props) {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/friend/${props.index.id}`);
  };

  return (
    <div onClick={clickHandler}>
      <br />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{
          backgroundColor: '#545F72',
          borderRadius: '10px',
          cursor: 'pointer',
          border: '3px solid black',
        }}
      >
        <Grid
          container
          item
          xs={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {' '}
          <span style={{ fontSize: '25px' }}>{props.myKey + 1}</span>
        </Grid>
        <Grid
          container
          item
          xs={7}
          style={{
            display: 'flex',
            alignItems: 'left',
            border: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
            color: props.myKey < 3 ? '#E3D5A5' : 'white',
          }}
        >
          <span style={{ fontSize: '25px' }}>{props.index.name}</span>
        </Grid>
        <Grid
          container
          item
          xs={3}
          style={{
            display: 'flex',
            alignItems: 'right',
            border: 'none',
            paddingLeft: '10px',
            justifyContent: 'right',
            paddingRight: '10px',
          }}
        >
          <span style={{ fontSize: '25px' }}>{props.index.point}</span>
        </Grid>
      </Grid>
    </div>
  );
};
