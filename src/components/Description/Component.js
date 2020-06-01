import React from 'react';
import { HEATWAVES } from 'constants.js';

const Description = ({ theme, params }) => {

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
    temperatureDate
  } = params;

  return (
    <>
      From {from} to {to} {` `}
      <span>{alarmsCount} alarms</span>,{` `}
      <span>{alertsCount} alerts</span>{` `}
      and <span>{warningsCount} warnings</span>,{` `}
      and <span>{extreamCount} extreme</span>,{` `}
      <span>{strongCount} strong</span>{` `}
      and <span>{moderateCount} moderate heat stress events</span> were observed in{` `}
      <span>Bizkaia</span>. {` `}
      The {theme === HEATWAVES ? 'highest' : 'lowest'} highest temperature of {` `}
      <span>{temperature}</span> ºC was observed in {` `}
      <span>{temperatureDate}</span>.
    </>
  )
}

export default Description;