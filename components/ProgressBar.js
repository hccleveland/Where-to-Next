import Grid from '@mui/material/Grid';

const ProgressBar = (props) => {
  const { point, bgcolor, completed, info } = props;
  console.log("point", point)
  console.log("bgcolor", bgcolor)
  console.log("completed", completed)
  console.log("info", info)

  let badgeImage = ''; 
  
  if (info === 'asia'){
    switch (true){
      case point >= 42:
        badgeImage = '/asiaPlane.png';
      break;
      case point >= 20 && point < 42:
        badgeImage = '/asiaBoat.png';
      break;
      case point >= 10  && point < 20:
        badgeImage = '/asiaTrain.png';
      break;
      case point < 10:
        badgeImage = '/asiaCar.png';
      break;
    }
  }

  if (info === 'africa'){
    switch (true){
      case point >= 50:
        badgeImage = '/africaPlane.png';
      break;
      case point >= 25 && point < 50:
        badgeImage = '/africaBoat.png';
      break;
      case point >= 10  && point < 25:
        badgeImage = '/africaTrain.png';
      break;
      case point < 10:
        badgeImage = '/africaCar.png';
      break;
    }
  }

  if (info === 'europe'){
    switch (true){
      case point >= 40:
        badgeImage = '/europePlane.png';
      break;
      case point >= 20 && point < 40:
        badgeImage = '/europeBoat.png';
      break;
      case point >= 10  && point < 20:
        badgeImage = '/europeTrain.png';
      break;
      case point < 10:
        badgeImage = '/europeCar.png';
      break;
    }
  }

  if (info === 'oceania'){
    switch (true){
      case point >= 12:
        badgeImage = '/oceaniaPlane.png';
      break;
      case point >= 6 && point < 12:
        badgeImage = '/oceaniaBoat.png';
      break;
      case point >= 3  && point < 6:
        badgeImage = '/oceaniaTrain.png';
      break;
      case point < 3:
        badgeImage = 'oceaniaCar.png';
      break;
    }
  }

  if (info === 'namerica'){
    switch (true){
      case point >= 20:
        badgeImage = '/namericaPlane.png';
      break;
      case point >= 10 && point < 20:
        badgeImage = '/namericaBoat.png';
      break;
      case point >= 5  && point < 10:
        badgeImage = '/namericaTrain.png';
      break;
      case point < 5:
        badgeImage = 'namericaCar.png';
      break;
    }
  }

  if (info === 'samerica'){
    switch (true){
      case point >= 10:
        badgeImage = '/samericaPlane.png';
      break;
      case point >= 6 && point < 10:
        badgeImage = '/samericaBoat.png';
      break;
      case point >= 3  && point < 6:
        badgeImage = '/samericaTrain.png';
      break;
      case point < 3:
        badgeImage = 'samericaCar.png';
      break;
    }
  }

  if (info === 'world'){
    switch (true){
      case point >= 150:
        badgeImage = '/worldPlane.png';
      break;
      case point >= 50 && point < 150:
        badgeImage = '/worldBoat.png';
      break;
      case point >= 5  && point < 50:
        badgeImage = '/worldTrain.png';
      break;
      case point < 5:
        badgeImage = 'worldCar.png';
      break;
    }
  }

  if (info === 'helper'){
    switch (true){
      case point >= 20000:
        badgeImage = '/helperPlane.png';
      break;
      case point >= 2000 && point < 20000:
        badgeImage = '/helperBoat.png';
      break;
      case point >= 200  && point < 2000:
        badgeImage = '/helperTrain.png';
      break;
      case point < 200:
        badgeImage = 'helperCar.png';
      break;
    }
  }
  




  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item xs={2}>
        <img src={badgeImage} className='medals'></img>
        </Grid>
        <Grid item xs={10}>
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
    </Grid>
    </Grid>
  );
};

export default ProgressBar;