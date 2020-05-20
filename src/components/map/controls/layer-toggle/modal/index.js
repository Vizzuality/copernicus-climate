import React, { useState, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { useQueryParams, setQueryParams } from 'url.js';

import Component from './component';

const LayersToggleModal = ({ tooltipRef }) => {
  const [checked, setChecked] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const currentQueryParams = useQueryParams();
  const { admin, label } = currentQueryParams;

  const layersData = useMemo(() => {
    return {
      // converts URL params value from string to bool or sets true as default when no value provided
      label: label ? label === 'true' : true,
      admin: admin ? admin === 'true' : true
    };
  }, [label, admin]);

  const updateParams = params => {
    setQueryParams({ ...currentQueryParams, ...params }, location, history);
  };

  const handleCloseModal = () => {
    const { current } = tooltipRef;
    if (current) current.tooltipRef = null; // force hiding the tooltip, more about this workaround here: https://github.com/wwayne/react-tooltip/issues/449#issuecomment-514768776
    ReactTooltip.hide();
  };

  const data = [
    [
      {
        value: 'landUse', // it's also a param's name (key) in URL
        checked: false,
        handleChange: () => {},
        name: 'Land use'
      },
      {
        value: 'plantations', // it's also a param's name (key) in URL
        checked: false,
        handleChange: () => {},
        name: 'Plantations'
      }
    ],
    [
      {
        value: 'label', // it's also a param's name (key) in URL
        checked: layersData.label,
        handleChange: updateParams,
        name: 'Labels'
      },
      {
        value: 'admin', // it's also a param's name (key) in URL
        checked: layersData.admin,
        handleChange: updateParams,
        name: 'Admin'
      }
    ]
  ];

  return (
    <Component
      checked={checked}
      setChecked={setChecked}
      handleCloseModal={handleCloseModal}
      data={data}
    />
  );
};

LayersToggleModal.propTypes = {
  tooltipRef: PropTypes.object
};

export default LayersToggleModal;
