import React from 'react';
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
import styles from './styles.module.scss';
import {
  riskAreas,
  thermalAreas,
  climatologyBars,
  climatologyTypes
} from './const';
import { HEATWAVES, THERMALCOMFORT } from 'const/constants';
import cx from 'classnames';
import Icon from 'components/icon';


function hourTransform (tick) {
  return tick === 0 ? 12 : tick;
}

function CustomizedTick (props) {

  const { payload, x, y, width, height } = props;

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
          {hourTransform(payload.value)}
        </tspan>
        {(payload.value === 0 || payload.value === 23 || payload.value === 24) && (
          <tspan
            x={x}
            y={y+20}
          >
            {payload.value === 0 && ('AM')}
            {(payload.value === 23 || payload.value === 24) && ('PM')}
          </tspan>
        )}
      </text>
    </>
  );
}

function tooltipContent (tooltipProps) {
  const { label, payload, unit, labelStyle } = tooltipProps;
  return (<div className={styles['customTooltip']}>
    <span style={labelStyle}>{label}</span>
    {payload.filter(item => item.name !== 'hour').map(item => {
      const { color, name, value } = item;
      const number = value % 1 !== 0 ? Number(value).toFixed(2) : value;
      return (
        <>
          {name !== 'Comfortable' && (
            <div key={name}>
              <svg height="8" width="8"><circle cx="4" cy="4" r="4" fill={color} /></svg>
              {`${name}: ${number}${unit || ''}`}
            </div>
          )}
        </>
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


export const ThermalComfortChart = ({ data = [], theme = HEATWAVES, iconClickAfter = () => {} }) => {
  const areasList = thermalAreas[theme];
  return (
    <div className={cx(styles['c-chart'], styles.withPadding)}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Thermal Comfort</h4>
      <div className={styles['c-chart-inside']}>
        <div className={styles.dotLeft}>
          <span></span>
          <span></span>
        </div>
        <div className={styles.dotRight} >
          <span></span>
          <span></span>
        </div>
        <ResponsiveContainer width="100%" height={52}>
          <AreaChart
            data={data.length > 0 ? data : []}
            margin={{
              top: 0, right: 0, left: 0, bottom: 0,
            }}
            fontSize={14}
            fontFamily="Open Sans"
          >
            <XAxis 
              hide 
              dataKey="time" 
            />
            <YAxis hide />
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
              content={tooltipContent}
            />
            {areasList.map((area) => (<Area key={area.dataKey} {...area} />))}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                bottom: "-10px",
              }}
              iconSize={9}
              iconType="circle"
              align="left"
              chartHeight={33}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export const RiskEventsChart = ({ data = [], theme = HEATWAVES, iconClickAfter = () => {} }) => {

  const areasList = riskAreas[theme];

  return (
    <div className={cx(styles['c-chart'], styles.withPadding)}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <h4>Risk Events</h4>
      <div className={styles['c-chart-inside']}>
        <div className={styles.dotLeft}>
          <span></span>
          <span></span>
        </div>
        <div className={styles.dotRight} >
          <span></span>
          <span></span>
        </div>
        <ResponsiveContainer width="100%" height={52}>
          <AreaChart
            data={data.length > 0 ? data : []}
            margin={{
              top: 0, right: 0, left: 0, bottom: 0,
            }}
            fontSize={14}
            fontFamily="Open Sans"
          >
            <XAxis hide dataKey="time" />
            <YAxis hide />
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
              content={tooltipContent}
            />
            {areasList.map((area) => (<Area key={area.dataKey} {...area} />))}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                bottom: "-10px",
              }}
              iconSize={9}
              iconType="circle"
              align="left"
              chartHeight={33}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export const TemparatureChart = ({ data = [], iconClickAfter = () => {} }) => {
  
  return (
    <div className={styles['c-chart']}>
      <div className={styles.info} onClick={iconClickAfter}>
        <Icon name="icon-info" />
      </div>
      <ResponsiveContainer width="100%" height={270}>
      <LineChart
        data={data.length > 0 ? data : []}
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
            top: "0",
            left: '50px',
          }}
          iconSize={9}
          iconType="plainline"
          align="left"
          chartHeight={33}
        />
      </LineChart>
      </ResponsiveContainer>
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
              labelStyle={{ display: 'none' }}
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
            <XAxis dataKey="hour" stroke="1" />
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
