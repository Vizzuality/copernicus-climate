import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { COUNTRIES, OPTIONS_TIME } from 'constants.js';
import styles from './styles.module.scss';
import ReactSelect from 'react-select';
import { searchSelectStyles } from './styles';

const SubHeader = () => {
  const history = useHistory();
  const match = useRouteMatch('/:iso/:time/:type?');
  const { 
    iso = COUNTRIES[0].iso, 
    time = OPTIONS_TIME[0].value, 
    type = 'heatwaves',
  } = (match && match.params) || {};

  const optionsCountry = COUNTRIES.map((c) => {
    return {
      value: c.iso,
      label: c.name
    }
  });

  const handleChangeCountry = (option) => {
    history.push(`/${option.value}/${time}/${type}`);
  }
  const handleChangeTime = (option) => {
    history.push(`/${iso}/${option.value}/${type}`);
  }
  
  return (
    <div className={styles.cSubheader}>
      <div className={styles.container}>
        <h1 className={styles.title}>Climate Change Dashboards for Decision Makers</h1>
        <div className={styles.filterSection}>
          <ReactSelect
            styles={searchSelectStyles}
            defaultValue={optionsCountry.find(c => c.value === iso) || optionsCountry[0]}
            options={optionsCountry}
            onChange={handleChangeCountry}
            isIcon
          />
        </div>
        <div className={styles.filterSection}>
          <ReactSelect
            styles={searchSelectStyles}
            defaultValue={OPTIONS_TIME.find(t => t.value === time) || OPTIONS_TIME[0]}
            options={OPTIONS_TIME}
            onChange={handleChangeTime}
          />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
