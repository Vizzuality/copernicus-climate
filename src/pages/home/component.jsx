/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from 'react-router-dom';
import styles from "./styles.module.scss";
import Map from "components/map";
import Zoom from "components/map/controls/zoom";
import Target from "components/map/controls/target";
import Dropdown from 'components/dropdown';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import Loader from 'components/Loader';
import { 
  COUNTRIES, 
  OPTIONS_TIME, 
  OPTIONS_THEME,
  COUNTRIES_DEFAULT_VIEWPORTS,
  HEATWAVES,
  COLDSNAPS,
} from 'constants.js';
import { 
  TermalComfortChart, 
  RiskEventsChart,
  TemparatureChart,
} from 'components/chart';
import { getWidgetData } from 'api';

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

const HomePage = () => {
  const history = useHistory();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [isLoading, setLoading] = useState(false);
  const match = useRouteMatch('/:gid/:period/:theme?');
  const [widgetData, setWidgetData] = useState([]);
  const { 
    gid = COUNTRIES[0].iso, 
    period = OPTIONS_TIME[0].value, 
    theme = OPTIONS_THEME[0].value,
  } = (match && match.params) || {};
  const optionValue = OPTIONS_THEME.find(el => el.value === theme);
  const hadleChange = option => history.push(`/${gid}/${period}/${option.value}`);

  useEffect(() => {
    setViewport(COUNTRIES_DEFAULT_VIEWPORTS[gid]);
  }, [gid]);

  const from = '2015-01-01';
  const to = '2020-01-01';
  const fetchWidgetsData = async () => {
    setLoading(true);
    const data = await getWidgetData({
      theme,
      period,
      time: {
        start: from,
        end: to,
      }
    });
    setLoading(false);
    setWidgetData(data.data);
  }

  useEffect(() => {
    fetchWidgetsData();
  }, [theme, period]);
  
  let alarmsCount = 0;
  let alertsCount = 0;
  let warningsCount = 0;
  let extreamCount = 0;
  let moderateCount = 0;
  let strongCount = 0;
  const kelvin =  -273.15;
  widgetData.map(wd => {
    alarmsCount += theme === HEATWAVES ? wd.heatwave_alarms_mean : wd.coldsnap_alarms_mean;
    alertsCount += theme === HEATWAVES ? wd.heatwave_alerts_mean : wd.coldsnap_alerts_mean;
    warningsCount += theme === HEATWAVES ? wd.heatwave_warnings_mean : wd.coldsnap_warnings_mean;
    extreamCount += theme === HEATWAVES ? wd.heatstress_extreme_mean : wd.coldstress_extreme_mean;
    moderateCount += theme === HEATWAVES ? wd.heatstress_moderate_mean : wd.coldstress_moderate_mean;
    strongCount += theme === HEATWAVES ? wd.heatstress_strong_mean : wd.coldstress_strong_mean;
    wd.tasmax_mean = parseFloat((wd.tasmax_mean + kelvin).toFixed(2));
    wd.tasmin_mean = parseFloat((wd.tasmin_mean + kelvin).toFixed(2));
    return wd;
  });
  alarmsCount = Math.ceil(alarmsCount);
  alertsCount = Math.ceil(alertsCount);
  warningsCount = Math.ceil(warningsCount);
  extreamCount = Math.ceil(extreamCount);
  moderateCount = Math.ceil(moderateCount);
  strongCount = Math.ceil(strongCount);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentBox}>
          {isLoading && (<Loader />)}
          <Dropdown 
            options={OPTIONS_THEME}
            value={optionValue}
            onChange={hadleChange}
          />          
          <div className={styles.description}>
            {!isLoading && (
              <>
                From {from} to {to} {` `}
                <span>{alarmsCount} alarms</span>,{` `}
                <span>{alertsCount} alerts</span>{` `}
                and <span>{warningsCount} warnings</span>,{` `}
                and <span>{extreamCount} extreme</span>,{` `}
                <span>{strongCount} strong</span>{` `}
                and <span>{moderateCount} moderate heat stress events</span> were observed in{` `}
                <span>Bizkaia</span>. {` `}
                The highest temperature of 36.59 ºC was observed in 1995-07-01.
              </>
            )}
          </div>
          <div className={styles.charts}>
            <TemparatureChart data={widgetData} theme={theme} />
            <RiskEventsChart data={widgetData} theme={theme} />
            <TermalComfortChart data={widgetData} theme={theme} />
          </div>
        </div>

      </div>
      <div className={styles.map}>
        {/* <Map scrollZoom={false} viewport={viewport} setViewport={setViewport} >
          {map => (
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {layers
                .filter(l => l.active)
                .map(layer => (
                  // TODO: fix all eslint-disables
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Layer key={layer.id} {...layer} />
                ))}
            </LayerManager>
          )}
        </Map> */}
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
