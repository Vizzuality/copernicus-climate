import React, { useState } from "react";
import styles from "./styles.module.scss";
import Map from "components/map";
import Zoom from "components/map/controls/zoom";
import Target from "components/map/controls/target";
import { MAPBOX_STYLE_DEFAULT } from "constants.js";

const DEFAULT_VIEWPORT = {
  width: 400,
  height: 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

const HomePage = () => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  return (
    <div className={styles.container}>
      <div className={styles.content}>content</div>
      <div className={styles.map}>
        <Map scrollZoom={false} viewport={viewport} setViewport={setViewport} />
        <div className={styles.navigationBar}>
          <div className={styles.targetBox}>
            <Target viewport={viewport} setViewport={setViewport} />
          </div>
          <div className={styles.zoomBox}>
            <Zoom viewport={viewport} setViewport={setViewport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
