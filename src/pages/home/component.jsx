import React, { useState } from "react";
import { useRouteMatch, useHistory } from 'react-router-dom';
import styles from "./styles.module.scss";
import Map from "components/map";
import Zoom from "components/map/controls/zoom";
import Target from "components/map/controls/target";
import Dropdown from 'components/dropdown';
import { COUNTRIES, OPTIONS_TIME, OPTIONS_TYPE } from 'constants.js';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const DEFAULT_VIEWPORT = {
  width: 400,
  height: 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

const data = [
  {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page A', uv: 300, pv: 2500, amt: 2500},
  {name: 'Page A', uv: 700, pv: 2800, amt: 2100},
  {name: 'Page A', uv: 100, pv: 2900, amt: 2100},
];



const renderLineChart = (
  <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

const HomePage = () => {
  const history = useHistory();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const match = useRouteMatch('/:iso/:time/:type?');
  const { 
    iso = COUNTRIES[0].iso, 
    time = OPTIONS_TIME[0].value, 
    type = OPTIONS_TYPE[0].value,
  } = (match && match.params) || {};
  const optionValue = OPTIONS_TYPE.find(el => el.value === type);
  const hadleChange = option => history.push(`/${iso}/${time}/${option.value}`);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentBox}>
          <Dropdown 
            options={OPTIONS_TYPE}
            value={optionValue}
            onChange={hadleChange}
          />
          
          <div className={styles.description}>
            From 1981 to 2020 <span>88 alarms</span>, <span>142 alerts</span> and 392 warnings, and 73 extreme, 92 strong and 107 moderate heat stress events were observed in Bizkaia. The highest temperature of 36.59 ºC was observed in 1995-07-01.
          </div>

          <div className={styles.charts}>
            {renderLineChart}
          </div>
        </div>

      </div>
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
