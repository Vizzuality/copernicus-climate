import React from 'react';
import styles from './styles.module.scss';
// import Map from 'components/map';
import { MAPBOX_STYLE_DEFAULT } from 'constants.js';

import ReactMapGL from 'react-map-gl';


const HomePage = () => {

  const viewport = {
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
content
      </div>
      <div className={styles.map}>
        <ReactMapGL 
          width={'100%'}
          height={'100%'}
          viewport={viewport}
          mapStyle={MAPBOX_STYLE_DEFAULT} 
          mapboxApiAccessToken={'pk.eyJ1IjoiY29wZXJuaWN1cy1mb3Jlc3RzIiwiYSI6ImNrMWdxcmtyMDA2YTMzaWp5ajExd3Zwd24ifQ.mc5TAKT9UXkbav2OMvkmrg'}
        />          
        
      </div>
    </div>
  );
}


export default HomePage;