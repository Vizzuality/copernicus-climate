import React from 'react';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from 'components/icon';
import { COUNTRIES } from 'constants.js';
import styles from './styles.module.scss';
import ReactSelect from 'react-select';
import { searchSelectStyles } from './styles';


const SubHeader = () => {

  const optionsCountry = [
    { value: 'Bizkaia', label: 'Bizkaia' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const optionsTime = [
    { value: 'historical', label: 'Historical' },
    { value: 'futurelongterm', label: 'Future Long-Term' },
    { value: 'seasonal', label: 'Seasonal' }
  ];
  
  return (
    <div className={styles.cSubheader}>
      <div className={styles.container}>

        <h1 className={styles.title}>Climate Change Dashboards for Decision Makers</h1>
        <div className={styles.filterSection}>
          <ReactSelect
            styles={searchSelectStyles}
            defaultValue={optionsCountry[0]}
            options={optionsCountry}
            isIcon
          />
        </div>
        <div className={styles.filterSection}>
          <ReactSelect
            styles={searchSelectStyles}
            defaultValue={optionsTime[0]}
            options={optionsTime}
          />
        </div>
        {/* <ul className={styles.subMenu}>
          {subMenu.map((s, key) => (
            <li key={key} className={cx(styles.menuItem, { [styles.active]: s.active })}>
              {s.path ? <Link to={s.path}>{s.name}</Link> : <>{s.name}</>}
              {s.sections && s.sections.length > 0 && (
                <>
                  <Icon name="icon-triangle" />
                  <ul>
                    {s.sections.map((sec, sKey) => (
                      <li key={sKey} className={sec.active ? styles.active : ''}>
                        <Link to={sec.path}>{sec.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default SubHeader;
