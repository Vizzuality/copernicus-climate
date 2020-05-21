import React, { useState } from 'react';
import Icon from 'components/icon';
import styles from './styles.module.scss';

const Dropdown = ({ 
  options = [],
  value = '',
  onChange = () => {}
 }) => {

  const [open, setOpen] = useState(false);

  const handleChange = (option) => {
    onChange(option);
    setOpen(false);
  }

  return  (
    <div className={styles.container}>
      <button onClick={() => setOpen(!open)} className={styles.drButton}>
        {value.label}
        <Icon name="icon-dropdown" />
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