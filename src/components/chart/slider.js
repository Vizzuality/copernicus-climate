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
  const [bgWidth, setBgWidth] = useState({ right: 0, left: 0 });
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
    setCoordinates({ ...coordinates, [data.node.classList[0]]: setCoordinate })
  };

  const handleStop = (e, data) => {
    onStopCallback(bgWidth);
  }

  const bgControl = (coordinates) => {
    const width = {};
    Object.keys(coordinates).forEach((direction) => {
      const x = coordinates[direction] > 0 ? coordinates[direction] : coordinates[direction] * -1;
      const percent = x * 100 / boxWidth;
      width[direction] = percent;
    })
    setBgWidth(width)
  }

  useEffect(() => {
    bgControl(coordinates);    
  }, [coordinates]);

  return (
    <>
      <div style={{ width: `${bgWidth.right}%`}} className={cx(styles.sliderBackground, styles.bgRight)} />
      <div style={{ width: `${bgWidth.left}%`}} className={cx(styles.sliderBackground, styles.bgLeft)} />
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
        defaultPosition={{x: 0, y: 0}}
        position={{ x: coordinates.right, y: 0 }}
        handle=".right"
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div className={cx('right', styles.dotRight)} >
          <span></span>
          <span></span>
        </div>
      </Draggable>
    </>
  );
}

export default Slider;