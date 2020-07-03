import React, { useState } from 'react';
import Icon from 'components/icon';
import cx from 'classnames';
import styles from './styles.module.scss';

const isRadio = false;

const LayerLegend = ({ attributes = {}, id = '' }) => {
  const { legendConfig = {}, name = '' } = attributes;
  const { items = [] } = legendConfig;
  const sectionSize = 100 / (items.length - 2);
  const values = {
    min: '',
    max: '',
  }
  const gradient = items.map((i, n) => {    
    let percent = sectionSize * n; 
    if (n === 0 ) {
      percent = 0;
      values.min = i.name;
    } else if (n === items.length - 1 ) {
      percent = 100;
      values.max = i.name;
    }
    return `${i.color} ${percent}%`;
  }).join(',');
  return (
    <div className={styles.layer}>
      {isRadio && (
        <div className={styles.radio}>
          <input id={`${id}-legend`} type="radio" name="legend" value={id} />
          <label htmlFor={`${id}-legend`} />
        </div>
      )} 
      <div className={styles.stats}>
        <div className={styles.title}>{name}</div>
        <div className={styles.line} style={{ background: `linear-gradient(90deg, ${gradient})` }} />
        <div className={styles.values}>
          <span>{values.min}</span>
          <span>{values.max}</span>
        </div>
      </div>
    </div>
  );
}

const Legend = ({ layers = [] }) => {

  const [isOpen, setOpen] = useState(true);

  return (
    <div className={styles.legend}>
      <div className={styles.legendContent}>
        <button
          onClick = {() => setOpen(!isOpen)}
          className={cx(styles.legendButton, { [styles.isOpen]: isOpen })}
        >
          Legend
          <Icon name="icon-dropdown" />
        </button>
        {isOpen && (
          <div className={styles.layers}>
            {layers && layers.length > 0 && layers.map(l => <LayerLegend key={l.id} {...l} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Legend;
