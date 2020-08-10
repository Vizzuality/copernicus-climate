import React, { useRef, Fragment } from 'react';
import {
  AreaChart,
  LineChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  riskAreas,
  thermalAreas,
  climatologyBars,
  climatologyTypes,
  AREA_MIDDLE_DATA,
} from './const';
import {
  HEATWAVES,
  THERMALCOMFORT,
  OPTIONS_MONTHES,
  PERIOD_HISTORICAL,
  PERIOD_FUTURE_SEASONAL,
  PERIOD_FUTURE_LONGTERM,
} from 'const/constants';

import cx from 'classnames';
import Icon from 'components/icon';
import Slider from './slider';
import styles from './styles.module.scss';


function hourTransform (tick) {
  let newTick = tick;
  if (tick !== null || tick === 0) {
    newTick = (tick === 0 || tick === 24) ? '12' : ('0' + tick).slice(-2);
  }
  return newTick;
}

function hourTransformAMPM (hour, params = {}) {

  let newHour = hour;

  if ((newHour || newHour === 0) && params.withAMPM) {
    newHour = (hour < 12 || hour === 24) ? `${hourTransform(hour)}AM` : `${hourTransform(hour - 12)}PM`;
    
    if (params.lowercase) {
      newHour = newHour.toLowerCase();
    }
  }

  return newHour;
}

function CustomizedTick (props) {

  const { payload, x, y, width, height, withHours } = props;

  return (
    <>
      <text 
        stroke="none"
        width={width}
        height={height}
        x={x}
        y={y}
        fill="1"
        className="recharts-text recharts-cartesian-axis-tick-value"
        text-anchor="middle"
      >
        <tspan
          x={x}
          y={y}
        >
          {hourTransformAMPM(payload.value, { withAMPM: withHours, lowercase: true })}
        </tspan>
        {!withHours && (
          <>
            {(payload.value === 0 || payload.value === 23 || payload.value === 24) && (
              <tspan
                x={x}
                y={y+20}
              >
                {payload.value === 0 && ('AM')}
                {(payload.value === 23 || payload.value === 24) && ('PM')}
              </tspan>
            )}
          </>
        )}
      </text>
    </>
  );
}

function labelTransform(label) {
  const date = new Date(label);
  let month = '';
  if (date.getMonth() || date.getMonth() === 0  ) {
    month = OPTIONS_MONTHES.find(m => m.value === date.getMonth() + 1).label;
  }
  return  `${month} ${date.getFullYear()}`;
}

function getLabel(key, value) {
  let newValue = value;
  if (key === PERIOD_HISTORICAL) {
    newValue = new Date(value).getFullYear();
  }
  if (key === PERIOD_FUTURE_SEASONAL || key === 'temperature-'+PERIOD_HISTORICAL || key === 'temperature-'+PERIOD_FUTURE_SEASONAL) {
    const date = new Date(value);
    let month = '';
    if (date.getMonth() || date.getMonth() === 0  ) {
      month = OPTIONS_MONTHES.find(m => m.value === date.getMonth() + 1).label;
    }
    newValue = `${month} ${date.getFullYear()}`;
  }

  return newValue;
}

function tooltipContent (tooltipProps) {
  const { label, payload, unit, labelStyle, showHours, period } = tooltipProps;
  return (<div className={styles['customTooltip']}>
    <span style={labelStyle}>
      {getLabel(period, label)}
      
      {/* {showHours ? hourTransformAMPM(label, { withAMPM: true, lowercase: false }) : labelTransform(label)} */}
    </span>
    {payload && payload.length > 0 && payload.filter(item => item.name !== 'hour').map(item => {
      const { color, name, value } = item;
      const number = value % 1 !== 0 ? Number(value).toFixed(2) : value;
      return (
        <Fragment key={name}>
          {name !== 'Comfortable' && (
            <div key={name}>
              <svg height="8" width="8"><circle cx="4" cy="4" r="4" fill={color} /></svg>
              {`${number}${unit || ''}`}
            </div>
          )}
        </Fragment>
    )})}
  </div>);
}

function ClimatilogyLegend(props) {
  const { payload } = props;
  return (
    <ul className={styles['custom-legend']}>
      {payload.reverse().map((entry, index) => (
        <>
          {entry.value !== 'Comfortable' && (
            <li key={`item-${index}`} className={styles['legend-item']}>
              <div className={styles.colorBox} style={{backgroundColor: entry.color}} />
              <div className={styles.labelText}>{entry.value}</div>
            </li>
          )}
        </>
      ))}
    </ul>
  );
}


export const ThermalComfortChart = ({
  data = [],
  theme = HEATWAVES,
  period = PERIOD_HISTORICAL,
  iconClickAfter = () => {},
  coordinates = {},
  setCoordinates = () => {},
  onStopCallback = () => {},
  timeFilter={},
}) => {
  let filteredData = data;
  if (timeFilter.from && timeFilter.to ) {
    filteredData = data.filter(d => {
      const time = new Date(d.time).getTime();
      return time >= timeFilter.from && time <= timeFilter.to;
    })
  }
  const areasList = thermalAreas[theme];
  const chartBox = useRef(null);
  const dataKeys = areasList.map(area => area.dataKey);
  const middleData = data.map(d => {
    d.middleData = 0;
    dataKeys.forEach(k => {
      d.middleData += d[k];
    });
    return d;
  })
  return (
    <div className={cx(styles['c-chart'])}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Thermal stress events per month (averaged per geometry)</h4>
      <div className={styles['c-chart-inside']}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={filteredData.length > 0 ? filteredData : []}
            margin={{
              top: 40, right: 0, left: 0, bottom: 0,
            }}
            fontSize={14}
            fontFamily="Open Sans"
            height={220}
          >
            <XAxis
              dataKey="time"
              stroke="1"
              tickFormatter={(tick) => getLabel(period, tick)}
            />
            <YAxis 
              width={50}
              dx={-20}
              stroke="1"
              padding={{top: 0, bottom: 20}}
              type="number" 
              domain={['dataMin', 'dataMax']}
              allowDecimals={false}
              tickFormatter={(tick) => tick.toFixed(0)}
            />
            <Tooltip 
              itemStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }} 
              wrapperStyle={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 10px 0 rgba(0,35,117,0.2)",            
              }}
              contentStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }}
              period={period}
              content={tooltipContent}
            />
            {areasList.map((area) => (<Area key={area.dataKey} {...area} />))}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                bottom: "-70px",
                left: "45px",
              }}
              iconSize={9}
              iconType="circle"
              align="left"
              chartHeight={32}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div ref={chartBox}  className={cx(styles['c-chart-slider-container'], styles.withPadding)}>
          <Slider
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            chartBox={chartBox}
            onStopCallback={onStopCallback}
          />
          <ResponsiveContainer width="100%" height={32}>
            <AreaChart
              data={middleData.length > 0 ? middleData : []}
              margin={{
                top: 0, right: 0, left: 0, bottom: 0,
              }}
              fontSize={14}
              fontFamily="Open Sans"
              height={32}
            >
              <XAxis hide dataKey="time" />
              <YAxis hide />              
              <Area key={middleData} {...AREA_MIDDLE_DATA} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export const RiskEventsChart = ({ 
  data = [],
  theme = HEATWAVES, 
  period = PERIOD_HISTORICAL,
  iconClickAfter = () => {},
  coordinates = {},
  setCoordinates = () => {},
  onStopCallback = () => {},
  timeFilter={},
}) => {

  let filteredData = data;
  if (timeFilter.from && timeFilter.to ) {
    filteredData = data.filter(d => {
      const time = new Date(d.time).getTime();
      return time >= timeFilter.from && time <= timeFilter.to;
    })
  }
  const areasList = riskAreas[theme];
  const chartBox = useRef(null);

  const dataKeys = areasList.map(area => area.dataKey);
  const middleData = data.map(d => {
    d.middleData = 0;
    dataKeys.forEach(k => {
      d.middleData += d[k];
    });
    return d;
  })

  return (
    <div className={cx(styles['c-chart'])}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Risk events per month (averaged per geometry)</h4>
      <div className={styles['c-chart-inside']}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={filteredData.length > 0 ? filteredData : []}
            margin={{
              top: 40, right: 0, left: 0, bottom: 0,
            }}
            fontSize={14}
            fontFamily="Open Sans"
            height={220}
          >
            <XAxis
              dataKey="time"
              stroke="1"
              tickFormatter={(tick) => getLabel(period, tick)}
            />
            <YAxis 
              width={50}
              dx={-20}
              stroke="1"
              padding={{top: 0, bottom: 20}}
              type="number" 
              domain={['dataMin', 'dataMax']}
              allowDecimals={false}
              tickFormatter={(tick) => tick.toFixed(0)}
            />
            <Tooltip 
              itemStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }} 
              wrapperStyle={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 10px 0 rgba(0,35,117,0.2)",
              }}
              contentStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }}
              period={period}
              content={tooltipContent}
            />
            {areasList.map((area) => (<Area key={area.dataKey} {...area} />))}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                bottom: "-70px",
                left: "45px",
              }}
              iconSize={9}
              iconType="circle"
              align="left"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div ref={chartBox} className={cx(styles['c-chart-slider-container'], styles.withPadding)}>
          <Slider
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            chartBox={chartBox}
            onStopCallback={onStopCallback}
          />
          <ResponsiveContainer width="100%" height={32}>
            <AreaChart
              data={middleData.length > 0 ? middleData : []}
              margin={{
                top: 0, right: 0, left: 0, bottom: 0,
              }}
              fontSize={14}
              fontFamily="Open Sans"
              height={32}
            >
              <XAxis hide dataKey="time" />
              <YAxis hide />              
              <Area key={middleData} {...AREA_MIDDLE_DATA} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export const TemparatureChart = ({
  data = [],
  period = PERIOD_HISTORICAL,
  iconClickAfter = () => {},
  timeFilter = {},
  coordinates = {},
  setCoordinates = () => {},
  onStopCallback = () => {},
}) => {
  let filteredData = data;
  if (timeFilter.from && timeFilter.to ) {
    filteredData = data.filter(d => {
      const time = new Date(d.time).getTime();
      return time >= timeFilter.from && time <= timeFilter.to;
    })
  }

  const chartBox = useRef(null);
  const dataKeys = ['tasmin_mean', 'tasmax_mean'];
  const middleData = data.map(d => {
    d.middleData = 0;
    dataKeys.forEach(k => {
      d.middleData += d[k];
    });
    return d;
  })

  return (
    <div className={styles['c-chart']}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Temperatures (max and min)</h4>
      {filteredData.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart
              data={filteredData.length > 0 ? filteredData : []}
              margin={{
                top: 40, right: 0, left: 0, bottom: 0,
              }}
              fontSize={14}
              fontFamily="Open Sans"
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" stroke="1" />
              <YAxis 
                label={{value: "ºC", position: 'insideTop', dx:-15, dy: -30}}
                width={50}
                dx={-20}
                stroke="1"
                padding={{top: 0, bottom: 20}}
              />
              <Tooltip 
                itemStyle={{
                  fontSize: "14px",
                  lineHeight: "20px",
                }} 
                wrapperStyle={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 2px 10px 0 rgba(0,35,117,0.2)",
                }}
                contentStyle={{
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
                period={'temperature-'+period}
                content={(props) => tooltipContent({...props, unit: 'ºC'})}
              />
              <Line
                type="basis"
                name="Max.temperature"
                dataKey="tasmax_mean"
                stroke="#CB181D"
                dot={false}
              />
              <Line
                type="basis"
                name="Min.temperature"
                dataKey="tasmin_mean"
                stroke="#2171B5"
                dot={false}
              />
              <Legend
                layout="horizontal"
                verticalAlign="top"
                wrapperStyle={{
                  fontSize: "14px",
                  lineHeight: "19px",
                  bottom: "-70px",
                  left: '50px',
                }}
                iconSize={9}
                iconType="plainline"
                align="left"
                chartHeight={33}
              />
            </LineChart>
          </ResponsiveContainer>
          <div ref={chartBox} className={cx(styles['c-chart-slider-container'], styles.withPadding)}>
            <Slider
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              chartBox={chartBox}
              onStopCallback={onStopCallback}
            />
            <ResponsiveContainer width="100%" height={32}>
              <AreaChart
                data={middleData.length > 0 ? middleData : []}
                margin={{
                  top: 0, right: 0, left: 0, bottom: 0,
                }}
                fontSize={14}
                fontFamily="Open Sans"
                height={32}
              >
                <XAxis hide dataKey="time" />
                <YAxis hide />              
                <Area key={middleData} {...AREA_MIDDLE_DATA} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}



export const ClimatologyChart = ({ data = [], theme = THERMALCOMFORT, iconClickAfter = () => {} }) => {

  const barsList = climatologyBars[theme];
  const hours = 24;
  const transformedData = [];
  const types = Object.keys(climatologyTypes);
  
  for (let i = 0; i < hours; i++) {
    const hourData = data.filter((d) => d.hour === i);
    const barData = {
      hour: i,
    };
    let summ = 0;
    hourData.forEach(d => {
      types.forEach(t => {
        if (!barData[t]) {
          barData[t] = 0;
        }
        if (climatologyTypes[t].condition(d.pet_mean)) {
          barData[t] = barData[t] ? barData[t] + d.quantile : d.quantile;
        }
      });
      summ += d.quantile;
    });
    Object.keys(barData).forEach(b => {
      if (types.indexOf(b) !== -1) {
        barData[b] = summ > 0 ? ((barData[b] / summ) * 100).toFixed(2) : 0;
      }
    });
    transformedData.push(barData);
  }
  return (
    <div className={cx(styles['c-chart'], styles.withPadding, styles.climatology)}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Hourly Climatology</h4>
      <div className={styles['c-chart-inside']}>
        <ResponsiveContainer width="100%" height={530}>
          <BarChart
            data={transformedData.length > 0 ? transformedData : []}
            margin={{
              top: 40, right: 0, left: 0, bottom: 0,
            }}
            fontSize={14}
            fontFamily="Open Sans"
          >
            <XAxis 
              dataKey="hour" 
              stroke="1"
              hourThansform
              tick={<CustomizedTick />}
            />
            <YAxis 
              label={{value: '%', position: 'insideTop', dx:-15, dy: -40}}
              width={50}
              dx={-20}
              stroke="1"
              type="number"
              domain={[0, 100]}
              tickFormatter={(tick) => tick.toFixed()}
              padding={{top: 0, bottom: 20}}
            />
            <Tooltip 
              itemStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }} 
              wrapperStyle={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 10px 0 rgba(0,35,117,0.2)",
              }}
              contentStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }}
              showHours
              content={(props) => tooltipContent({...props, unit: '%'})}
            />
            {barsList.map((bar) => (<Bar stackId="a" key={bar.dataKey} {...bar} />))}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                bottom: "-30px",
                left: 0,
              }}
              iconSize={9}
              iconType="circle"
              align="left"
              chartHeight={33}
              content={ClimatilogyLegend}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export const ThermalComfortMainChart = ({ data = [], iconClickAfter = () => {} }) => {

  return (
    <div className={cx(styles['c-chart'], styles.withPadding, styles.climatology)}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Thermal Comfort</h4>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={330}>
          <LineChart
            data={data.length > 0 ? data : []}
            margin={{
              top: 40, right: 0, left: 0, bottom: 0,
            }}
            fontSize={14}
            fontFamily="Open Sans"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour" 
              stroke="1"
              tickCount={7}
              type="number"
              tickMargin={30}
              padding={{ left: 20, right: 20 }}
              tick={<CustomizedTick withHours />}
            />
            <YAxis 
              label={{value: 'PET', position: 'insideTop', dx:-15, dy: -30}}
              width={50}
              dx={-20}
              stroke="1"
              padding={{top: 0, bottom: 20}}
              dataKey="pet"
            />
            <Tooltip 
              itemStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }} 
              wrapperStyle={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 10px 0 rgba(0,35,117,0.2)",
              }}
              contentStyle={{
                fontSize: "14px",
                lineHeight: "20px",
              }}
              showHours
              content={tooltipContent}
            />
            <Line
              type="basis"
              name="(PET) Physiological Equivalent Temperature"
              dataKey="pet"
              stroke="#CB181D"
              dot={false}
            />        
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                left: '15px',
                paddingTop: '30px',
              }}
              iconSize={9}
              iconType="plainline"
              align="left"
              chartHeight={33}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className={styles.noData}>
          There is currently no data available for this selection. Please select Madrid, Bizkaia or Gipuzkoa to see PET values.
        </div>
      )}
    </div>
  );
}
