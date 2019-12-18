import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Icon from 'components/icon';
import styles from './styles.module.scss';

const FiltersComponent = ({
  startYear,
  setStartYear,
  setEndYear,
  setScenario,
  parsedYears,
  enabledStartYears,
  endYear,
  enabledEndYears,
  scenario,
  downloadUrl,
  parsedScenarios
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftAlign}>
        {startYear && (
          <Dropdown
            className={styles.dropdown}
            title={`From ${startYear}`}
            handleClick={option => setStartYear(option.value)}
            options={parsedYears}
            enabledOptions={enabledStartYears || parsedYears}
            noBorderLeft
          />
        )}
        {endYear && (
          <Dropdown
            className={styles.dropdown}
            title={`to ${endYear}`}
            handleClick={option => setEndYear(option.value)}
            options={parsedYears}
            enabledOptions={enabledEndYears || parsedYears}
          />
        )}
        {scenario && (
          <Dropdown
            className={styles.dropdownLarge}
            title={`Future scenarios: ${scenario &&
              parsedScenarios &&
              parsedScenarios.find(s => s.value === scenario).shortName}`}
            options={parsedScenarios}
            handleClick={option => setScenario(option.value)}
          />
        )}
      </div>
      {downloadUrl && (
        <div className={styles.rightAlign}>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className={styles.button}>
            <Icon name="icon-download" className={styles.icon} />
          </a>
        </div>
      )}
    </div>
  );
};

FiltersComponent.propTypes = {
  downloadUrl: PropTypes.string,
  startYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStartYear: PropTypes.func,
  setEndYear: PropTypes.func,
  setScenario: PropTypes.func,
  parsedYears: PropTypes.array,
  enabledStartYears: PropTypes.array,
  endYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enabledEndYears: PropTypes.array,
  scenario: PropTypes.string,
  parsedScenarios: PropTypes.array
};

export default FiltersComponent;
