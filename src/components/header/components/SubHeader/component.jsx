import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { GIDS, OPTIONS_TIME } from 'const/constants';
import styles from './styles.module.scss';
import ReactSelect from 'react-select';
import { searchSelectStyles } from './styles';

const SubHeader = () => {
  const history = useHistory();
  const match = useRouteMatch('/:gid/:period/:type?');
  const {
    gid = GIDS[0].gid,
    period = OPTIONS_TIME[0].value,
    type = 'heatwaves'
  } = (match && match.params) || {};

  const optionsGids = GIDS.map(g => {
    return {
      value: g.gid,
      label: `${g.geoname} (${g.gid})`
    };
  });

  const handleChangeGid = option => {
    history.push(`/${option.value}/${period}/${type}`);
  };

  const handleChangeTime = option => {
    history.push(`/${gid}/${option.value}/${type}`);
  };

  return (
    <div className={styles.cSubheader}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          {/* link to https://climate.copernicus.eu/thermal-assessment-tool ? */}
          <h1 className={styles.title}>Thermal Assessment Tool</h1>
        </div>
        <div className={styles.filters}>
          <div className={styles.filterSection}>
            <ReactSelect
              styles={searchSelectStyles}
              defaultValue={
                optionsGids.find(c => c.value === gid) || optionsGids[0]
              }
              options={optionsGids}
              onChange={handleChangeGid}
              isIcon
            />
          </div>
          <div className={styles.filterSection}>
            <ReactSelect
              styles={searchSelectStyles}
              defaultValue={
                OPTIONS_TIME.find(t => t.value === period) || OPTIONS_TIME[0]
              }
              value={
                OPTIONS_TIME.find(t => t.value === period) || OPTIONS_TIME[0]
              }
              options={OPTIONS_TIME}
              onChange={handleChangeTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
