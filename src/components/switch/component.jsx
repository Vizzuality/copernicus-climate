import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const SwitchComponent = ({ name, value, checked, handleChange }) => {
  return (
    <label htmlFor={value} className={styles.switch}>
      <input
        id={value}
        type="checkbox"
        checked={checked}
        value={value}
        onChange={e => handleChange(e)}
      />
      <span className={styles.slider} />
      <span className={styles.labelText}>{name}</span>
    </label>
  );
};

SwitchComponent.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleChange: PropTypes.func
};

SwitchComponent.defaultProps = {
  name: '',
  checked: false,
  handleChange: () => {}
};

export default SwitchComponent;
