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
} from 'recharts';
import styles from './styles.module.scss';
import { riskAreas, termalAreas } from './const';
import { HEATWAVES } from 'constants.js';


export const TermalComfortChart = ({ data = [], theme = HEATWAVES }) => {
  const areasList = termalAreas[theme];
  return (
    <div className={styles['c-chart']}>
      <h4>Termal Comfort</h4>
      <ResponsiveContainer width="100%" height={52}>
      <AreaChart
        data={data.length > 0 ? data : []}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
  );
}


export const RiskEventsChart = ({ data = [], theme = HEATWAVES }) => {

  const areasList = riskAreas[theme];

  return (
    <div className={styles['c-chart']}>
      <h4>Risk Events</h4>
      <ResponsiveContainer width="100%" height={52}>
      <AreaChart
        data={data.length > 0 ? data : []}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
  );
}

export const TemparatureChart = ({ data = [] }) => {
  
  return (
    <div className={styles['c-chart']}>
      <ResponsiveContainer width="100%" height={230}>
      <LineChart
        data={data.length > 0 ? data : []}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
}