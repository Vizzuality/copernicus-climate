import React from 'react';
import { HEATWAVES, COLDSNAPS, THERMALCOMFORT, PERIOD_FUTURE_LONGTERM, PERIOD_HISTORICAL } from 'const/constants';

const Description = ({
  theme,
  params = {},
  gidInfo = {},
  thermalValues = {},
  isPet = false,
  petValues = {},
  period,
}) => {
  const { 
    from,
    to,
    alarmsCount,
    alertsCount,
    warningsCount,
    extreamCount,
    strongCount,
    moderateCount,
    temperature,
    temperatureDate,
    month,
    alarmsDev,
    alertsDev,
    warningsDev,
    temperatureDev
  } = params;

  const currentYear = Number((new Date()).getFullYear());

  return (
    <>
    {(theme === HEATWAVES || theme === COLDSNAPS) && (
      <>
        From {from} to {to} {` `} 
        <span>{alarmsCount}{alarmsDev ? ` ± ${alarmsDev.toFixed(0)}` : ''} alarms</span>,{` `}
        <span>{alertsCount}{alertsDev ? ` ± ${alertsDev.toFixed(0)}` : ''} alerts</span>{` `}
        and <span>{warningsCount}{warningsDev ? ` ± ${warningsDev.toFixed(0)}` : ''} warnings</span>
        {period === PERIOD_HISTORICAL && (
          <>
            , and <span>{extreamCount} extreme</span>,{` `}
            <span>{strongCount} strong</span>{` `}
            and <span>{moderateCount} moderate heat stress events</span>{` `}
          </>
        )}
        {period === PERIOD_FUTURE_LONGTERM ? ' are predicted in ' : ' were observed in '}
        {` `}
        <span>{gidInfo.geoname}</span>. {` `}
        The {theme === HEATWAVES ? 'highest' : 'lowest'} temperature of {` `}
        <span>{temperature}{temperatureDev ? ` ± ${temperatureDev.toFixed(2)}` : ''}</span> ºC {` `}
        {period === PERIOD_FUTURE_LONGTERM ? 'will be in ' : 'was observed in '}
        {` `}

        <span>{temperatureDate}</span>.
        {period === PERIOD_FUTURE_LONGTERM && (
          <>
            {` `}This data is based on the <span>RCP 8.5</span> scenario.
          </>
        )}
      </>
    )}
    {theme === THERMALCOMFORT && (
      <>
        Between {` `}
        <span>{currentYear - 15}</span> and{` `}
        <span>{currentYear}</span> {month}{` `}
        was characterised by{` `}
        <span>{thermalValues.min || ''}</span> to{` `}
        <span>{thermalValues.max || ''}</span>{` `}
        for an adult with <span>medium clothing doing moderate activity</span> in {` `}
        <span>{gidInfo.geoname}</span>. {` `}
      </>
    )}
    {isPet && (
      <>
       On <span>15th of {petValues.month} 2018</span> the highest PET value of {` `}
       <span>{petValues.max}</span> for an {` `}
       <span>{petValues.age ? petValues.age.toLowerCase() : null}</span> wearing {` `}
       <span>{petValues.clothing ? petValues.clothing.toLowerCase() : null}</span> clothing {` `}
       <span>{petValues.activity ? petValues.activity.toLowerCase() : null}</span> in {` `}
       <span>{gidInfo.geoname}</span> was observed at {` `}
       <span>{petValues.hour} GMT</span> {` `}
      </>
    )}
    </>
  )
}

export default Description;