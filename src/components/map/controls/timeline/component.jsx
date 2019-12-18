/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Timestep } from 'vizzuality-components';
import Icon from 'components/icon';

import styles from './styles.module.scss';

const TimelineComponent = ({
  activeTab,
  setActiveTab,
  className,
  toggleTimelineSpeed,
  title,
  data,
  selectedSpeed,
  timelineParams,
  handleOnChange,
  hideHeader,
  hideTimeline,
  currentYear,
  years
}) => {
  return (
    <div className={cx(styles.container, className)}>
      {!hideHeader && data && (
        <div className={styles.header}>
          <button className={styles.infoButton}>
            <Icon name="icon-info" />
          </button>
          <span className={styles.title}>{title}</span>
          {Object.keys(data).length > 1 &&
            Object.keys(data).map(key => (
              <button
                key={key}
                id={key}
                className={cx(styles.tab, { [styles.activeTab]: key === activeTab })}
                onClick={() => setActiveTab(key)}
              >
                {data[key].name}
              </button>
            ))}
        </div>
      )}
      {!hideTimeline && (
        <div className={styles.timeline}>
          <Timestep
            key={activeTab}
            {...timelineParams}
            formatValue={value => {
              // FIXME: there a bug in the timestep component, this is the best way to make it work
              handleOnChange(value);
              return years && years[value];
            }}
          />
          <span className={styles.year}>{currentYear}</span>
          <button className={styles.speedButton} onClick={toggleTimelineSpeed}>
            {selectedSpeed.name}
          </button>
        </div>
      )}
    </div>
  );
};

TimelineComponent.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  className: PropTypes.string,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  data: PropTypes.object,
  hideHeader: PropTypes.bool,
  hideTimeline: PropTypes.bool,
  timelineParams: PropTypes.object,
  selectedSpeed: PropTypes.object,
  toggleTimelineSpeed: PropTypes.func,
  currentYear: PropTypes.number,
  setYearIndex: PropTypes.func,
  years: PropTypes.array
};

export default TimelineComponent;
