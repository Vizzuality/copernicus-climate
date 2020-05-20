/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Component from './component';

import styles from './styles.module.scss';

const Timeline = ({
  data,
  yearIndex,
  activeTab,
  setActiveTab,
  className,
  title,
  handleOnChange,
  hideHeader,
  hideTimeline,
  clickOnInfo
}) => {
  const activeScenario = data && activeTab && data[activeTab];
  const { start, end, step, years } = activeScenario || {};

  const [speedIndex, setSpeedIndex] = useState(0);

  const timelineSpeedMap = [
    { name: 'x1', value: 2000 },
    { name: 'x2', value: 1000 },
    { name: 'x4', value: 500 }
  ];

  const toggleTimelineSpeed = () => {
    const nextIndex = timelineSpeedMap.length === speedIndex + 1 ? 0 : speedIndex + 1;
    setSpeedIndex(nextIndex);
  };

  const timelineParams = {
    canPlay: true,
    min: start,
    max: end,
    minAbs: start,
    maxAbs: end,
    start,
    end: yearIndex,
    trim: end + 1,
    speed: timelineSpeedMap[speedIndex].value,
    step: step || 1,
    handleStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      border: '2px solid white',
      borderTopWidth: '5px',
      borderBottomWidth: '5px',
      height: '16px',
      transform: 'translateX(2px)',
      width: '6px',
      zIndex: 2
    },
    trackStyle: {
      backgroundColor: '#DF5127',
      borderRadius: '0',
      height: '6px'
    },
    railStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      height: '6px'
    },
    range: false,
    customClass: styles.legendItemTimeStep
  };

  const currentYear = years && years[yearIndex];

  return (
    <Component
      timelineSpeed={toggleTimelineSpeed}
      toggleTimelineSpeed={toggleTimelineSpeed}
      timelineSpeedMap={timelineSpeedMap}
      data={data}
      title={title}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      className={className}
      selectedSpeed={timelineSpeedMap[speedIndex] || timelineSpeedMap[0]}
      handleOnChange={handleOnChange}
      hideHeader={hideHeader}
      hideTimeline={hideTimeline}
      timelineParams={timelineParams}
      currentYear={currentYear}
      years={years}
      clickOnInfo={clickOnInfo}
    />
  );
};

Timeline.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  className: PropTypes.string,
  handleOnChange: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideTimeline: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.object,
  clickOnInfo: PropTypes.func,
  yearIndex: PropTypes.number
};

Timeline.defaultProps = {
  handleOnChange: () => {},
  hideHeader: false,
  hideTimeline: false,
  clickOnInfo: () => {}
};

export default Timeline;
