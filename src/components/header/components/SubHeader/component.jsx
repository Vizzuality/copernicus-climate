import React from 'react';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from 'components/icon';
import { COUNTRIES } from 'constants.js';
import styles from './styles.module.scss';
import ReactSelect from 'react-select';
import { searchSelectStyles } from './styles';


const SubHeader = () => {

  const { pathname } = useLocation();

  // const optionsCountry = [
  //   { value: 'Bizkaia', label: 'Bizkaia' },
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ];

  const optionsCountry = COUNTRIES.map((c) => {
    return {
      value: c.iso,
      label: c.name
    }
  });

  const optionsTime = [
    { value: 'historical', label: 'Historical' },
    { value: 'futurelongterm', label: 'Future Long-Term' },
    { value: 'seasonal', label: 'Seasonal' }
  ];

  const time = 'historical';
  const type = 'heatwaves';
  
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
      </div>
    </div>
  );
};

export default SubHeader;
