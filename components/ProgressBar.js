import Grid from '@mui/material/Grid';
import { useRef, useEffect } from 'react';

const ProgressBar = (props) => {
  const { point, bgcolor, completed, info } = props;


  let badgeImage = '';
  let titleArray = ['Rookie', 'Traveler', 'Connoisseur', 'Explorator'];
  let title;
  let continent = '';
  let total = 0;
  let next = 0;

  if (info === 'asia') {
    continent = 'in Asia';
    total = 52;
    switch (true) {
      case point >= 42:
        title = 3;
        break;
      case point >= 20 && point < 42:
        title = 2;
        next = 42 - point;
        break;
      case point >= 10 && point < 20:
        title = 1;
        next = 20 - point;
        break;
      case point < 10:
        title = 0;
        next = 10 - point;
        break;
    }
  }

  if (info === 'africa') {
    continent = 'in Africa';
    total = 54;
    switch (true) {
      case point >= 50:
        title = 3;
        break;
      case point >= 25 && point < 50:
        next = 50 - point;
        title = 2;
        break;
      case point >= 10 && point < 25:
        next = 25 - point;
        title = 1;
        break;
      case point < 10:
        next = 10 - point;
        title = 0;
        break;
    }
  }

  if (info === 'europe') {
    continent = 'in Europe';
    total = 44;
    switch (true) {
      case point >= 40:
        title = 3;
        break;
      case point >= 20 && point < 40:
        next = 40 - point;
        title = 2;
        break;
      case point >= 10 && point < 20:
        next = 20 - point;
        title = 1;
        break;
      case point < 10:
        next = 10 - point;
        title = 0;
        break;
    }
  }

  if (info === 'oceania') {
    continent = 'in Oceania';
    total = 14;
    switch (true) {
      case point >= 12:
        title = 3;
        break;
      case point >= 6 && point < 12:
        next = 12 - point;
        title = 2;
        break;
      case point >= 3 && point < 6:
        next = 6 - point;
        title = 1;
        break;
      case point < 3:
        next = 3 - point;
        title = 0;
        break;
    }
  }

  if (info === 'namerica') {
    continent = 'in North America';
    total = 23;
    switch (true) {
      case point >= 20:
        title = 3;
        break;
      case point >= 10 && point < 20:
        next = 20 - point;
        title = 2;
        break;
      case point >= 5 && point < 10:
        next = 10 - point;
        title = 1;
        break;
      case point < 5:
        next = 5 - point;
        title = 0;
        break;
    }
  }

  if (info === 'samerica') {
    continent = 'in South America';
    total = 12;
    switch (true) {
      case point >= 10:
        title = 3;
        break;
      case point >= 6 && point < 10:
        next = 10 - point;
        title = 2;
        break;
      case point >= 3 && point < 6:
        next = 6 - point;
        title = 1;
        break;
      case point < 3:
        next = 3 - point;
        title = 0;
        break;
    }
  }

  if (info === 'world') {
    continent = 'of the world';
    total = 195;
    switch (true) {
      case point >= 150:
        title = 3;
        break;
      case point >= 50 && point < 150:
        next = 150 - point;
        title = 2;
        break;
      case point >= 5 && point < 50:
        next = 50 - point;
        title = 1;
        break;
      case point < 5:
        next = 5 - point;
        title = 0;
        break;
    }
  }

  if (info === 'helper') {
    console.log(point)
    switch (true) {
      case point >= 20000:
        title = 3;
        break;
      case point >= 2000 && point < 20000:
        next = 20000 - point;
        title = 2;
        break;
      case point >= 200 && point < 2000:
        next = 2000 - point;
        title = 1;
        break;
      case point < 200:
        next = 200 - point;
        title = 0;
        break;
    }
  }

  badgeImage = `/${info}${title}.png`;
  let badgeImage2 = `/${info}${title + 1}.png`;



  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#E3D5A5",
    margin: 50,
    
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right"
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold"
  };

  const fillerRef = useRef(null);

  useEffect(() => {
    if (fillerRef.current) {
      const animation = fillerRef.current.animate([
        { width: 0 },
        { width: `${completed}%` }
      ], {
        duration: 2000,
        easing: "ease-out"
      });

      animation.onfinish = () => {
        animation.cancel();
      };
    }
  }, [completed]);

  return (
    <Grid container spacing={2} justify="center" alignItems="center" style={{ fontFamily: 'Palatino, serif' }}>
      <Grid item xs={2}>
        <img src={badgeImage} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '5px solid black' }}></img>
      </Grid>
      <Grid item xs={6}>
        <div>{titleArray[title]}</div>
        <div style={containerStyles}>
          <div className="filler" style={fillerStyles} ref={fillerRef}>
            <span style={labelStyles}>{`${completed}%`}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {info === 'helper' ? (
            <>
            <p>You have gathered {point} points</p>
            <p>{next} points before the next level </p>
            </>
          ) : (
            <>
            <p>You have visited {point} of {total} countries {continent}</p>
            <p>{next} countries to visit before the next level</p>
            </>
          )}
        </div>
      </Grid><Grid item xs={2}>
      </Grid>
      <Grid item xs={2}>
        <img src={badgeImage2} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '5px solid black' }}></img>
      </Grid>
    </Grid>
  );
};

export default ProgressBar;