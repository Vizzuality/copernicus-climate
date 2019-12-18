import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import LayersToggleModal from './modal';

import styles from './styles.module.scss';

const LayerToggleComponent = ({ tooltipRef, toggleLayerActive, setToggleLayerActive, theme }) => {
  const { layerToggleModalHeight, navigationButtonSize } = styles;

  return (
    <div className={cx(styles.layerToggle, theme)}>
      <button
        data-for="layerTootlip"
        className={styles.mapNavigationButton}
        data-tip=""
        style={{ filter: toggleLayerActive ? 'invert(1)' : 'unset' }}
      >
        <Icon name="icon-stack" />
      </button>
      <ReactTooltip
        id="layerTootlip"
        ref={tooltipRef}
        clickable
        className="layerTooltip"
        effect="solid"
        globalEventOff="click"
        event="click"
        place="right"
        afterShow={() => setToggleLayerActive(true)}
        afterHide={() => setToggleLayerActive(false)}
        offset={{ right: 1, bottom: layerToggleModalHeight / 2 - navigationButtonSize / 2 }} // bottom: 240px/2 - 45px/2 = 98px <=> (modal height / 2) - (toggle button height / 2), right: 1 <=> avoid overlapping modal with button border
      >
        <LayersToggleModal tooltipRef={tooltipRef} />
      </ReactTooltip>
    </div>
  );
};

LayerToggleComponent.propTypes = {
  tooltipRef: PropTypes.object,
  toggleLayerActive: PropTypes.bool,
  setToggleLayerActive: PropTypes.func,
  theme: PropTypes.string
};

export default LayerToggleComponent;
