import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Component from './component';

const LayerToggle = ({ theme }) => {
  const [toggleLayerActive, setToggleLayerActive] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <Component
      tooltipRef={tooltipRef}
      toggleLayerActive={toggleLayerActive}
      setToggleLayerActive={setToggleLayerActive}
      theme={theme}
    />
  );
};

LayerToggle.propTypes = {
  theme: PropTypes.string
};

export default LayerToggle;
