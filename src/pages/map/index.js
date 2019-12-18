import React, { useMemo, useEffect, useState } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useQueryParams, setQueryParams } from 'url.js';
import { COUNTRIES_DEFAULT_VIEWPORTS, DEFAULT_LAYER_OPACITY } from 'constants.js';
import { Label } from 'recharts';
import sortBy from 'lodash/sortBy';

import {
  getYearsForScenario,
  getYearsRange,
  getEarliestAndLatestYears,
  parseYears,
  getYears
} from './utils';
import Component from './component';

import styles from './styles.module.scss';

const Container = () => {
  // location, query params
  const match = useRouteMatch('/:country');
  const location = useLocation();
  const history = useHistory();

  const { country } = (match && match.params) || {};
  const currentQueryParams = useQueryParams();
  const { startYear, endYear, scenario, biovar, opacity } = currentQueryParams;
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  const [yearIndex, setYearIndex] = useState(0);

  const layerOpacity = useMemo(() => {
    return opacity && Number(opacity) ? Number(opacity) / 100 : DEFAULT_LAYER_OPACITY / 100;
  }, [opacity]);

  // graphql
  const data = null;

  useEffect(() => setViewport(COUNTRIES_DEFAULT_VIEWPORTS[country]), [country]);

  // parsing
  const scenarios = data && data.scenarios && data.scenarios.filter(s => s.key !== 'current');
  const parsedScenarios =
    scenarios &&
    sortBy(
      scenarios.map(sc => ({
        label: `${sc.name} - ${sc.shortName}`,
        value: sc.key,
        name: sc.name,
        shortName: sc.shortName
      })),
      'value'
    );

  // timeline data
  const timelineData =
    scenarios &&
    scenarios.reduce((acc, sc) => {
      const years = getYears(sc);
      const startIndex = years.indexOf(Number(startYear));
      const endIndex = years.indexOf(Number(endYear));

      return {
        ...acc,
        [sc.key]: {
          name: sc.name,
          start: startIndex !== -1 ? startIndex : 0,
          end: endIndex !== -1 ? endIndex : years.length - 1,
          years,
          step: 1
        }
      };
    }, {});

  // computed properties
  const chosenScenario = useMemo(
    () =>
      parsedScenarios && parsedScenarios.length
        ? scenario || (parsedScenarios[1] && parsedScenarios[1].value)
        : '',
    [parsedScenarios, scenario]
  );

  const years = useMemo(
    () => scenarios && chosenScenario && getYearsForScenario(chosenScenario, scenarios),
    [scenarios, chosenScenario]
  );
  const parsedYears = useMemo(() => years && parseYears(years), [years]);

  const chosenStartYear = useMemo(
    () =>
      scenarios && scenarios.length && chosenScenario
        ? startYear || getEarliestAndLatestYears(chosenScenario, scenarios).earliest
        : '',
    [scenarios, chosenScenario, startYear]
  );
  const chosenEndYear = useMemo(
    () =>
      scenarios && scenarios.length && chosenScenario
        ? endYear || getEarliestAndLatestYears(chosenScenario, scenarios).latest
        : '',
    [scenarios, chosenScenario, endYear]
  );

  const enabledStartYears = useMemo(
    () => parsedYears && parsedYears.filter(o => o.value <= chosenEndYear),
    [parsedYears, chosenEndYear]
  );
  const enabledEndYears = useMemo(
    () => parsedYears && parsedYears.filter(o => o.value >= chosenStartYear),
    [parsedYears, chosenStartYear]
  );

  // url query params setters
  const setStartYearQuery = year =>
    setQueryParams({ ...currentQueryParams, startYear: year }, location, history);
  const setEndYearQuery = year =>
    setQueryParams({ ...currentQueryParams, endYear: year }, location, history);
  const setScenario = sc => {
    const scenarioYears = getYearsForScenario(sc, scenarios);
    const { earliest, latest } = getYearsRange(scenarioYears);
    setQueryParams({ scenario: sc, startYear: earliest, endYear: latest }, location, history);
  };
  const setBiovarQuery = bv =>
    setQueryParams({ ...currentQueryParams, biovar: bv }, location, history);

  // callbacks
  const setStartYear = year => {
    setStartYearQuery(year);
  };

  const setEndYear = year => {
    setEndYearQuery(year);
  };

  const filters = {
    biovar,
    setBiovar: setBiovarQuery,
    startYear: String(chosenStartYear),
    setStartYear,
    setEndYear,
    setScenario,
    parsedYears,
    enabledStartYears,
    endYear: String(chosenEndYear),
    enabledEndYears,
    scenario: chosenScenario,
    parsedScenarios
  };

  const getChartConfig = unit => {
    return {
      lines: [
        {
          key: 'value',
          color: styles.colorPink
        }
      ],
      areas: [
        {
          key: 'value',
          color: styles.colorPink
        }
      ],
      yAxis: {
        domain: ['auto', 'auto'],
        interval: 'preserveEnd',
        customTick: true,
        tickSize: 0,
        axisLine: false,
        content: <Label value={unit} position="insideTop" dx={6} dy={-40} fill="#222" />
      },
      xAxis: {
        customTick: true,
        tickSize: 0,
        padding: { left: -30, right: -30 }
      },
      grid: {
        vertical: false
      },
      composedChart: {
        margin: { top: 40, right: 40, left: 0, bottom: 0 }
      },
      height: 300
    };
  };

  if (chosenStartYear && chosenEndYear && country && chosenScenario) {
    return (
      <Component
        data={null}
        filters={filters}
        getConfig={getChartConfig}
        timelineData={timelineData}
        viewport={viewport}
        setViewport={setViewport}
        country={country}
        yearIndex={yearIndex}
        setYearIndex={setYearIndex}
        // fetching={fetching}
        opacity={layerOpacity}
      />
    );
  }
  return null;
};

export default Container;
