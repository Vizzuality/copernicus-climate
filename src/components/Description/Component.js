import React from 'react';
import { HEATWAVES, COLDSNAPS, TERMALCOMFORT } from 'const/constants';

const Description = ({ theme, params, gidInfo, thermalValues = {} }) => {

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
    month
  } = params;

  const currentYear = Number((new Date()).getFullYear());

  return (
    <>
    {theme === HEATWAVES || theme === COLDSNAPS && (
      <>
        From {from} to {to} {` `}
        <span>{alarmsCount} alarms</span>,{` `}
        <span>{alertsCount} alerts</span>{` `}
        and <span>{warningsCount} warnings</span>,{` `}
        and <span>{extreamCount} extreme</span>,{` `}
        <span>{strongCount} strong</span>{` `}
        and <span>{moderateCount} moderate heat stress events</span> were observed in{` `}
        <span>{gidInfo.geoname}</span>. {` `}
        The {theme === HEATWAVES ? 'highest' : 'lowest'} highest temperature of {` `}
        <span>{temperature}</span> ºC was observed in {` `}
        <span>{temperatureDate}</span>.
      </>
    )}
    {theme === TERMALCOMFORT && (
      <>
        Between {` `}
        <span>{currentYear - 15}</span> and{` `}
        <span>{currentYear}</span> {month}{` `}
        was characterised by{` `}
        <span>{thermalValues.min || ''}</span> to{` `}
        <span>{thermalValues.max || ''}</span>
        for an adult with <span>medium clothing doing moderate activity</span> in {` `}
        <span>{gidInfo.geoname}</span> . {` `}
      </>
    )}
    </>
  )
}

export default Description;