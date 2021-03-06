import axios from 'axios';
import {
  THERMALCOMFORT,
  COLDSNAPS,
  HEATWAVES,
  PETS_JSON,
} from 'const/constants';

const apiUrl = 'https://api.skydipper.com/v1';
const AuthorizationToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzA0OGIzYTY4NWYzMDAxMDhkZjYyNCIsInJvbGUiOiJBRE1JTiIsInByb3ZpZGVyIjoibG9jYWwiLCJlbWFpbCI6ImVkd2FyZC5tb3JyaXNAdml6enVhbGl0eS5jb20iLCJleHRyYVVzZXJEYXRhIjp7ImFwcHMiOlsic2t5ZGlwcGVyIiwibWFuZ3JvdmVBdGxhcyIsInNvaWxzUmV2ZWFsZWQiLCJjb3Blcm5pY3VzQ2xpbWF0ZSJdfSwiY3JlYXRlZEF0IjoxNTkwNDA0NzU1MTc3LCJpYXQiOjE1OTA0MDQ3NTV9.wRRJQCFtvCZzMTtucly2pmCL5WhsFBgBFDUo2CmJSaY`; 

const queryId = {
  historical: '3a46bbff-73bc-4abc-bad6-11be6e99e2cb',
  'future-seasonal': 'e1cc3f3e-133a-4a14-b2c2-f3192ee213c3',
  'future-longterm': 'bef42c82-2714-4ba0-8694-75e49916013a',
};

const defaultParams = {
  gid: 'ES11',
  theme: 'heatwaves',
  period: 'historical',
  time: {
    start: '1980-01-01',
    end: '2100-01-01',
  },
  month: (new Date()).getMonth(),
  admin_level: 2,
};

const {
  gid: gidDef,
  theme: themeDef,
  period: periodDef,
  time: timeDef,
  month: monthDef,
  admin_level: adminLevelDef,
} = defaultParams;
const tables = {
  historical: 'historical_monthly_zs_nuts_level_234',
  'future-seasonal': 'future_seasonal_monthly_zs_nuts_level_234',
  'future-longterm': 'future_longterm_monthly_zs_nuts_level_234',
}
const tablesThermalComfort = {
  '2': 'historical_hourly_petmax_quantiles_zs_nuts_level_2',
  '3': 'historical_hourly_petmax_quantiles_zs_nuts_level_3',
};
const params = {
  [HEATWAVES]: {
    historical: [
      'gid',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'heatwave_alarms_mean',
      'heatwave_alerts_mean',
      'heatwave_warnings_mean',
      'heatstress_extreme_mean',
      'heatstress_strong_mean',
      'heatstress_moderate_mean'
    ],
    'future-seasonal': [
      'gid', 
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'tasmax_std',
      'heatwave_alarms_mean',
      'heatwave_alarms_std',
      'heatwave_alerts_mean',
      'heatwave_alerts_std',
      'heatwave_warnings_mean',
      'heatwave_warnings_std'
    ],
    'future-longterm': [
      'gid',
      'experiment',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'tasmax_std',
      'heatwave_alarms_mean',
      'heatwave_alarms_std',
      'heatwave_alerts_mean',
      'heatwave_alerts_std',
      'heatwave_warnings_mean',
      'heatwave_warnings_std'
    ]
  },
  [COLDSNAPS]: {
    historical: [
      'gid',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'coldsnap_alarms_mean', 
      'coldsnap_alerts_mean', 
      'coldsnap_warnings_mean', 
      'coldstress_extreme_mean', 
      'coldstress_strong_mean',
      'coldstress_moderate_mean',
    ],
    'future-seasonal': [
      'gid',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'tasmin_std',
      'tasmax_std',
      'coldsnap_alarms_mean',
      'coldsnap_alarms_std',
      'coldsnap_alerts_mean',
      'coldsnap_alerts_std',
      'coldsnap_warnings_mean',
      'coldsnap_warnings_std',
    ],
    'future-longterm': [
      'gid',
      'experiment',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'tasmin_std',
      'tasmax_std',
      'coldsnap_alarms_mean',
      'coldsnap_alarms_std',
      'coldsnap_alerts_mean',
      'coldsnap_alerts_std',
      'coldsnap_warnings_mean',
      'coldsnap_warnings_std'
    ]
  },
  [THERMALCOMFORT]: {
    historical: [
      'gid',
      'month',
      'hour',
      'quantile',
      'pet_mean'
    ],
    // unused:
    'future-seasonal': [
      'gid',
      'month',
      'hour',
      'quantile',
      'pet_mean'
    ],
    'future-longterm': [
      'gid',
      'month',
      'hour',
      'quantile',
      'pet_mean'
    ],
  },
  pet: {
    historical: [
      'max_petmax',
      'min_petmin'
    ]
  }
}

const generateSql = (gid, period, theme, time, month, admin_level) => {
  const table = theme === THERMALCOMFORT ? tablesThermalComfort[admin_level] : tables[period];
  const selectParams = params[theme][period];
  const sql = `
    SELECT 
    ${selectParams.join(',')}
    FROM ${table}
    WHERE gid='${gid}'
    AND time between '${time.start}' AND '${time.end}'
    ORDER BY time
  `;

  const sqlThermalComfort = `
    SELECT 
    ${selectParams.join(',')}
    FROM ${table}
    WHERE gid='${gid}'
    AND month = ${month}
    ORDER BY hour
  `;
  return theme === THERMALCOMFORT ? sqlThermalComfort : sql;
}

export const getWidgetData = async (params = defaultParams) => {
  const {
    period = periodDef,
    gid = gidDef,
    theme = themeDef,
    time = timeDef,
    month = monthDef,
    admin_level = adminLevelDef,
  } = params;
  const id = queryId[period];
  const sql = generateSql(gid, period, theme, time, month, admin_level)
  const axiosConfig = {
    url: `/query/${id}/?sql=${sql}`,
    method: 'GET',
    baseURL: apiUrl,
    headers: {
      Authorization: AuthorizationToken,
    }
  }

  const res = await axios.request(axiosConfig)
  return res.data;
}

export const getPetData = async (params = defaultParams) => {
  // https://api.skydipper.com/v1/query/3a46bbff-73bc-4abc-bad6-11be6e99e2cb/?sql=
  const id = queryId.historical;
  const sql = `SELECT max_petmax, min_petmin FROM historical_total_zs_nuts_level_234_2 WHERE gid='${params.gid}'`;
  const axiosConfig = {
    url: `/query/${id}/?sql=${sql}`,
    method: 'GET',
    baseURL: apiUrl,
    headers: {
      Authorization: AuthorizationToken,
    }
  }

  const res = await axios.request(axiosConfig);
  return res.data;
}

export const getLayersInfo = async (ids = []) => {
  const result = Promise.all(ids.map(async (id) => {
    const axiosConfig = {
      url: `/layer/${id}`,
      method: 'GET',
      baseURL: apiUrl,
      headers: {
        Authorization: AuthorizationToken,
      }
    };  
    const res = await axios.request(axiosConfig);
    return res.status === 200 ? res.data.data : null;
  }));
  return result;
}

export const getPets = async () => {
  const res = await axios.get(PETS_JSON);
  return res.status === 200 ? res.data : null; 
}