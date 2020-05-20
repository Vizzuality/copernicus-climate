import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

import styles from './styles.module.scss';

const TargetComponent = ({ zoomIn, zoomOut }) => (
  <>
    <button className={styles.mapNavigationButton} onClick={zoomIn}>
      <Icon name="icon-target" className="menu-icon" />
    </button>
  </>
);

TargetComponent.propTypes = {
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func
};

export default TargetComponent;
