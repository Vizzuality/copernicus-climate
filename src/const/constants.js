import React from 'react';
import gidList from './gids.json';
import layersList from './layers.json';

/** GIDS */
// Filter gids by admin level (enable 2, 3) and sort by alphabet
export const GIDS = gidList.locations.filter(g => g.admin_level <= 4 && g.gid !== 'ES').sort((a, b) => {
  if (a.geoname > b.geoname) {
    return 1;
  }
  if (a.geoname < b.geoname) {
    return -1;
  }
  return 0;
});

/** PERIOD (TIME) */

const today = new Date();
const currentMonth = today.getMonth()+1;
const date = today.getFullYear()+'-'+currentMonth+'-'+today.getDate();

const dateLongterm = {
  from: date,
  to: '2090-01-01',
};
export const PERIOD_HISTORICAL = 'historical';
export const PERIOD_FUTURE_SEASONAL = 'future-seasonal';
export const PERIOD_FUTURE_LONGTERM = 'future-longterm';
export const OPTIONS_TIME = [
  { 
    value: PERIOD_HISTORICAL,
    label: 'Historical',
    from: '1980-01-01',
    to: '2019-10-01',
  },
  {
    value: PERIOD_FUTURE_SEASONAL, 
    label: 'Seasonal Forecast',
    from: '2020-02-01',
    to: '2020-07-01',
  },
  {
    value: PERIOD_FUTURE_LONGTERM, 
    label: 'Long-Term Projections',
    from: dateLongterm.from, 
    to: dateLongterm.to, 
  },
];

/** THEMES */
export const HEATWAVES = 'heatwaves';
export const COLDSNAPS = 'coldsnaps';
export const THERMALCOMFORT = 'thermalcomfort';

export const OPTIONS_THEME = [
  {
    value: HEATWAVES,
    label: 'Heatwave',
  },
  {
    value: COLDSNAPS,
    label: 'Cold Snap',
  },
  {
    value: THERMALCOMFORT,
    label: 'Thermal Comfort',
  },
];


/** MAPBOX */
export const MAPBOX_STYLE_DEFAULT = 'mapbox://styles/copernicus-forests/ckagm1ll90os61il7lqwd06cg';

export const DEFAULT_VIEWPORT = {
  width: 400,
  height: 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

export const ADMIN_LEVEL_ZOOM = {
  '1' : 4,
  '2' : 6,
  '3' : 8,
  '4' : 10,
};

export const SOURCE_URLS = {
  historical: 'mapbox://copernicus-forests.zst_esp_nuts_234_historical',
  'future-longterm': 'mapbox://copernicus-forests.zst_esp_nuts_234_future-longterm',
  'future-seasonal': 'mapbox://copernicus-forests.zst_esp_nuts_234_future-seasonal',
}

export const SOURCE_LAYERS = {
  historical: {
    "2": "historicallevel2",
    "3": "historicallevel3",
    "4": "historicallevel4"
  },
  'future-longterm': {
    "2": "futurelongtermlevel2",
    "3": "futurelongtermlevel3",
    "4": "futurelongtermlevel4"
  },
  'future-seasonal': {
    "2": "futureseasonallevel2",
    "3": "futureseasonallevel3",
    "4": "futureseasonallevel4"
  },
}

/** LAYERS */
// Set static layers urls
export const LAYERS = layersList;

export const FOOTER_MENU = [
  {
    title: 'Contact us',
    link: '/contact-us',
    fullUrl: 'https://climate.copernicus.eu/contact-us'
  },
  {
    title: 'Cookies',
    link: '/cookies',
    fullUrl: 'https://climate.copernicus.eu/cookies'
  },
  {
    title: 'Data Protection Officer',
    link: '/data-protection-officer',
    fullUrl: 'https://climate.copernicus.eu/data-protection-officer'
  },
  {
    title: 'Data licence',
    link:
      'https://climate.copernicus.eu/sites/default/files/2018-04/20170117_Copernicus_License_V1.0.pdf',
    fullUrl:
      'https://climate.copernicus.eu/sites/default/files/2018-04/20170117_Copernicus_License_V1.0.pdf'
  },
  {
    title: 'Disclaimer & Privacy',
    link: '/disclaimer-and-privacy',
    fullUrl: 'https://climate.copernicus.eu/disclaimer-and-privacy'
  }
];

export const FOOTER_SOCIAL_LINKS = [
  {
    class: 'twitter',
    icon: '#icon-twitter',
    link: 'https://twitter.com/CopernicusECMWF'
  },
  {
    class: 'instagram',
    icon: '#icon-instagram',
    link: 'https://www.instagram.com/copernicusecmwf/'
  },
  {
    class: 'slideshare',
    icon: '#icon-slideshare',
    link: 'https://www.slideshare.net/CopernicusECMWF'
  }
];

export const HEADER_MENU_FIRST = [
  {
    title: 'News',
    link: '/news',
    fullUrl: 'https://climate.copernicus.eu/news'
  },
  {
    title: 'Events',
    link: '/events',
    fullUrl: 'https://climate.copernicus.eu/events'
  },
  {
    title: 'Press',
    link: '/press-releases',
    fullUrl: 'https://climate.copernicus.eu/press-releases'
  },
  {
    title: 'Trends',
    link: '/complete-list-tenders-issued-c3s',
    fullUrl: 'https://climate.copernicus.eu/complete-list-tenders-issued-c3s'
  },
  {
    title: 'Help & Support',
    link: '/help-support',
    fullUrl: 'https://climate.copernicus.eu/help-support'
  }
];

export const HEADER_MENU_SECOND = [
  {
    title: 'What we do',
    link: '/what-we-do',
    fullUrl: 'https://climate.copernicus.eu/what-we-do'
  },
  {
    title: 'Data',
    fullUrl: 'http://cds.climate.copernicus.eu/'
  }
];


export const OPTIONS_MONTHES = [
  {
    value: 1,
    label: 'January',
  },
  {
    value: 2,
    label: 'February',
  },
  {
    value: 3,
    label: 'March',
  },
  {
    value: 4,
    label: 'April',
  },
  {
    value: 5,
    label: 'May',
  },
  {
    value: 6,
    label: 'June',
  },
  {
    value: 7,
    label: 'July',
  },
  {
    value: 8,
    label: 'August',
  },
  {
    value: 9,
    label: 'September',
  },
  {
    value: 10,
    label: 'October',
  },
  {
    value: 11,
    label: 'November',
  },
  {
    value: 12,
    label: 'December',
  },
];

export const PETS_JSON = 'https://storage.googleapis.com/copernicus-climate/zonal_stats/pet_2018_bilbao_vitoria_madrid.json';
export const OPTIONS_ACTIVITY = [
  {
    value: 'met40',
    label: 'Relaxing',
  },
  {
    value: 'met80',
    label: 'Walking',
  },
  {
    value: 'met240',
    label: 'Doing sports',
  }
];

export const OPTIONS_AGE = [
  {
    value: 'adult',
    label: 'Adult',
  }
];

export const OPTIONS_CLOTHING = [
  {
    value: 'light',
    label: 'Light',
  }
];

export const MODAL_INFO_DATA = {
  temperature: {
    title: 'Temperatures (max and min)',
    text: (<>
<p>Temporal change of the average maximum and minimum temperature, extracted from the hourly data from 1981 to 2019, for the selected administration.</p><br />
  
<p>The choropleth map shows the aggregated average for the selected time period of the minimum and maximum temperatures.</p><br />

<p>The data aggregation procedure is available in <a href="https://github.com/Vizzuality/copernicus-climate-data">this GitHub repository</a>.</p></>),
  },
  riskEvents: {
    title: 'Risk Events',
    text: (<><p>Count of extreme events in the selected administration. The risk level relates to the duration of the extreme event.</p><br />

<p>Yellow level: There is no meteorological risk for the general population, although some specific activities might be affected (common but
potentially dangerous meteorological phenomena). They can be repeated several times during the year. It is therefore a warning level,
not an alert.</p><br />

<p>Orange level: There is a significant weather risk.Situations with orange level occur very few times during the year, normally one. The
damage, especially in some sectors, is starting to be significant and physical integrity is at risk. Generates a situation of alert.</p><br />

<p>Red level: The meteorological risk is extreme (unusual meteorological phenomena of exceptional intensity).This type of situation tends to
occur once every several years and involves a clear risk to the population. The material damage can be very high, or endanger the physical
integrity of a sector of the population. It generates an alarm situation.</p><br />

<p>The data aggregation procedure is available in <a href="https://github.com/Vizzuality/copernicus-climate-data">this GitHub repository</a>.</p></>),
  },
  thermalComfort: {
    title: 'Thermal comfort ',
    text: (<>
<p>Hourly Physiologically Equivalent Temperature (PET) on the fifteenth of the selected month for the year 2018, for the selected administration.</p><br />

<p>The PET is a combined indicator based on Air temperature, Relative air humidity, Wind velocity and Mean radiant temperature.</p><br />

<p>The choropleth map shows the averaged minimum and maximum PET for the selected time period.</p><br />

<p>The data aggregation procedure is available in <a href="https://github.com/Vizzuality/copernicus-climate-data">this GitHub repository</a>.</p></>),
  },
  thermalComfortMain: {
    title: 'Thermal comfort ',
    text: (<>
<p>Hourly Physiologically Equivalent Temperature (PET) on the fifteenth of the selected month for the year 2018, for the selected administration.</p><br />

<p>The PET is a combined indicator based on Air temperature, Relative air humidity, Wind velocity and Mean radiant temperature.</p><br />

<p>The choropleth map shows the averaged minimum and maximum PET for the selected time period.</p><br />

<p>The data aggregation procedure is available in <a href="https://github.com/Vizzuality/copernicus-climate-data">this GitHub repository</a>.</p></>),
  },
  hourlyClimatology: {
    title: 'Hourly climatology ',
    text: (<>
<p>Hourly proportion of thermal stress, derived from Physiological Equivalent Temperature (PET), for the selected administration.</p><br />

<p>The PET is a combined indicator based on Air temperature, Relative air humidity, Wind velocity and Mean radiant temperature.</p><br />

<p>Thermal stress can be classified following the thresholds: &lt;4 PET as Extreme cold stress, 4-8 PET as Strong cold stress, 8-13 PET as Moderate cold stress and 29-35 PET as Moderate heat stress, 35-41 as Strong heat stress 35-41, &gt;41 as Extreme heat stress.</p><br />

<p>The data aggregation procedure is available in <a href="https://github.com/Vizzuality/copernicus-climate-data">this GitHub repository</a>.</p></>),
  },
}