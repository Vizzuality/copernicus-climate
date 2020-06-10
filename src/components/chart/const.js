import {
  HEATWAVES,
  COLDSNAPS,
  TERMALCOMFORT,
} from 'constants.js';

const termalAreas = {};
termalAreas[HEATWAVES] = [
  {
    type: "linear",
    name: "Extreme heat stress",
    dataKey: "heatstress_extreme_mean",
    stackId: "1",
    stroke: "#6E016B", 
    fill: "#6E016B",
  },
  {
    type:"linear",
    name:"Moderate heat stress",
    dataKey:"heatstress_moderate_mean", 
    stackId:"1",
    stroke:"#8C6BB1", 
    fill:"#8C6BB1",
  },
  {
    type:"linear",
    name:"Strong heat stress",
    dataKey:"heatstress_strong_mean", 
    stackId:"1",
    stroke:"#88419D", 
    fill:"#88419D",
  },
];
termalAreas[COLDSNAPS] = [
  {
    type: "linear",
    name: "Extreme cold stress ",
    dataKey: "coldstress_extreme_mean",
    stackId: "1",
    stroke: "#DAEFF5", 
    fill: "#DAEFF5",
  },
  {
    type:"linear",
    name:"Strong cold stress ",
    dataKey:"coldstress_strong_mean", 
    stackId:"1",
    stroke:"#BFD3E6", 
    fill:"#BFD3E6",
  },
  {
    type:"linear",
    name:"Moderate cold stress ",
    dataKey:"coldstress_moderate_mean", 
    stackId:"1",
    stroke:"#9EBCDA", 
    fill:"#9EBCDA",
  },
];
termalAreas[TERMALCOMFORT] = [];

const riskAreas = {};
riskAreas[HEATWAVES] = [
  {
    type:"linear",
    name:"Alarm",
    dataKey:"heatwave_alarms_mean",
    stackId:"1",
    stroke:"#FF3131",
    fill:"#FF3131",
  },
  {
    type:"linear",
    name:"Alert",
    dataKey:"heatwave_alerts_mean", 
    stackId:"1",
    stroke:"#FF773A", 
    fill:"#FF773A",
  },
  {
    type:"linear",
    name:"Warning",
    dataKey:"heatwave_warnings_mean", 
    stackId:"1",
    stroke:"#FFC744", 
    fill:"#FFC744",
  },
];
riskAreas[COLDSNAPS] = [
  {
    type:"linear",
    name:"Alarm",
    dataKey:"coldsnap_alarms_mean",
    stackId:"1",
    stroke:"#FF3131",
    fill:"#FF3131",
  },
  {
    type:"linear",
    name:"Alert",
    dataKey:"coldsnap_alerts_mean", 
    stackId:"1",
    stroke:"#FF773A", 
    fill:"#FF773A",
  },
  {
    type:"linear",
    name:"Warning",
    dataKey:"coldsnap_warnings_mean", 
    fill:"#8884d8"
  },
];
riskAreas[TERMALCOMFORT] = [];

/**
 * Colors climatology
 * [4, 8, 13, 18, 23, 29, 35, 41],  
 * ["#DAEFF5", "#BFD3E6", "#9EBCDA", "#8C96C6", "#8C6BB1", "#88419D", "#6E016B", "#3F0046"]
 */

const climatologyTypes = {
  type1: {
    fill: '#DAEFF5',
    condition: (x) => x < 4,
  },
  type2: {
    fill: '#BFD3E6',
    condition: (x) => x >= 4 && x < 8,
    name: 'Extreme cold stress',
  },
  type3: {
    fill: '#9EBCDA',
    condition: (x) => x >= 8 && x < 13,
    name: 'Strong cold stress',
  },
  type4: {
    fill: '#8C96C6',
    condition: (x) => x >= 13 && x < 18,
    name: 'Moderate cold stress',
  },
  type5: {
    fill: '#8C6BB1',
    condition: (x) => x >= 18 && x < 23,
    name: 'Comfort no stress',
  },
  type6: {
    fill: '#88419D',
    condition: (x) => x >= 23 && x < 29,
    name: 'Moderate heat stress',
  },
  type7: {
    fill: '#6E016B',
    condition: (x) => x >= 29 && x < 35,
    name: 'Strong heat stress',
  },
  type8: {
    fill: '#3F0046',
    condition: (x) => x >= 35 && x < 41,
    name: 'Extreme heat stress',
  },
}
const climatologyBars = {};
climatologyBars[TERMALCOMFORT] = Object.keys(climatologyTypes).map(type => ({
  dataKey: type,
  fill: climatologyTypes[type].fill,
  name: climatologyTypes[type].name,
}));

export {
  termalAreas,
  riskAreas,
  climatologyBars,
  climatologyTypes,
}