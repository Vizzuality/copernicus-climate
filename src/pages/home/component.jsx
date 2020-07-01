/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from 'react-router-dom';
import _ from 'lodash';
import Map from "components/map";
import { checkType } from "components/chart/const";
import Zoom from "components/map/controls/zoom";
import Dropdown from 'components/Dropdown';
import LayerManager from 'components/map/layer-manager';
import Loader from 'components/Loader';
import Legend from 'components/map/legend';
import Modal from 'components/modal';
import styles from "./styles.module.scss";
import cx from 'classnames';

import {
  OPTIONS_TIME,
  OPTIONS_THEME,
  HEATWAVES,
  COLDSNAPS,
  GIDS,
  LAYERS,
  DEFAULT_VIEWPORT,
  ADMIN_LEVEL_ZOOM,
  SOURCE_URLS,
  SOURCE_LAYERS,
  THERMALCOMFORT,
  OPTIONS_MONTHES,
  OPTIONS_ACTIVITY,
  OPTIONS_AGE,
  OPTIONS_CLOTHING,
  MODAL_INFO_DATA
} from 'const/constants';
import {
  ThermalComfortChart,
  ThermalComfortMainChart,
  RiskEventsChart,
  TemparatureChart,
  ClimatologyChart,
} from 'components/chart';
import { getWidgetData, getLayersInfo, getPets } from 'api';
import Description from "components/Description";

const DEFAULT_INFO_MODAL = {
  open: false,
  title: '',
  text: '',
}

const HomePage = () => {  
  const history = useHistory();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [isLoading, setLoading] = useState(false);
  const [activeMonth, setActiveMonth] = useState(OPTIONS_MONTHES[0]);
  const [activeMonthTC, setActiveMonthTC] = useState(OPTIONS_MONTHES[0]);
  const [activity, setActivity] = useState(OPTIONS_ACTIVITY[0]);
  const [layersInfo, setLayersInfo] = useState([]);
  const match = useRouteMatch('/:gid/:period/:theme?');
  const [widgetData, setWidgetData] = useState([]);
  const [pets, setPets] = useState([]);
  const [infoModal, setInfoModal] = useState(DEFAULT_INFO_MODAL);
  const {
    gid = GIDS[0].gid,
    period = OPTIONS_TIME[0].value,
    theme = OPTIONS_THEME[0].value,
  } = (match && match.params) || {};
  const optionValue = OPTIONS_THEME.find(el => el.value === theme);
  const optionMonthValue = activeMonth;
  const hadleChange = option => history.push(`/${gid}/${period}/${option.value}`);
  const hadleChangeMonth = option => setActiveMonth(option);
  const hadleChangeActivity = option => setActivity(option);
  const hadleChangeMonthTC = option => setActiveMonthTC(option);
  const { layers = [] } = LAYERS[period][theme] || {};
  const gidInfo = GIDS.find(g => g.gid === gid);
  const { latitude, longitude, admin_level } = gidInfo;

  useEffect(() => {
    const newViewport = { ...DEFAULT_VIEWPORT, latitude, longitude, zoom: ADMIN_LEVEL_ZOOM[admin_level] }
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

  const fetchPets = async () => {
    const data = await getPets();
    if (data) {
      setPets(data);
    }
  }

  const infoModalOpen = (key) => {

    const { title, text } = MODAL_INFO_DATA[key];

    setInfoModal({
      open: true,
      title,
      text,
    })
  };

  const infoModalClose = () => {
    setInfoModal({
      ...infoModal,
      open: false,
    })
  }

  useEffect(() => {
    fetchWidgetsData();
    fetchLayersInfo();
    fetchPets();
  }, [theme, period, gid, activeMonth]);
  
  useEffect(() => {
    fetchLayersInfo();
  }, [theme, period]);

  const params = {
    from,
    to,
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
  const transformedWidgetData = theme === THERMALCOMFORT ? copyData : copyData.map(wd => {
    params.alarmsCount += theme === HEATWAVES ? wd.heatwave_alarms_mean : wd.coldsnap_alarms_mean;
    params.alertsCount += theme === HEATWAVES ? wd.heatwave_alerts_mean : wd.coldsnap_alerts_mean;
    params.warningsCount += theme === HEATWAVES ? wd.heatwave_warnings_mean : wd.coldsnap_warnings_mean;
    params.extreamCount += theme === HEATWAVES ? wd.heatstress_extreme_mean : wd.coldstress_extreme_mean;
    params.moderateCount += theme === HEATWAVES ? wd.heatstress_moderate_mean : wd.coldstress_moderate_mean;
    params.strongCount += theme === HEATWAVES ? wd.heatstress_strong_mean : wd.coldstress_strong_mean;
    // temperature - K to C
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
  if (theme !== THERMALCOMFORT) {
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

  layersInfo.map(l => {
    l.attributes.layerConfig.params.admin_level = admin_level;
    l.attributes.layerConfig.source = {
      type: 'vector',
      url: SOURCE_URLS[period],
    };
    l.attributes.layerConfig.type = 'vector';
    l.attributes.layerConfig.render.layers.map(lc => {
      lc['source-layer'] = SOURCE_LAYERS[period][admin_level];
      return lc;
    });
    return l;
  });

  const petValues = {
    max: 0,
    activity: activity.label,
    age: OPTIONS_AGE[0].label,
    clothing: OPTIONS_CLOTHING[0].label,
    month: activeMonthTC.label,
    hour: 0,
  };

  const petFilters = {
    gid: gidInfo.gid,
    activity: activity.value,
    month: activeMonthTC.value,              
  };

  const filteredPets = pets.filter((el) => {
    const isFalse = [];
    if (petFilters.activity && el.variable !== petFilters.activity) {
      isFalse.push('activity');
    }
    if (petFilters.gid && el.gid_code !== petFilters.gid) {
      isFalse.push('gid');
    }
    if (petFilters.month && el.month !== petFilters.month) {
      isFalse.push('gid');
    }
    return isFalse.length === 0;
  }).map((el) => {
    if (el.pet > petValues.max) {
      petValues.max = el.pet.toFixed(2);
      petValues.hour = el.hour;
    }
    return el;
  }).sort((a, b) => {
    if (a.hour < b.hour) {
      return -1;
    }
    if (a.hour > b.hour) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      {infoModal && infoModal.open && (
        <Modal 
          isOpen={infoModal.open}
          handleClose={() => infoModalClose()}
          title={infoModal.title ? infoModal.title : ''}
          text={infoModal.text ? infoModal.text : ''}
        />
      )}
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
                <TemparatureChart
                  data={transformedWidgetData}
                  theme={theme}
                  iconClickAfter={() => infoModalOpen('temperature')}
                />
                <RiskEventsChart
                  data={transformedWidgetData}
                  theme={theme}
                  iconClickAfter={() => infoModalOpen('riskEvents')}
                />
                <ThermalComfortChart
                  data={transformedWidgetData}
                  theme={theme}
                  iconClickAfter={() => infoModalOpen('thermalComfort')}
                />
              </>
            )}
            {theme === THERMALCOMFORT && (
              <>
                <div className={styles['tc-filters']}>
                  <div>
                    <Dropdown
                      block
                      label="Activity"
                      options={OPTIONS_ACTIVITY}
                      value={activity}
                      onChange={hadleChangeActivity}
                      mode="light"
                    />
                  </div>
                  <div>
                    <Dropdown
                      block
                      label="Age"
                      options={OPTIONS_AGE}
                      value={OPTIONS_AGE[0]}
                      mode="light"
                      disabled
                    />
                  </div>
                  <div>
                    <Dropdown
                      block
                      label="Clothing"
                      options={OPTIONS_CLOTHING}
                      value={OPTIONS_CLOTHING[0]}
                      mode="light"
                      disabled
                    />
                  </div>
                </div>
                <div className={cx(styles['tc-period'], styles.calendarBox)}>
                  <Dropdown 
                    options={OPTIONS_MONTHES}
                    value={activeMonthTC}
                    onChange={hadleChangeMonthTC}
                    mode="calendar"
                    block
                  />
                </div>
                {filteredPets && filteredPets.length > 0 && (
                  <div className={styles.description}>
                    <Description
                      gidInfo={gidInfo}
                      isPet
                      petValues={petValues}
                    />
                  </div>
                )}
                <ThermalComfortMainChart
                  data={filteredPets}
                  iconClickAfter={() => infoModalOpen('thermalComfortMain')}
                />
                <div className={cx(styles['tc-climatology'], styles.calendarBox)}>
                  <Dropdown 
                    options={OPTIONS_MONTHES}
                    value={optionMonthValue}
                    onChange={hadleChangeMonth}
                    mode="calendar"
                    block
                  />
                </div>
                <div className={styles.description}>
                  <Description
                    gidInfo={gidInfo}
                    theme={theme}
                    params={params}
                    thermalValues={thermalValues}
                  />
                </div>
                <ClimatologyChart
                  data={transformedWidgetData}
                  iconClickAfter={() => infoModalOpen('hourlyClimatology')}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.map}>
          <Map scrollZoom={false} viewport={viewport} setViewport={setViewport} >
            {map => (
              <LayerManager map={map} layers={layersInfo} />
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
