import React from 'react';
import Icon from 'components/icon';
import Switch from 'components/switch';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const LayersToggleModalComponent = ({ handleCloseModal, data }) => {
  return (
    <div className={styles.toggleLayerModal}>
      <div className={styles.header}>
        <span className={styles.title}>ADD LAYERS TO THE MAP</span>
        <button onClick={handleCloseModal}>
          <Icon name="icon-close" />
        </button>
      </div>
      <div className={styles.content}>
        {data &&
          data.map((
            group // render each layers group separately [land use & plantations], spacer [labels & admin]
          ) => (
            <>
              {group.map(({ value, checked, handleChange, name }) => (
                <Switch
                  key={value}
                  value={value}
                  checked={checked}
                  handleChange={() => handleChange({ [value]: !checked })}
                  name={name}
                />
              ))}
              <div className={styles.spacer} />
            </>
          ))}
      </div>
    </div>
  );
};

LayersToggleModalComponent.propTypes = {
  data: PropTypes.array,
  handleCloseModal: PropTypes.func
};

export default LayersToggleModalComponent;
