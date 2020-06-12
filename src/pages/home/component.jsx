/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from 'react-router-dom';
import styles from "./styles.module.scss";
import Map from "components/map";
import { checkType } from "components/chart/const";
import Zoom from "components/map/controls/zoom";
import Dropdown from 'components/Dropdown';
import LayerManager from 'components/map/layer-manager';
import Loader from 'components/Loader';
import Legend from 'components/map/legend';
import _ from 'lodash';

import {
  OPTIONS_TIME,
  OPTIONS_THEME,
  HEATWAVES,
  COLDSNAPS,
  GIDS,
  LAYERS,
  TERMALCOMFORT,
  OPTIONS_MONTHES,
} from 'constants.js';
import {
  TermalComfortChart,
  RiskEventsChart,
  TemparatureChart,
  ClimatologyChart,
} from 'components/chart';
import { getWidgetData, getLayersInfo } from 'api';
import Description from "components/Description";

const DEFAULT_VIEWPORT = {
  width: 400,
  height: 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

const HomePage = () => {  
  const history = useHistory();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [isLoading, setLoading] = useState(false);
  const [activeMonth, setActiveMonth] = useState(OPTIONS_MONTHES[0]);
  const [layersInfo, setLayersInfo] = useState([]);
  const match = useRouteMatch('/:gid/:period/:theme?');
  const [widgetData, setWidgetData] = useState([]);
  const {
    gid = GIDS[0].gid,
    period = OPTIONS_TIME[0].value,
    theme = OPTIONS_THEME[0].value,
  } = (match && match.params) || {};
  const optionValue = OPTIONS_THEME.find(el => el.value === theme);
  const optionMonthValue = activeMonth;
  const hadleChange = option => history.push(`/${gid}/${period}/${option.value}`);
  const hadleChangeMonth = option => setActiveMonth(option);
  const { layers = [] } = LAYERS[period][theme] || {};
  const gidInfo = GIDS.find(g => g.gid === gid);
  const { latitude, longitude, admin_level: zoom } = gidInfo;
  useEffect(() => {
    const newViewport = { ...DEFAULT_VIEWPORT, latitude, longitude, zoom: zoom + 3 }
    setViewport(newViewport);
  }, [gid]);

  const { from, to } = OPTIONS_TIME.find(t => t.value === period);
  const fetchWidgetsData = async () => {
    setLoading(true);
    const data = await getWidgetData({
      gid,
      theme,
      period,
      time: {
        start: from,
        end: to,
      },
      month: activeMonth.value,
      admin_level: gidInfo.admin_level,
    });
    setLoading(false);
    setWidgetData(data.data);
  }

  const fetchLayersInfo = async () => {
    const data = await getLayersInfo(layers.map(l => l.id));
    if (data) {
      setLayersInfo(data);
    }
  }

  useEffect(() => {
    fetchWidgetsData();
    fetchLayersInfo();
  }, [theme, period, gid, activeMonth]);
  
  useEffect(() => {
    fetchLayersInfo();
  }, [theme, period]);

  const params = {
    alarmsCount: 0,
    alertsCount: 0,
    warningsCount: 0,
    extreamCount: 0,
    moderateCount: 0,
    strongCount: 0,
    temperature: null,
    temperatureDate :0,
  }
  const kelvin =  -273.15;
  const copyData = _.cloneDeep(widgetData);
  const transformedWidgetData = theme === TERMALCOMFORT ? copyData : copyData.map(wd => {
    params.alarmsCount += theme === HEATWAVES ? wd.heatwave_alarms_mean : wd.coldsnap_alarms_mean;
    params.alertsCount += theme === HEATWAVES ? wd.heatwave_alerts_mean : wd.coldsnap_alerts_mean;
    params.warningsCount += theme === HEATWAVES ? wd.heatwave_warnings_mean : wd.coldsnap_warnings_mean;
    params.extreamCount += theme === HEATWAVES ? wd.heatstress_extreme_mean : wd.coldstress_extreme_mean;
    params.moderateCount += theme === HEATWAVES ? wd.heatstress_moderate_mean : wd.coldstress_moderate_mean;
    params.strongCount += theme === HEATWAVES ? wd.heatstress_strong_mean : wd.coldstress_strong_mean;
    // K to C
    wd.tasmax_mean = parseFloat((wd.tasmax_mean + kelvin).toFixed(2));
    wd.tasmin_mean = parseFloat((wd.tasmin_mean + kelvin).toFixed(2));
    const date = new Date(wd.time);
    wd.time = date ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` : wd.time;

    if (!params.temperature) {
      params.temperature = theme === HEATWAVES ? wd.tasmax_mean : wd.tasmin_mean;
    }
    if (theme === HEATWAVES) {
      if (params.temperature < wd.tasmax_mean) {
        params.temperature = wd.tasmax_mean;
        params.temperatureDate = wd.time;
      }
    } else {
      if (params.temperature > wd.tasmin_mean) {
        params.temperature = wd.tasmin_mean;
        params.temperatureDate = wd.time;
      }
    }
    return wd;
  });

  const thermalValues = {
    min: 0,
    max: 0,
  }
  if (theme !== TERMALCOMFORT) {
    params.alarmsCount = Math.ceil(params.alarmsCount) || 0;
    params.alertsCount = Math.ceil(params.alertsCount) || 0;
    params.warningsCount = Math.ceil(params.warningsCount) || 0;
    params.extreamCount = Math.ceil(params.extreamCount) || 0;
    params.moderateCount = Math.ceil(params.moderateCount) || 0;
    params.strongCount = Math.ceil(params.strongCount) || 0;
  } else {
    const sortedData = transformedWidgetData.length > 0 ? transformedWidgetData.sort((a, b) => a.pet_mean > b.pet_mean ? 1 : -1) : [];
    thermalValues.min = sortedData[0] && sortedData[0].pet_mean ? checkType(sortedData[0].pet_mean).name : 0;
    thermalValues.max = sortedData[sortedData.length - 1] && sortedData[sortedData.length - 1].pet_mean ? checkType(sortedData[sortedData.length - 1].pet_mean).name : 0;
  }

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
          {(theme === COLDSNAPS || theme === HEATWAVES) && (
            <div className={styles.description}>
              {!isLoading && (<Description gidInfo={gidInfo} theme={theme} params={params} />)}
            </div>
          )}
          <div className={styles.charts}>
            {(theme === COLDSNAPS || theme === HEATWAVES) && (
              <>
                <TemparatureChart data={transformedWidgetData} theme={theme} />
                <RiskEventsChart data={transformedWidgetData} theme={theme} />
                <TermalComfortChart data={transformedWidgetData} theme={theme} />
              </>
            )}
            {theme === TERMALCOMFORT && (
              <>
                <br/>
                <Dropdown 
                  options={OPTIONS_MONTHES}
                  value={optionMonthValue}
                  onChange={hadleChangeMonth}
                  mode={'calendar'}
                />
                <div className={styles.description}>
                  <Description
                    gidInfo={gidInfo}
                    theme={theme}
                    params={params}
                    thermalValues={thermalValues}
                  />
                </div>
                <ClimatologyChart data={transformedWidgetData} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.map}>
          <Map scrollZoom={false} viewport={viewport} setViewport={setViewport} >
            {map => (
              <LayerManager map={map} layers={layers} />
            )}
          </Map>
          <Legend layers={layersInfo} align="right" layout="vertical" verticalAlign="top" />
        <div className={styles.navigationBar}>
          <div className={styles.targetBox}>
            {/* <Target viewport={viewport} setViewport={setViewport} /> */}
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
