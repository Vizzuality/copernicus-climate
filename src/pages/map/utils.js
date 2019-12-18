import { uniqBy, minBy, maxBy, orderBy } from 'lodash';

const getUniqueYears = allYears => uniqBy(allYears, 'year');

export const getYearsForScenario = (sc, allScenarios) => {
  const scenarioYears = allScenarios.find(s => s.key === sc).countryBiovarDistributions;
  const uniqueYears = scenarioYears && getUniqueYears(scenarioYears);
  return uniqueYears;
};

export const getYearsRange = y => {
  const earliestYear = minBy(y, 'year');
  const latestYear = maxBy(y, 'year');
  return {
    earliest: earliestYear && earliestYear.year,
    latest: latestYear && latestYear.year
  };
};

export const getEarliestAndLatestYears = (sc, scos) => {
  const scenarioYears = getYearsForScenario(sc, scos);
  const { earliest, latest } = getYearsRange(scenarioYears);

  return {
    earliest,
    latest
  };
};

export const parseYears = uniqueYears => {
  const parsed = uniqueYears.map(o => ({
    label: o.year,
    value: o.year
  }));
  const ordered = parsed && orderBy(parsed, 'value');
  return ordered;
};

export const getYears = sc => {
  const scenarioYears = sc.countryBiovarDistributions;
  return (
    scenarioYears &&
    uniqBy(scenarioYears, 'year')
      .map(({ year }) => year)
      .filter(year => year !== 1995)
      .sort()
  );
};

export const getBuckets = array => {
  const sortedValues = array.map(({ value }) => value).sort((a, b) => a - b);
  return [
    sortedValues[0],
    sortedValues[Math.round((sortedValues.length - 1) / 2)],
    sortedValues[sortedValues.length - 1]
  ];
};
