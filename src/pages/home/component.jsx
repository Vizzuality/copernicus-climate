/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import _ from "lodash";
import Map from "components/map";
import { checkType } from "components/chart/const";
import Zoom from "components/map/controls/zoom";
import Dropdown from "components/Dropdown";
import LayerManager from "components/map/layer-manager";
import Loader from "components/Loader";
import Legend from "components/map/legend";
import Modal from "components/modal";
import styles from "./styles.module.scss";
import cx from "classnames";

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
  MODAL_INFO_DATA,
} from "const/constants";
import {
  ThermalComfortChart,
  ThermalComfortMainChart,
  RiskEventsChart,
  TemperatureChart,
  ClimatologyChart,
} from "components/chart";
import { getWidgetData, getLayersInfo, getPets, getPetData } from "api";
import Description from "components/Description";

const DEFAULT_INFO_MODAL = {
  open: false,
  title: "",
  text: "",
};

const HomePage = () => {
  const history = useHistory();
  const [activeLayer, setActiveLayer] = useState(null);
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [isLoading, setLoading] = useState(false);
  const [activeMonth, setActiveMonth] = useState(OPTIONS_MONTHES[0]);
  const [activeMonthTC, setActiveMonthTC] = useState(OPTIONS_MONTHES[0]);
  const [activity, setActivity] = useState(OPTIONS_ACTIVITY[0]);
  const [layersInfo, setLayersInfo] = useState([]);
  const match = useRouteMatch("/:gid/:period/:theme?");
  const [widgetData, setWidgetData] = useState([]);
  const [petMaxMin, setPetMaxMin] = useState({});
  const [pets, setPets] = useState([]);
  const [infoModal, setInfoModal] = useState(DEFAULT_INFO_MODAL);
  const [coordinates, setCoordinates] = useState({ right: 0, left: 0 });
  const [filteredPeriod, setFilteredPeriod] = useState({});
  const [isPopup, setPopup] = useState({});

  const {
    gid = GIDS[0].gid,
    period = OPTIONS_TIME[0].value,
    theme = OPTIONS_THEME[0].value,
  } = (match && match.params) || {};
  const optionValue = OPTIONS_THEME.find((el) => el.value === theme);
  const optionMonthValue = activeMonth;
  const handleChange = (option) =>
    history.push(`/${gid}/${period}/${option.value}`);
  const handleChangeMonth = (option) => setActiveMonth(option);
  const handleChangeActivity = (option) => setActivity(option);
  const handleChangeMonthTC = (option) => setActiveMonthTC(option);
  const { layers = [] } = LAYERS[period][theme] || {};
  const gidInfo = GIDS.find((g) => g.gid === gid);
  const { latitude, longitude, admin_level } = gidInfo;

  const { from, to } = OPTIONS_TIME.find((t) => t.value === period);

  const fetchWidgetsData = async () => {
    setLoading(true);
    let data, pet;
    try {
      data = await getWidgetData({
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
      pet = await getPetData({ gid });
    } catch (err) {
      console.error("Couldn't load the data.", err);
      setWidgetData(null);
    }

    setLoading(false);
    if (data && data.data) setWidgetData(data.data);
    if (pet && pet.data) setPetMaxMin(pet.data[0]);
  };

  const onStopCallback = (width = {}) => {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();
    if (!width.left && !width.right) {
      setFilteredPeriod({ from: start, to: end });
    } else {
      const distance = end - start;
      const newStart = start + (width.left * distance) / 100;
      const newEnd = end - (width.right * distance) / 100;
      setFilteredPeriod({
        from: newStart,
        to: newEnd,
      });
    }
  };

  const fetchLayersInfo = async () => {
    const data = await getLayersInfo(layers.map((l) => l.id));
    if (data) {
      setLayersInfo(data);
    }
  };

  const fetchPets = async () => {
    const data = await getPets();
    if (data) {
      setPets(data);
    }
  };

  const infoModalOpen = (key) => {
    const { title, text } = MODAL_INFO_DATA[key];

    setInfoModal({
      open: true,
      title,
      text,
    });
  };

  const infoModalClose = () => {
    setInfoModal({
      ...infoModal,
      open: false,
    });
  };

  const showPopup = (status = false) => {
    setPopup(status);
  };

  const dateTransform = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  useEffect(() => {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();
    setFilteredPeriod({ from: start, to: end });
    setCoordinates({ right: 0, left: 0 });
  }, [period]);

  useEffect(() => {
    fetchWidgetsData();
    fetchLayersInfo();
    fetchPets();
  }, [theme, period, gid, activeMonth]);

  useEffect(() => {
    fetchLayersInfo();
  }, [theme, period]);

  useEffect(() => {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();
    setFilteredPeriod({ from: start, to: end });
    showPopup(true);
  }, []);

  useEffect(() => {
    const newViewport = {
      ...DEFAULT_VIEWPORT,
      latitude,
      longitude,
      zoom: ADMIN_LEVEL_ZOOM[admin_level],
    };
    setViewport(newViewport);
  }, [gid]);

  const kelvin = -273.15;
  let params, transformedWidgetData, thermalValues, petValues, filteredPets;
  if (widgetData) {
    params = {
      from: filteredPeriod.from
        ? dateTransform(new Date(filteredPeriod.from))
        : from,
      to: filteredPeriod.to ? dateTransform(new Date(filteredPeriod.to)) : to,
      alarmsCount: 0,
      alarmsDev: 0,
      alertsCount: 0,
      alertsDev: 0,
      warningsCount: 0,
      warningsDev: 0,
      extremeCount: 0,
      moderateCount: 0,
      strongCount: 0,
      temperature: null,
      temperatureDev: 0,
      temperatureDate: 0,
      month: activeMonth.label,
    };

    const copyData = _.cloneDeep(widgetData);
    transformedWidgetData =
      theme === THERMALCOMFORT
        ? copyData
        : copyData.map((wd) => {
            const time = new Date(wd.time).getTime();

            // temperature - K to C
            wd.tasmax_mean = parseFloat((wd.tasmax_mean + kelvin).toFixed(2));
            wd.tasmin_mean = parseFloat((wd.tasmin_mean + kelvin).toFixed(2));
            const date = new Date(wd.time);
            wd.time = date ? dateTransform(date) : wd.time;
            if (
              filteredPeriod.from &&
              filteredPeriod.to &&
              time >= filteredPeriod.from &&
              time <= filteredPeriod.to
            ) {
              params.alarmsCount +=
                theme === HEATWAVES
                  ? wd.heatwave_alarms_mean
                  : wd.coldsnap_alarms_mean;
              params.alarmsDev +=
                theme === HEATWAVES
                  ? wd.heatwave_alarms_std
                  : wd.coldsnap_alarms_std;

              params.alertsCount +=
                theme === HEATWAVES
                  ? wd.heatwave_alerts_mean
                  : wd.coldsnap_alerts_mean;
              params.alertsDev +=
                theme === HEATWAVES
                  ? wd.heatwave_alerts_std
                  : wd.coldsnap_alerts_std;

              params.warningsCount +=
                theme === HEATWAVES
                  ? wd.heatwave_warnings_mean
                  : wd.coldsnap_warnings_mean;
              params.warningsDev +=
                theme === HEATWAVES
                  ? wd.heatwave_warnings_std
                  : wd.coldsnap_warnings_std;

              params.extremeCount +=
                theme === HEATWAVES
                  ? wd.heatstress_extreme_mean
                  : wd.coldstress_extreme_mean;
              params.moderateCount +=
                theme === HEATWAVES
                  ? wd.heatstress_moderate_mean
                  : wd.coldstress_moderate_mean;
              params.strongCount +=
                theme === HEATWAVES
                  ? wd.heatstress_strong_mean
                  : wd.coldstress_strong_mean;

              if (!params.temperature) {
                params.temperature =
                  theme === HEATWAVES ? wd.tasmax_mean : wd.tasmin_mean;
                params.temperatureDev =
                  theme === HEATWAVES ? wd.tasmax_std : wd.tasmin_std;
                params.temperatureDate = wd.time;
              }
              if (theme === HEATWAVES) {
                if (params.temperature < wd.tasmax_mean) {
                  params.temperature = wd.tasmax_mean;
                  params.temperatureDev = wd.tasmax_std;
                  params.temperatureDate = wd.time;
                }
              } else {
                if (params.temperature > wd.tasmin_mean) {
                  params.temperature = wd.tasmin_mean;
                  params.temperatureDev = wd.tasmin_std;
                  params.temperatureDate = wd.time;
                }
              }
            }
            return wd;
          });

    thermalValues = {
      min: 0,
      max: 0,
    };
    if (theme !== THERMALCOMFORT) {
      params.alarmsCount = Math.ceil(params.alarmsCount) || 0;
      params.alarmsDev /= transformedWidgetData.length; // std mean

      params.alertsCount = Math.ceil(params.alertsCount) || 0;
      params.alertsDev /= transformedWidgetData.length;

      params.warningsCount = Math.ceil(params.warningsCount) || 0;
      params.warningsDev /= transformedWidgetData.length;

      params.extremeCount = Math.ceil(params.extremeCount) || 0;
      params.moderateCount = Math.ceil(params.moderateCount) || 0;
      params.strongCount = Math.ceil(params.strongCount) || 0;
    } else {
      const sortedData =
        transformedWidgetData.length > 0
          ? transformedWidgetData.sort((a, b) =>
              a.pet_mean > b.pet_mean ? 1 : -1
            )
          : [];
      thermalValues.min =
        sortedData[0] && sortedData[0].pet_mean
          ? checkType(sortedData[0].pet_mean).name
          : 0;
      thermalValues.max =
        sortedData[sortedData.length - 1] &&
        sortedData[sortedData.length - 1].pet_mean
          ? checkType(sortedData[sortedData.length - 1].pet_mean).name
          : 0;
    }

    layersInfo.map((l, ln) => {
      l.attributes.layerConfig.params.admin_level = admin_level;
      l.attributes.layerConfig.source = {
        type: "vector",
        url: SOURCE_URLS[period],
      };
      l.attributes.layerConfig.type = "vector";
      l.attributes.layerConfig.render.layers.map((lc) => {
        lc["source-layer"] = SOURCE_LAYERS[period][admin_level];
        return lc;
      });
      l.isRadio = true;
      l.active = activeLayer ? l.id === activeLayer : ln === 0;
      return l;
    });

    petValues = {
      max: 0,
      activity: activity.label,
      age: OPTIONS_AGE[0].label,
      clothing: OPTIONS_CLOTHING[0].label,
      month: activeMonthTC.label,
      hour: 0,
      petMax: petMaxMin.max_petmax,
      petMin: petMaxMin.min_petmin
    };

    const petFilters = {
      gid: gidInfo.gid,
      activity: activity.value,
      month: activeMonthTC.value,
    };

    filteredPets = pets
      .filter((el) => {
        const isFalse = [];
        if (petFilters.activity && el.variable !== petFilters.activity) {
          isFalse.push("activity");
        }
        if (petFilters.gid && el.gid_code !== petFilters.gid) {
          isFalse.push("gid");
        }
        if (petFilters.month && el.month !== petFilters.month) {
          isFalse.push("gid");
        }
        return isFalse.length === 0;
      })
      .map((el) => {
        if (el.pet > petValues.max) {
          petValues.max = el.pet.toFixed(2);
          petValues.hour = el.hour;
        }
        return el;
      })
      .sort((a, b) => {
        if (a.hour < b.hour) {
          return -1;
        }
        if (a.hour > b.hour) {
          return 1;
        }
        return 0;
      });
  }

  return (  
    <div className={styles.container}>
      {infoModal && infoModal.open && (
        <Modal
          isOpen={infoModal.open}
          handleClose={() => infoModalClose()}
          title={infoModal.title ? infoModal.title : ""}
          text={infoModal.text ? infoModal.text : ""}
        />
      )}
      <div className={styles.content}>
        <div className={styles.contentBox}>
          {isLoading && <Loader />}
          <Dropdown
            options={OPTIONS_THEME}
            value={optionValue}
            onChange={handleChange}
          />
          {(theme === COLDSNAPS || theme === HEATWAVES) && (
            <div className={styles.description}>
              {!isLoading && (
                <Description
                  gidInfo={gidInfo}
                  theme={theme}
                  params={params}
                  period={period}
                />
              )}
            </div>
          )}
          {widgetData && (
            <div className={styles.charts}>
              {(theme === COLDSNAPS || theme === HEATWAVES) && (
                <>
                  <RiskEventsChart
                    data={transformedWidgetData}
                    theme={theme}
                    period={period}
                    iconClickAfter={() => infoModalOpen("riskEvents")}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    onStopCallback={onStopCallback}
                    timeFilter={filteredPeriod}
                  />
                  <TemperatureChart
                    data={transformedWidgetData}
                    theme={theme}
                    period={period}
                    timeFilter={filteredPeriod}
                    iconClickAfter={() => infoModalOpen("temperature")}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    onStopCallback={onStopCallback}
                  />
                  <ThermalComfortChart
                    data={transformedWidgetData}
                    theme={theme}
                    period={period}
                    iconClickAfter={() => infoModalOpen("thermalComfort")}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    onStopCallback={onStopCallback}
                    timeFilter={filteredPeriod}
                  />
                </>
              )}
              {theme === THERMALCOMFORT && (
                <>
                  {period === "historical" ? (
                    <>
                      <div className={styles["tc-filters"]}>
                        <div>
                          <Dropdown
                            block
                            label="Activity"
                            options={OPTIONS_ACTIVITY}
                            value={activity}
                            onChange={handleChangeActivity}
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
                      <div
                        className={cx(styles["tc-period"], styles.calendarBox)}
                      >
                        <Dropdown
                          options={OPTIONS_MONTHES}
                          value={activeMonthTC}
                          onChange={handleChangeMonthTC}
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
                        iconClickAfter={() =>
                          infoModalOpen("thermalComfortMain")
                        }
                      />
                      <div
                        className={cx(
                          styles["tc-climatology"],
                          styles.calendarBox
                        )}
                      >
                        <Dropdown
                          options={OPTIONS_MONTHES}
                          value={optionMonthValue}
                          onChange={handleChangeMonth}
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
                          petValues={petValues}
                        />
                      </div>
                      <ClimatologyChart
                        data={transformedWidgetData}
                        iconClickAfter={() =>
                          infoModalOpen("hourlyClimatology")
                        }
                      />
                    </>
                  ) : (
                    <div className={styles.noData}>
                      <h4>
                        Thermal Comfort is only available for the{" "}
                        <Link to={`/${gid}/historical/${theme}`}>
                          historical
                        </Link>{" "}
                        period.
                      </h4>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {!widgetData && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <p>
                There was an error loading the data.
                <br /> Please try again or select another source.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.map}>
        <Map
          scrollZoom={false}
          viewport={viewport}
          setViewport={setViewport}
          isPopup={
            !isLoading &&
            !(theme === THERMALCOMFORT && period !== "historical") &&
            isPopup
          }
          gidInfo={gidInfo}
          showPopup={showPopup}
          popupContent={
            <Description
              gidInfo={gidInfo}
              theme={theme}
              params={params}
              period={period}
              petValues={petValues}
              popup
            />
          }
        >
          {(map) => (
            <LayerManager
              map={map}
              layers={layersInfo.filter((_layer) => _layer.active)}
            />
          )}
        </Map>
        <Legend
          setActiveLayer={setActiveLayer}
          layers={layersInfo}
          align="right"
          layout="vertical"
          verticalAlign="top"
        />
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
