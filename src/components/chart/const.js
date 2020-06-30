import {
  HEATWAVES,
  COLDSNAPS,
  THERMALCOMFORT,
} from 'const/constants';

const thermalAreas = {};
thermalAreas[HEATWAVES] = [
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
thermalAreas[COLDSNAPS] = [
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
thermalAreas[THERMALCOMFORT] = [];

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
riskAreas[THERMALCOMFORT] = [];

/**
 * Colors climatology
 * [4, 8, 13, 18, 23, 29, 35, 41],  
 * ["#DAEFF5", "#BFD3E6", "#9EBCDA", "#8C96C6", "#8C6BB1", "#88419D", "#6E016B", "#3F0046"]
 */

const climatologyTypes = {
  type1: {
    fill: '#2166AC',
    condition: (x) => x < 4,
    name: 'Extreme cold stress',
  },
  type2: {
    fill: '#4393C3',
    condition: (x) => x >= 4 && x < 8,
    name: 'Strong cold stress',
  },
  type3: {
    fill: '#92C5DE',
    condition: (x) => x >= 8 && x < 13,
    name: 'Moderate cold stress',
  },
  type4: {
    fill: '#D1E5F0',
    condition: (x) => x >= 13 && x < 18,
    name: 'Slight cold stress',
  },
  type5: {
    fill: '#F7F7F7',
    condition: (x) => x >= 18 && x < 23,
    name: 'Comfortable',
  },
  type6: {
    fill: '#FDDBC7',
    condition: (x) => x >= 23 && x < 29,
    name: 'Slight heat stress',
  },
  type7: {
    fill: '#F4A582',
    condition: (x) => x >= 29 && x < 35,
    name: 'Moderate heat stress',
  },
  type8: {
    fill: '#D6604D',
    condition: (x) => x >= 35 && x < 41,
    name: 'Strong heat stress',
  },
  type9: {
    fill: '#B2182B',
    condition: (x) => x >= 41,
    name: 'Extreme heat stress',
  },
};
const climatologyBars = {};
climatologyBars[THERMALCOMFORT] = Object.keys(climatologyTypes).map(type => ({
  dataKey: type,
  fill: climatologyTypes[type].fill,
  name: climatologyTypes[type].name,
}));

const checkType = (x) => {
  const types = Object.keys(climatologyTypes);
  const current = types.find(t => climatologyTypes[t].condition(x));
  return climatologyTypes[current];
}

export {
  thermalAreas,
  riskAreas,
  climatologyBars,
  climatologyTypes,
  checkType,
}