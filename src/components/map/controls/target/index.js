import React from 'react';
import PropTypes from 'prop-types';
import Component from './component';

const Target = ({ viewport, setViewport }) => {
  const zoomIn = () => {
    const { zoom } = viewport;
    const newZoom = zoom + 1 <= 24 ? zoom + 1 : zoom;
    setViewport(vp => ({ ...vp, zoom: newZoom }));
  };

  const zoomOut = () => {
    const { zoom } = viewport;
    const newZoom = zoom >= 1 ? zoom - 1 : zoom;
    setViewport(vp => ({ ...vp, zoom: newZoom }));
  };

  return <Component zoomIn={zoomIn} zoomOut={zoomOut} />;
};

Target.propTypes = {
  viewport: PropTypes.object,
  setViewport: PropTypes.func
};

export default Target;
