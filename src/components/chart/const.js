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
    stackId:"1",
    stroke:"#FFC744", 
    fill:"#FFC744",
  },
];
riskAreas[TERMALCOMFORT] = [];

export {
  termalAreas,
  riskAreas,
}