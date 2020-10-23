import React, { Fragment } from "react";
import {
  HEATWAVES,
  COLDSNAPS,
  THERMALCOMFORT,
  PERIOD_FUTURE_LONGTERM,
  PERIOD_HISTORICAL,
} from "const/constants";

import { climatologyTypes } from 'components/chart/const';

const Description = ({
  theme,
  params = {},
  gidInfo = {},
  thermalValues = {},
  isPet = false,
  petValues = {},
  period,
  popup
}) => {
  const {
    from,
    to,
    alarmsCount,
    alertsCount,
    warningsCount,
    extremeCount,
    strongCount,
    moderateCount,
    temperature,
    temperatureDate,
    alarmsDev,
    alertsDev,
    warningsDev,
    temperatureDev,
  } = params;

  const currentYear = Number(new Date().getFullYear());
  const maxPetCat = petValues.petMax && Object.values(climatologyTypes).find(type => type.condition(petValues.petMax));
  const minPetCat = petValues.petMin && Object.values(climatologyTypes).find(type => type.condition(petValues.petMin));

  return (
    <>
      {(theme === HEATWAVES || theme === COLDSNAPS) && (
        <>
          From {from} to {to} {` `}
          <span>
            {alarmsCount}
            {alarmsDev ? ` ± ${alarmsDev.toFixed(0)}` : ""} alarms
          </span>
          ,{` `}
          <span>
            {alertsCount}
            {alertsDev ? ` ± ${alertsDev.toFixed(0)}` : ""} alerts
          </span>
          {` `}
          and{" "}
          <span>
            {warningsCount}
            {warningsDev ? ` ± ${warningsDev.toFixed(0)}` : ""} warnings
          </span>
          {period === PERIOD_HISTORICAL && (
            <>
              , and <span>{extremeCount} extreme</span>,{` `}
              <span>{strongCount} strong</span>
              {` `}
              and <span>{moderateCount} moderate heat stress events</span>
              {` `}
            </>
          )}
          {period === PERIOD_FUTURE_LONGTERM
            ? " are predicted in "
            : " were observed in "}
          {` `}
          <span>{gidInfo.geoname}</span>. {` `}
          The {theme === HEATWAVES ? "highest" : "lowest"} temperature of {` `}
          <span>
            {temperature}
            {temperatureDev ? ` ± ${temperatureDev.toFixed(2)}` : ""}
          </span>{" "}
          ºC {` `}
          {period === PERIOD_FUTURE_LONGTERM
            ? "will be in "
            : "was observed in "}
          {` `}
          <span>{temperatureDate}</span>.
          {period === PERIOD_FUTURE_LONGTERM && (
            <>
              {` `}This data is based on the <span>RCP 8.5</span> scenario.
            </>
          )}
        </>
      )}
      {theme === THERMALCOMFORT && petValues && (popup ? (
        <>
          Between{` `}
          <span>{currentYear - 15}</span> and{` `}
          <span>{currentYear}</span> for an{` `}
          <span>{petValues.age ? petValues.age.toLowerCase() : "adult"}</span>
          {` `}
          {petValues.clothing && [
            <Fragment key="wearing">wearing </Fragment>,
            <span key="clothing">
              {petValues.clothing.toLowerCase()} clothing
            </span>,
            <Fragment key="and"> and </Fragment>,
          ]}
          {petValues.activity && (
            <span>{petValues.activity.toLowerCase()} </span>
          )}
          in <span>{gidInfo.geoname}</span>, the maximum PET value was{" "}
          <span>{petValues.petMax?.toFixed(2)}</span> and the minimum PET value was{" "}
          <span>{petValues.petMin?.toFixed(2)}</span>.
        </>
      ) : (
        <>
          Between{` `}
          <span>{currentYear - 15}</span> and{` `}
          <span>{currentYear}</span>,{" "}
          <span>{petValues.month}</span> was characterized by{" "}
          <span>{maxPetCat?.name?.toLowerCase()}</span> to{" "}
          <span>{minPetCat?.name?.toLowerCase()}</span>{" "}
          for an{` `}
          <span>{petValues.age ? petValues.age.toLowerCase() : "adult"}</span>
          {` `}
          {petValues.clothing && [
            <Fragment key="wearing">wearing </Fragment>,
            <span key="clothing">
              {petValues.clothing.toLowerCase()} clothing
            </span>,
          ]}{" "}
          {petValues.activity && (
            <span>{petValues.activity.toLowerCase()} </span>
          )}
          in <span>{gidInfo.geoname}</span>.
        </>
      ))}
      {isPet && (
        <>
          On <span>15th of {petValues.month} 2018</span> the highest PET value
          of {` `}
          <span>{petValues.max}</span> for an {` `}
          <span>{petValues.age ? petValues.age.toLowerCase() : null}</span>{" "}
          wearing {` `}
          <span>
            {petValues.clothing ? petValues.clothing.toLowerCase() : null}
          </span>{" "}
          clothing {` `}
          <span>
            {petValues.activity ? petValues.activity.toLowerCase() : null}
          </span>{" "}
          in {` `}
          <span>{gidInfo.geoname}</span> was observed at {` `}
          <span>{petValues.hour} GMT</span> {` `}
        </>
      )}
    </>
  );
};

export default Description;
