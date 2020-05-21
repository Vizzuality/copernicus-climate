/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Surface,
  ResponsiveContainer
} from 'recharts';
import cx from 'classnames';
// import Info from 'components/info';
import './styles.scss';

function CustomDot(props) {
  const { cx: x, cy: y, stroke } = props;
  return (
    <svg x={x - 10} y={y - 10} width={20} height={20} fill={stroke} viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="3" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

CustomDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  stroke: PropTypes.string
};

const CustomTooltip = props => {
  const { payload, label, metadata } = props;
  const { dataset, unit, model } = metadata || { dataset: 'Value' };
  return (
    <div className="custom-tooltip">
      <p className="label">{`${dataset} in ${label}`}</p>
      {payload &&
        payload
          // removing duplicates, e.g. line and area in biovars page
          .filter((key, index, self) => self.findIndex(_key => _key.name === key.name) === index)
          .map(p => (
            <p className="desc" key={p.name}>
              <svg height="6" width="6">
                <circle cx="3" cy="3" r="3" strokeWidth="0" fill={p.stroke || p.fill} />
              </svg>
              <span className="value">{`${model || p.name}: ${
                p.value && p.value.toFixed ? p.value.toFixed(2) : p.value
              }${p.unit || unit || ''}`}</span>
            </p>
          ))}
    </div>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  metadata: PropTypes.object
};

function CustomTick(props) {
  const { payload, index, y, ticks, unit, orientation } = props;
  const isY = orientation === 'vertical';
  let value;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(Number(payload.value))) value = payload.value;
  else if (payload.value > 100) value = payload.value.toFixed(0);
  else value = payload.value.toFixed(2);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <text {...props} y={isY ? y + 4 : y + 20} fill="#222222" dx={isY ? -16 : 0}>
      {value}
      {((ticks && ticks.length && index === ticks.length - 1) || // last tick or
        props.index >= 4) && // def bigger than 4 (accordion) -> add unit
        unit}
    </text>
  );
}

CustomTick.propTypes = {
  payload: PropTypes.object,
  index: PropTypes.number,
  y: PropTypes.number,
  ticks: PropTypes.array,
  unit: PropTypes.string,
  orientation: PropTypes.string
};

function CustomLegend(props) {
  const { payload, iconSize } = props;
  const SIZE = 32;
  const halfSize = SIZE / 2;
  const sixthSize = SIZE / 6;
  const thirdSize = SIZE / 3;
  const viewBox = { x: 0, y: 0, width: SIZE, height: SIZE };
  const svgStyle = { display: 'inline-block', verticalAlign: 'middle', marginRight: 4 };

  return (
    <ul className="custom-legend">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="legend-item">
          <Surface width={iconSize} height={iconSize} viewBox={viewBox} style={svgStyle}>
            <path
              strokeWidth={4}
              fill="none"
              stroke={entry.color}
              d={`M0,${halfSize}h${thirdSize}
										A${sixthSize},${sixthSize},0,1,1,${2 * thirdSize},${halfSize}
										H${SIZE}M${2 * thirdSize},${halfSize}
										A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
              className="recharts-legend-icon"
            />
          </Surface>
          {entry.value}
          {/* <Info infoKey={entry.value} /> */}
        </li>
      ))}
    </ul>
  );
}

CustomLegend.propTypes = {
  payload: PropTypes.object,
  iconSize: PropTypes.number
};

function Chart({ className, data, config, metadata }) {
  const { lines, areas, yAxis, xAxis, grid, showLegend, height, composedChart } = config;
  return (
    <div className={cx('c-chart', className)}>
      <ResponsiveContainer width="100%" height={height || 200}>
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          fontSize={14}
          fontFamily="Open Sans"
          {...composedChart}
        >
          <CartesianGrid {...grid} />
          <XAxis
            dataKey="name"
            tick={
              xAxis.customTick && (
                <CustomTick ticks={xAxis.ticks} unit={xAxis.unit} orientation="horizontal" />
              )
            }
            {...xAxis}
          />
          <YAxis
            type="number"
            tick={
              yAxis.customTick && (
                <CustomTick ticks={yAxis.ticks} unit={yAxis.unit} orientation="vertical" />
              )
            }
            {...yAxis}
          >
            {' '}
            {yAxis.content}{' '}
          </YAxis>
          <Tooltip
            // TODO: make it actually work
            isAnimationActive
            animationBegin={2000}
            content={<CustomTooltip metadata={metadata} />}
          />
          {showLegend && (
            <Legend align="right" layout="vertical" verticalAlign="top" content={CustomLegend} />
          )}
          {areas &&
            areas.map(area => (
              <Area
                type="monotone"
                key={area.key}
                dataKey={area.key}
                stroke={area.color}
                fill={area.color}
              />
            ))}
          {lines &&
            lines.map(line => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={3}
                dot={CustomDot}
              />
            ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  className: PropTypes.string,
  metadata: PropTypes.object
};

export default Chart;
