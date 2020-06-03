import sweden from 'assets/shapes/sweden.svg';
import swedenActive from 'assets/shapes/swedenActive.svg';
import gidList from 'const/gids.json';

import layersList from 'const/layers.json';

export const COUNTRIES = [
  {
    iso: 'ESP',
    name: 'spain',
    svg: sweden,
    svgActive: swedenActive
  }
];
Object.keys(layersList).forEach(time => {
  Object.keys(layersList[time]).forEach(theme => {
    layersList[time][theme].layers = layersList[time][theme].layers.map(l => {
      return {
        id: l.id,
        type: 'raster',
        name: l.name,
        source: {
          "type": "raster",
          "tiles": [l.endpoint]
        },   
        active: true,
        opacity: 1
      }
    });
  })
});
export const LAYERS = layersList;
export const GIDS = gidList.locations.filter(g => g.admin_level < 4 && g.gid !== 'ES');

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
    value: 'future_longterm', 
    label: 'Future Long-Term', 
    from: dateLongterm.from, 
    to: dateLongterm.to, 
  },
  { 
    value: 'future_seasonal', 
    label: 'Seasonal', 
    from: dateSeasonal.from, 
    to: dateSeasonal.to, 
  }
];


export const HEATWAVES = 'heatwaves';
export const COLDSNAPS = 'coldsnaps';
export const TERMALCOMFORT = 'termalcomfort';

export const OPTIONS_THEME = [
  {
    value: HEATWAVES,
    label: 'Heatwaves',
  },
  {
    value: COLDSNAPS,
    label: 'ColdSnaps',
  },
  // {
  //   value: TERMALCOMFORT,
  //   label: 'Termal Comfort',
  // }
];

export const GID_DEFAULT_VIEWPORTS = {
  ES11: { zoom: 5, latitude: 40.416775, longitude: -3.703790 },
};

export const COUNTRIES_DEFAULT_VIEWPORTS = {
  ESP: { zoom: 5, latitude: 40.416775, longitude: -3.703790 },
};

export const SPECIES_RAMP_COLORS = ['rgba(255, 255, 255, 0)', '#FFFFFF', '#7044FF']; // [min (transparent), mid, max]
export const TEMPERATURE_RAMP_COLORS = ['#FEF6B5', '#FFA679', '#E15383']; // [min, mid, max]
export const PERCIPITATION_RAMP_COLORS = ['#A6BDDB', '#3690C0', '#034E7B']; // [min, mid, max]
export const MAPBOX_STYLE_DEFAULT = 'mapbox://styles/mapbox/light-v10';

export const DEFAULT_LAYER_OPACITY = 60;

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

export const DISTRIBUTIONS = {
  CURRENT: 'current',
  OBSERVED: 'observed',
  MODELLED: 'modelled'
};

export const MODAL_INFO_DATA = {
  currentDistribution: {
    title: 'Current Distribution',
    text:
      'The current observed distribution shows the points from GBIF where the species has been observed in the last 20 years. The modelled distribution is the committe average of the 180 calibrated models.'
  },
};
