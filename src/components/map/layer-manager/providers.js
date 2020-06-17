import { fetch } from 'utils/request';
import omit from 'lodash/omit';

export default {
  'carto-skydipper': (layerModel, layer, resolve, reject) => {
    const { interactivity, source } = layerModel;
    const { provider } = source;

    const layerTpl = JSON.stringify({
      version: '1.3.0',
      stat_tag: 'API',
      layers: provider.layers.map(l => {
        if (!!interactivity && interactivity.length) {
          return { ...l, options: { ...l.options, interactivity } };
        }
        return l;
      })
    });

    const apiParams = {
      stat_tag: 'API',
      config: encodeURIComponent(layerTpl),
      ...(provider.api_key && { api_key: provider.api_key })
    };
    const apiParamsString = Object.keys(apiParams)
      .map(k => `${k}=${apiParams[k]}`)
      .join('&');
    const url = `http://35.233.41.65/user/${provider.account}/api/v1/map?${apiParamsString}`;

    fetch('get', url, {}, layerModel)
      .then(response => {
        const tiles = response.metadata.tilejson.vector.tiles;      
        return resolve({
          ...layer,
          source: {
            ...omit(layer.source, 'provider'),
            tiles: tiles,
          }
        });
      })
      .catch(err => reject(err));
  }
};