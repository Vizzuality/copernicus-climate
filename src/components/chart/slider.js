import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Draggable from 'react-draggable';
import styles from './styles.module.scss';

const Slider = ({
  chartBox,
  coordinates = {},
  setCoordinates = () => {},
  onStopCallback = () => {}
}) => {
  const [bgWidth, setBgWidth] = useState({ right: 0, left: 0, center: 100 });
  const boxWidth = chartBox.current ? chartBox.current.offsetWidth : 100;

  const handleDrag = (e, data) => {
    const { x = 0 } = data;
    let setCoordinate = x;
    if (data.node.classList[0] === 'left' && x <= 0) {
      setCoordinate = 0;
    }
    if (data.node.classList[0] === 'right' && x >= 0) {
      setCoordinate = 0;
    }
    setCoordinates({ ...coordinates, [data.node.classList[0]]: setCoordinate });
  };

  const handleStop = (e, data) => {
    onStopCallback(bgWidth);
  };

  const bgControl = coordinates => {
    const width = {};
    Object.keys(coordinates).forEach(direction => {
      const x =
        coordinates[direction] > 0
          ? coordinates[direction]
          : coordinates[direction] * -1;
      const percent = (x * 100) / boxWidth;
      width[direction] = percent;
    });
    width['center'] = 100 - width.right - width.left;
    setBgWidth(width);
  };

  useEffect(() => {
    bgControl(coordinates);
    // ignoring bgControl as a dependency because we're not using useCallback
    // and it causes re-rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return (
    <>
      <div
        style={{ width: `${bgWidth.right}%` }}
        className={cx(styles.sliderBackground, styles.bgRight)}
      />
      <div
        style={{ width: `${bgWidth.center}%`, left: `${bgWidth.left}%` }}
        className={cx(styles.bgCenter)}
      />
      <div
        style={{ width: `${bgWidth.left}%` }}
        className={cx(styles.sliderBackground, styles.bgLeft)}
      />
      <Draggable
        axis="x"
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: coordinates.left, y: 0 }}
        handle=".left"
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div className={cx('left', styles.dotLeft)}>
          <span></span>
          <span></span>
        </div>
      </Draggable>
      <Draggable
        axis="x"
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: coordinates.right, y: 0 }}
        handle=".right"
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div className={cx('right', styles.dotRight)}>
          <span></span>
          <span></span>
        </div>
      </Draggable>
    </>
  );
};

export default Slider;
