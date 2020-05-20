import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

import styles from './styles.module.scss';

const ZoomComponent = ({ zoomIn, zoomOut }) => (
  <>
    <button className={styles.mapNavigationButton} onClick={zoomIn}>
      <Icon name="icon-zoomin" className="menu-icon" />
    </button>
    <button className={styles.mapNavigationButton} onClick={zoomOut}>
      <Icon name="icon-zoomout" className="menu-icon" />
    </button>
  </>
);

ZoomComponent.propTypes = {
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func
};

export default ZoomComponent;
