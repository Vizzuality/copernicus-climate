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
  termalAreas,
  climatologyBars,
  climatologyTypes
} from './const';
import { HEATWAVES, TERMALCOMFORT } from 'const/constants';
import cx from 'classnames';

function ClimatilogyLegend(props) {
  const { payload } = props;
  return (
    <ul className={styles['custom-legend']}>
      {payload.reverse().map((entry, index) => (
        <li key={`item-${index}`} className={styles['legend-item']}>
          <div className={styles.colorBox} style={{backgroundColor: entry.color}} />
          <div className={styles.labelText}>{entry.value}</div>
        </li>
      ))}
    </ul>
  );
}


export const TermalComfortChart = ({ data = [], theme = HEATWAVES }) => {
  const areasList = termalAreas[theme];
  return (
    <div className={cx(styles['c-chart'], styles.withPadding)}>
      <div className={styles.info}>
        i 
      </div>
      <h4>Termal Comfort</h4>
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


export const RiskEventsChart = ({ data = [], theme = HEATWAVES }) => {

  const areasList = riskAreas[theme];

  return (
    <div className={cx(styles['c-chart'], styles.withPadding)}>
      <div className={styles.info}>
        i 
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

export const TemparatureChart = ({ data = [] }) => {
  
  return (
    <div className={styles['c-chart']}>
      <div className={styles.info}>
        i 
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



export const ClimatologyChart = ({ data = [], theme = TERMALCOMFORT }) => {

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
      <div className={styles.info}>
        i 
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
            />
            <YAxis 
              label={{value: '%', position: 'insideTop', dx:-15, dy: -40}}
              width={50}
              dx={-20}
              stroke="1"
              type="number"
              domain={[0, 100]}
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
            />
            {barsList.map((bar) => (<Bar stackId="a" key={bar.dataKey} {...bar} />))}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "14px",
                lineHeight: "19px",
                bottom: "-10px",
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


export const ThermalComfortMainChart = ({ data = [], filters = {} }) => {
  
  const filteredData = data.filter((el) => {
    const isFalse = [];
    if (filters.activity && el.variable !== filters.activity) {
      isFalse.push('activity');
    }
    if (filters.gid && el.gid_code !== filters.gid) {
      isFalse.push('gid');
    }
    if (filters.month && el.month !== filters.month) {
      isFalse.push('gid');
    }
    return isFalse.length === 0;
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
    <div className={cx(styles['c-chart'], styles.withPadding, styles.climatology)}>
      <div className={styles.info}>
        i 
      </div>
      <h4>Thermal Comfort</h4>
      <ResponsiveContainer width="100%" height={330}>
      <LineChart
        data={filteredData.length > 0 ? filteredData : []}
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
        />
        <Line
          type="basis"
          name="(PET) Physiological Equivalent Temperature"
          dataKey="hour"
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
    </div>
  );
}
