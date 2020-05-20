import indonesia from 'assets/shapes/indonesia.svg';
import indonesiaActive from 'assets/shapes/indonesiaActive.svg';
import sweden from 'assets/shapes/sweden.svg';
import swedenActive from 'assets/shapes/swedenActive.svg';

export const COUNTRIES = [
  {
    iso: 'SWE',
    name: 'sweden',
    svg: sweden,
    svgActive: swedenActive
  },
  {
    iso: 'IDN',
    name: 'indonesia',
    svg: indonesia,
    svgActive: indonesiaActive
  }
];

export const COUNTRIES_DEFAULT_VIEWPORTS = {
  CAN: { zoom: 2, latitude: 56.1351095, longitude: -106.3460756 },
  SWE: { zoom: 4, latitude: 62.295911, longitude: 17.861953 },
  IDN: { zoom: 3, latitude: -4.341701, longitude: 122.389996 },
  PER: { zoom: 4, latitude: -10.471441, longitude: -75.135125 },
  TZA: { zoom: 5, latitude: -5.790175, longitude: 36.718777 }
};

export const SPECIES_RAMP_COLORS = ['rgba(255, 255, 255, 0)', '#FFFFFF', '#7044FF']; // [min (transparent), mid, max]
export const TEMPERATURE_RAMP_COLORS = ['#FEF6B5', '#FFA679', '#E15383']; // [min, mid, max]
export const PERCIPITATION_RAMP_COLORS = ['#A6BDDB', '#3690C0', '#034E7B']; // [min, mid, max]

export const MAPBOX_STYLE_DEFAULT = 'mapbox://styles/copernicus-forests/ck3eh5kj049be1cobcp1uh4vn';

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
  futureDistribution: {
    title: 'Future Distribution',
    text:
      'The future modelled distribution is the projection of the model calibrated with the current observations to the future climatic conditions.'
  },
  committeeAverage: {
    title: 'Committee Average',
    text:
      'The Committee Average depicts the result of all the calibrated models voting for an absence or a presence and then averaged. Values close to 0 represent an agreement of the models on an absence. Values close to 1000 represent an agreement of the models on a presence. Values around 500 inform on a disagreement on the prediction of the models.'
  },
  biovar01: {
    title: 'Annual Mean Temperature',
    text:
      'The monthly maximum and minimum temperature for each month have been extracted and then the average has been obtained for each month. The monthly averages have been averaged to obtain the annual mean temperature. The annual mean temperatures have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country'
  },
  biovar02: {
    title: 'Mean Diurnal Range (Mean of monthly (max temp - min temp))',
    text:
      'The monthly maximum and minimum temperature for each month have been extracted. The minimum has been subtracted to the maximum. The monthly values have been averaged to obtain the annual mean diurnal range. The annual mean diurnal range has been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar03: {
    title: 'Isothermality (BIO2/BIO7) (×100)',
    text:
      'The Mean diurnal range (BIO2) has been divided by the Temperature Annual Range (BIO7). The information shown on the map is an average across the period. On the graph, the information shown is averaged across the country.'
  },
  biovar04: {
    title: 'Temperature Seasonality (standard deviation ×100)',
    text:
      'For each year of a period, the monthly maximum and minimum temperature for each month have been extracted. The standard deviation has been calculated and multiplied by 100. The annual temperature seasonality has been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar05: {
    title: 'Max Temperature of Warmest Month',
    text:
      'For each year of a period, the maximum monthly temperature has been extracted. The maximum temperature of the warmest month of each year of a period has been averaged, which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar06: {
    title: 'Min Temperature of Coldest Month',
    text:
      'For each year of a period, the minimum monthly temperature has been extracted. The minimum temperature of the coldest month of each year of a period has been averaged, which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar07: {
    title: 'Temperature Annual Range (BIO5-BIO6)',
    text:
      'The minimum temperature of the coldest month has been subtracted to the maximum temperature of the warmest month. The information shown on the map is an average across the period. On the graph, the information shown is averaged across the country.'
  },
  biovar08: {
    title: 'Mean Temperature of Wettest Quarter',
    text:
      'For each year, the total precipitation of each month has been extracted and the three consecutive months with the highest precipitation have been identified. From those three months the minimum and maximum temperature have been extracted and averaged. The mean temperatures of each year have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar09: {
    title: 'Mean Temperature of Driest Quarter',
    text:
      'For each year, the total precipitation of each month has been extracted and the three consecutive months with the lowest precipitation have been identified. From those three months the minimum and maximum temperature have been extracted and averaged. The mean temperatures of each year have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar10: {
    title: 'Mean Temperature of Warmest Quarter',
    text:
      'For each year, the maximum temperature of each month has been extracted and the three consecutive months with the highest temperature have been identified. From those three months the minimum and maximum temperature have been extracted and averaged. The mean temperatures of each year have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar11: {
    title: 'Mean Temperature of Coldest Quarter',
    text:
      'For each year, the minimum temperature of each month has been extracted and the three consecutive months with the lowest temperature have been identified. From those three months the minimum and maximum temperature have been extracted and averaged. The mean temperatures of each year have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar12: {
    title: 'Annual Precipitation',
    text:
      'For each year, the total precipitation of each month has been extracted and summed across the year. The annual precipitations have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar13: {
    title: 'Precipitation of Wettest Month',
    text:
      'For each year, the total precipitation of each month has been extracted and the three consecutive months with the highest precipitation have been identified. The yearly values have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar14: {
    title: 'Precipitation of Driest Month',
    text:
      'For each year, the total precipitation of each month has been extracted and the three consecutive months with the lowest precipitation have been identified. The yearly values have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar15: {
    title: 'Precipitation Seasonality (Coefficient of Variation)',
    text:
      'For each year the coefficient of variation between months has been calculated. The yearly values have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar16: {
    title: 'Precipitation of Wettest Quarter.',
    text:
      'For each year, the total precipitation of each month has been extracted and the three consecutive months with the highest precipitation have been identified. The sum of precipitation of those three months has been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar17: {
    title: 'Precipitation of Driest Quarter',
    text:
      'For each year, the total precipitation of each month has been extracted and the three consecutive months with the lowest precipitation have been identified. The sum of precipitation of those three months has been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar18: {
    title: 'Precipitation of Warmest Quarter',
    text:
      'For each year, the maximum temperature of each month has been extracted and the three consecutive months with the highest temperature have been identified. From those three months the sum of precipitation has been extracted. The total precipitation of the warmest quarter of each year have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  },
  biovar19: {
    title: 'Precipitation of Coldest Quarter',
    text:
      'For each year, the minimum temperature of each month has been extracted and the three consecutive months with the highest temperature have been identified. From those three months the sum of precipitation has been extracted. The total precipitation of the warmest quarter of each year have been averaged across a period which is the information shown on the map. On the graph, the information shown is averaged across the country.'
  }
};
