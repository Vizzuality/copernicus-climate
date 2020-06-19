import React, { useState } from 'react';
import Icon from 'components/icon';
import styles from './styles.module.scss';
import cx from 'classnames';

const Dropdown = ({ 
  options = [],
  value = '',
  onChange = () => {},
  mode = 'standart',
 }) => {

  const [open, setOpen] = useState(false);

  const handleChange = (option) => {
    onChange(option);
    setOpen(false);
  }

  return  (
    <div className={cx(styles.container, { [styles.calendar]: mode === 'calendar' })}>
      <button onClick={() => setOpen(!open)} className={styles.drButton}>
        {value.label}
        {mode === 'standart' && <Icon name="icon-dropdown" /> }
        {mode === 'calendar' && <Icon name="icon-calendar" /> }
      </button>
      {open && options && options.length > 0 && (
        <ul className={styles.drMenu}>
          {options.map(op => (
            <li key={op.value} onClick={() => handleChange(op)}>{op.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;