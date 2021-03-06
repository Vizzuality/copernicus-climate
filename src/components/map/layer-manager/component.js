import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  LayerManager as VizzLayerManager,
  Layer
} from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import DEFAULT_PROVIDERS from './providers';

class LayerManager extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    layers: PropTypes.array
  };

  static defaultProps = { layers: [] };

  render() {
    const { map, layers } = this.props;

    // TODO: fix the source layer not changing on the map
    // console.log(
    //   layers.map(l => l.attributes.layerConfig.render.layers[0]['source-layer'])
    // );

    return (
      <VizzLayerManager
        map={map}
        plugin={PluginMapboxGl}
        providers={DEFAULT_PROVIDERS}
      >
        {layers.map(_layer => {
          return (
            <Layer
              key={_layer.id}
              {..._layer}
              {..._layer.attributes.layerConfig}
            />
          );
        })}
      </VizzLayerManager>
    );
  }
}

export default LayerManager;
