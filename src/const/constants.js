import gidList from './gids.json';
import layersList from './layers.json';

/** GIDS */
// Filter gids by admin level (enable 2, 3) and sort by alphabet
export const GIDS = gidList.locations.filter(g => g.admin_level < 4 && g.gid !== 'ES').sort((a, b) => {
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
const dateSeasonal = {
  from: currentMonth <= 7 ? today.getFullYear()+'-02-01' : today.getFullYear()+'-07-01',
  to: currentMonth <= 7 ? today.getFullYear()+'-02-07' : today.getFullYear()+'-12-01',
};
const dateLongterm = {
  from: date,
  to: today.getFullYear()+20+'-'+currentMonth+'-'+today.getDate(),
};
export const OPTIONS_TIME = [
  { 
    value: 'historical', 
    label: 'Historical', 
    from: '1980-01-01', 
    to: date, 
  },
  { 
    value: 'future-seasonal', 
    label: 'Seasonal Forecast', 
    from: dateSeasonal.from, 
    to: dateSeasonal.to, 
  },
  { 
    value: 'future-longterm', 
    label: 'Long-Term Forecast', 
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
    label: 'Relax',
  },
  {
    value: 'met80',
    label: 'Walk',
  },
  {
    value: 'met240',
    label: 'Sport',
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
    title: 'Temperature',
    text: 'Maximum and minimum temperature average across the selected administration',
  },
  riskEvents: {
    title: 'Risk Events',
    text: 'Count of extreme events in the selected administration. The risk level relates to the duration of the extreme event.',
  },
  thermalComfort: {
    title: 'Thermal comfort ',
    text: 'Count of the levels of extreme stress events experienced in the selected administration',
  },
  thermalComfortMain: {
    title: 'Thermal comfort ',
    text: 'Hourly Physiologically Equivalent Temperature along the 15th of the selected month for the year 2018. ',
  },
  hourlyClimatology: {
    title: 'Hourly climatology ',
    text: 'Hourly distribution of the stress.',
  },
}