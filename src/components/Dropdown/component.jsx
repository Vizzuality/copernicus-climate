import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/icon';
import styles from './styles.module.scss';
import cx from 'classnames';

const Dropdown = ({ 
  options = [],
  value = '',
  onChange = () => {},
  mode = 'standart',
  label,
  block = false,
 }) => {

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleChange = (option) => {
    onChange(option);
    setOpen(false);
  }

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return  (
    <div 
      ref={ref}
      className={
        cx(
          styles.container, 
          { [styles.calendar]: mode === 'calendar' },
          { [styles.light]: mode === 'light' },
          { [styles.block]: block },
          { [styles.label]: label },
        )
      }
    >
      {label && (
        <label>
          {label}
        </label>
      )}
      <button onClick={() => setOpen(!open)} className={styles.drButton}>
        {value.label}
        {mode === 'standart' && <Icon name="icon-dropdown" /> }
        {mode === 'light' && <Icon name="icon-dropdown" /> }
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