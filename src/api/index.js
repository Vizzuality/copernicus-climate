import axios from 'axios';

const apiUrl = 'https://api.skydipper.com/v1';
const AuthorizationToken = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`; 

const queryId = {
  historical: '3a46bbff-73bc-4abc-bad6-11be6e99e2cb',
  future_seasonal: 'e1cc3f3e-133a-4a14-b2c2-f3192ee213c3',
  future_longterm: 'bef42c82-2714-4ba0-8694-75e49916013a',
};

const defaultParams = {
  gid: 'ES11',
  theme: 'heatwaves',
  period: 'historical',
  time: {
    start: '1980-01-01',
    end: '2100-01-01',
  }
};

const {
  gid: gidDef,
  theme: themeDef,
  period: periodDef,
  time: timeDef,
} = defaultParams;

const tables = {
  historical: 'historical_monthly_zs_nuts_level_234',
  future_seasonal: 'future_seasonal_monthly_zs_nuts_level_234',
  future_longterm: 'future_longterm_monthly_zs_nuts_level_234',
}
const params = {
  heatwaves: {
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
    future_seasonal: [
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
    future_longterm: [
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
  coldsnaps: {
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
    future_seasonal: [
      'gid',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'tasmin_std',
      'coldsnap_alarms_mean',
      'coldsnap_alarms_std',
      'coldsnap_alerts_mean',
      'coldsnap_alerts_std',
      'coldsnap_warnings_mean',
      'coldsnap_warnings_std',
    ],
    future_longterm: [
      'gid',
      'experiment',
      'time',
      'tasmax_mean',
      'tasmin_mean',
      'tasmin_std', 
      'coldsnap_alarms_mean',
      'coldsnap_alarms_std',
      'coldsnap_alerts_mean',
      'coldsnap_alerts_std',
      'coldsnap_warnings_mean',
      'coldsnap_warnings_std'
    ]
  }
}

const generateSql = (gid, period, theme, time) => {
  const table = tables[period];
  const selectParams = params[theme][period];
  const sql = `
    SELECT 
    ${selectParams.join(',')}
    FROM ${table}
    WHERE gid='${gid}'
    AND time between '${time.start}' AND '${time.end}'
    ORDER BY time
  `;
  return sql;
}

export const getWidgetData = async (params = defaultParams) => {
  const {
    period = periodDef,
    gid = gidDef,
    theme = themeDef,
    time = timeDef,
  } = params;
  const id = queryId[period];
  const sql = generateSql(gid, period, theme, time)
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

