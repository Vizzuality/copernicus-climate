/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { MAPBOX_STYLE_DEFAULT } from 'constants.js';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const DEFAULT_VIEWPORT = {
  zoom: 2,
  lat: 0,
  lng: 0
};

const MapComponent = props => {
  const {
    customClass,
    children,
    getCursor,
    dragPan,
    dragRotate,
    scrollZoom,
    touchZoom,
    touchRotate,
    doubleClickZoom,
    viewport,
    mapRef,
    mapContainerRef,
    onViewportChange,
    onResize,
    onLoad,
    flyToInterpolator,
    loaded,
    map,
    ...mapboxProps
  } = props;

  return (
    <div
      ref={mapContainerRef}
      className={classnames({
        'c-map': true,
        [customClass]: !!customClass
      })}
    >
      <ReactMapGL
        ref={mapRef}
        // CUSTOM PROPS FROM REACT MAPBOX API
        {...mapboxProps}
        mapStyle={MAPBOX_STYLE_DEFAULT}
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        // VIEWPORT
        {...viewport}
        width="100%"
        height="100%"
        // INTERACTIVE
        dragPan={dragPan}
        dragRotate={dragRotate}
        scrollZoom={scrollZoom}
        touchZoom={touchZoom}
        touchRotate={touchRotate}
        doubleClickZoom={doubleClickZoom}
        // DEFAULT FUNC IMPLEMENTATIONS
        onViewportChange={onViewportChange}
        onResize={onResize}
        onLoad={onLoad}
        getCursor={getCursor}
        transitionInterpolator={flyToInterpolator}
        transitionEasing={easeCubic}
      >
        {loaded && !!map && typeof children === 'function' && children(map)}
      </ReactMapGL>
    </div>
  );
};

MapComponent.propTypes = {
  /** An object that defines the viewport
   * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
   */
  viewport: PropTypes.shape({}),

  children: PropTypes.func /** A function that returns the map instance */,
  customClass: PropTypes.string /** Custom css class for styling */,
  bounds: PropTypes.shape({
    /** An object that defines the bounds */
    bbox: PropTypes.array,
    options: PropTypes.shape({})
  }),
  dragPan: PropTypes.bool /** A boolean that allows panning */,
  dragRotate: PropTypes.bool /** A boolean that allows rotating */,
  scrollZoom: PropTypes.bool /** A boolean that allows zooming */,
  touchZoom: PropTypes.bool /** A boolean that allows zooming */,
  touchRotate: PropTypes.bool /** A boolean that allows touch rotating */,
  doubleClickZoom: PropTypes.bool /** A boolean that allows double click zooming */,
  onLoad:
    PropTypes.func /** A function that exposes when the map is loaded. It returns and object with the `this.map` and `this.mapContainer` reference. */,
  onViewportChange: PropTypes.func /** A function that exposes the viewport */,
  getCursor: PropTypes.func /** A function that exposes the viewport */
};

MapComponent.defaultProps = {
  children: null,
  customClass: null,
  viewport: DEFAULT_VIEWPORT,
  bounds: {},
  dragPan: true,
  dragRotate: true,
  onViewportChange: () => {},
  onLoad: () => {},
  getCursor: ({ isHovering, isDragging }) => {
    if (isHovering) return 'pointer';
    if (isDragging) return 'grabbing';
    return 'grab';
  }
};

export default MapComponent;
