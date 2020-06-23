import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LayerManager as VizzLayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import DEFAULT_PROVIDERS from './providers';

// utils
import CANVAS_DECODERS from 'utils/layers/canvas-decoders';

class LayerManager extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    layers: PropTypes.array
  }

  static defaultProps = { layers: [] }

  render() {
    const {
      map,
      layers
    } = this.props;

    return (
      <VizzLayerManager
        map={map}
        plugin={PluginMapboxGl}
        providers={DEFAULT_PROVIDERS}
      >
        {layers.map(_layer => {
          // console.log(_layer);
          // delete _layer.attributes.layerConfig.sqlParams;
          return (
            <Layer
              {..._layer}
              key={_layer.id}
              // {..._layer}
              {..._layer.attributes.layerConfig}
              // type="vector"
            />
          );
        })}
      </VizzLayerManager>
    );
  }
}

export default LayerManager;
