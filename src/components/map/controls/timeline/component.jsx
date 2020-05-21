/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
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
  years,
  clickOnInfo
}) => {
  const dataKeys = data ? Object.keys(data) : [];

  return (
    <div className={cx(styles.container, className)}>
      {!hideHeader && data && (
        <div className={styles.header}>
          <button className={styles.infoButton} onClick={clickOnInfo}>
            <Icon name="icon-info" />
          </button>
          <span className={styles.title}>{title}</span>
          <div className={styles.switchBlock}>
            {dataKeys.length > 1 &&
              dataKeys.map((key, n) => {
                return (
                  <Fragment key={key}>
                    <button
                      id={key}
                      className={cx(styles.tab, { [styles.activeTab]: key === activeTab })}
                      onClick={() => setActiveTab(key)}
                    >
                      {data[key].name}
                    </button>
                    {n === 0 && (
                      <Switch
                        onChange={() => setActiveTab(activeTab === key ? dataKeys[n + 1] : key)}
                        checked={key !== activeTab}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        offColor="#941333"
                        onColor="#941333"
                        offHandleColor="#FFFFFF"
                        onHandleColor="#FFFFFF"
                        height={16}
                        width={31}
                        handleDiameter={12}
                      />
                    )}
                  </Fragment>
                );
              })}
          </div>
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
  years: PropTypes.array,
  clickOnInfo: PropTypes.func
};

export default TimelineComponent;
