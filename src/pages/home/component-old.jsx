import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from 'react-router-dom';
import styles from "./styles.module.scss";
import Map from "components/map";
import Zoom from "components/map/controls/zoom";
import Target from "components/map/controls/target";
import Dropdown from 'components/dropdown';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import { 
  COUNTRIES, 
  OPTIONS_TIME, OPTIONS_THEME,
  COUNTRIES_DEFAULT_VIEWPORTS,
} from 'constants.js';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import Chart from 'components/chart';
import { getWidgetData } from 'api';


const DEFAULT_VIEWPORT = {
  width: 400,
  height: 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

const data = [
  {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page A', uv: 300, pv: 2500, amt: 2500},
  {name: 'Page A', uv: 700, pv: 2800, amt: 2100},
  {name: 'Page A', uv: 100, pv: 2900, amt: 2100},
];



const renderLineChart = (
  <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

const HomePage = () => {
  const history = useHistory();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const match = useRouteMatch('/:gid/:period/:theme?');
  const [widgetData, setWidgetData] = useState([]);
  const { 
    gid = COUNTRIES[0].iso, 
    period = OPTIONS_TIME[0].value, 
    theme = OPTIONS_THEME[0].value,
  } = (match && match.params) || {};
  const optionValue = OPTIONS_THEME.find(el => el.value === theme);
  const hadleChange = option => history.push(`/${gid}/${period}/${option.value}`);

  useEffect(() => {
    setViewport(COUNTRIES_DEFAULT_VIEWPORTS[gid]);
  }, [gid]);

  console.log(widgetData);
  const fetchWidgetsData = async () => {
    const data = await getWidgetData({
      theme,
      period,
    });
    setWidgetData(data);
  }

  useEffect(() => {
    fetchWidgetsData();
  }, [theme, period]);

  let joinData = [
    {'gid': 'ES_01002', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Amurrio', 'iso3': 'ESP', 'min_tasmin': 8.8561706543}, {'gid': 'ES_01003', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Aramaio', 'iso3': 'ESP', 'min_tasmin': 9.0606384277}, {'gid': 'ES_01004', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Artziniega', 'iso3': 'ESP', 'min_tasmin': 9.3902282715}, {'gid': 'ES_01010', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ayala / Aiara', 'iso3': 'ESP', 'min_tasmin': 9.1070251465}, {'gid': 'ES_01036', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Laudio / Llodio', 'iso3': 'ESP', 'min_tasmin': 10.0103759766}, {'gid': 'ES_01042', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Okondo', 'iso3': 'ESP', 'min_tasmin': 10.2370910645}, {'gid': 'ES_01058', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Legutio', 'iso3': 'ESP', 'min_tasmin': 8.762298584}, {'gid': 'ES_09190', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Junta De Villalba De Losa', 'iso3': 'ESP', 'min_tasmin': 8.102355957}, {'gid': 'ES_20030', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Eibar', 'iso3': 'ESP', 'min_tasmin': 10.6131286621}, {'gid': 'ES_20032', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Elgoibar', 'iso3': 'ESP', 'min_tasmin': 10.7396240234}, {'gid': 'ES_20033', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Elgeta', 'iso3': 'ESP', 'min_tasmin': 10.0582885742}, {'gid': 'ES_20055', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arrasate / Mondragón', 'iso3': 'ESP', 'min_tasmin': 9.3080749512}, {'gid': 'ES_20056', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mutriku', 'iso3': 'ESP', 'min_tasmin': 11.6390075684}, {'gid': 'ES_20065', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Soraluze-Placencia De Las Armas', 'iso3': 'ESP', 'min_tasmin': 10.3534545898}, {'gid': 'ES_20901', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mendaro', 'iso3': 'ESP', 'min_tasmin': 11.2313842773}, {'gid': 'ES_39030', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Guriezo', 'iso3': 'ESP', 'min_tasmin': 10.8395080566}, {'gid': 'ES_39057', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ramales De La Victoria', 'iso3': 'ESP', 'min_tasmin': 9.5933227539}, {'gid': 'ES_39058', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Rasines', 'iso3': 'ESP', 'min_tasmin': 10.272064209}, {'gid': 'ES_39101', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Valle De Villaverde', 'iso3': 'ESP', 'min_tasmin': 9.9809265137}, {'gid': 'ES_48001', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Abadiño', 'iso3': 'ESP', 'min_tasmin': 9.6100769043}, {'gid': 'ES_48002', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Abanto Y Ciérvana-Abanto Zierbena', 'iso3': 'ESP', 'min_tasmin': 11.4747009277}, {'gid': 'ES_48003', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Amorebieta-Etxano', 'iso3': 'ESP', 'min_tasmin': 10.7708129883}, {'gid': 'ES_48004', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Amoroto', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48005', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arakaldo', 'iso3': 'ESP', 'min_tasmin': 10.1234130859}, {'gid': 'ES_48006', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arantzazu', 'iso3': 'ESP', 'min_tasmin': 9.9695129395}, {'gid': 'ES_48007', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Munitibar-Arbatzegi Gerrikaitz', 'iso3': 'ESP', 'min_tasmin': 11.648223877}, {'gid': 'ES_48008', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Artzentales', 'iso3': 'ESP', 'min_tasmin': 10.2296142578}, {'gid': 'ES_48009', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arrankudiaga', 'iso3': 'ESP', 'min_tasmin': 10.4324035645}, {'gid': 'ES_48010', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arrieta', 'iso3': 'ESP', 'min_tasmin': 13.0466308594}, {'gid': 'ES_48011', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arrigorriaga', 'iso3': 'ESP', 'min_tasmin': 10.8202209473}, {'gid': 'ES_48012', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Bakio', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48013', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Barakaldo', 'iso3': 'ESP', 'min_tasmin': 11.6436157227}, {'gid': 'ES_48014', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Barrika', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48015', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Basauri', 'iso3': 'ESP', 'min_tasmin': 11.205657959}, {'gid': 'ES_48016', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Berango', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48017', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Bermeo', 'iso3': 'ESP', 'min_tasmin': 13.7428894043}, {'gid': 'ES_48018', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Berriatua', 'iso3': 'ESP', 'min_tasmin': 11.7971801758}, {'gid': 'ES_48019', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Berriz', 'iso3': 'ESP', 'min_tasmin': 10.5693054199}, {'gid': 'ES_48020', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Bilbao', 'iso3': 'ESP', 'min_tasmin': 11.518951416}, {'gid': 'ES_48021', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Busturia', 'iso3': 'ESP', 'min_tasmin': 13.4057922363}, {'gid': 'ES_48022', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Karrantza Harana / Valle De Carranza', 'iso3': 'ESP', 'min_tasmin': 9.2134399414}, {'gid': 'ES_48023', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Artea', 'iso3': 'ESP', 'min_tasmin': 9.6493835449}, {'gid': 'ES_48024', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zeanuri', 'iso3': 'ESP', 'min_tasmin': 9.0537719727}, {'gid': 'ES_48025', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zeberio', 'iso3': 'ESP', 'min_tasmin': 10.0601501465}, {'gid': 'ES_48026', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Dima', 'iso3': 'ESP', 'min_tasmin': 9.5082092285}, {'gid': 'ES_48027', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Durango', 'iso3': 'ESP', 'min_tasmin': 10.0299072266}, {'gid': 'ES_48028', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ea', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48029', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Etxebarri', 'iso3': 'ESP', 'min_tasmin': 11.5675354004}, {'gid': 'ES_48030', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Etxebarria', 'iso3': 'ESP', 'min_tasmin': 11.2832641602}, {'gid': 'ES_48031', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Elantxobe', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48032', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Elorrio', 'iso3': 'ESP', 'min_tasmin': 9.7212524414}, {'gid': 'ES_48033', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ereño', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48034', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ermua', 'iso3': 'ESP', 'min_tasmin': 10.5389404297}, {'gid': 'ES_48035', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Fruiz', 'iso3': 'ESP', 'min_tasmin': 12.7774353027}, {'gid': 'ES_48036', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Galdakao', 'iso3': 'ESP', 'min_tasmin': 11.1556396484}, {'gid': 'ES_48037', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Galdames', 'iso3': 'ESP', 'min_tasmin': 11.0126037598}, {'gid': 'ES_48038', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gamiz-Fika', 'iso3': 'ESP', 'min_tasmin': 12.5471801758}, {'gid': 'ES_48039', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Garai', 'iso3': 'ESP', 'min_tasmin': 10.5444335938}, {'gid': 'ES_48040', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gatika', 'iso3': 'ESP', 'min_tasmin': 13.2362365723}, {'gid': 'ES_48041', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gautegiz Arteaga', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48042', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gordexola', 'iso3': 'ESP', 'min_tasmin': 10.0749816895}, {'gid': 'ES_48043', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gorliz', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48044', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Getxo', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48045', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Güeñes', 'iso3': 'ESP', 'min_tasmin': 10.6394348145}, {'gid': 'ES_48046', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gernika-Lumo', 'iso3': 'ESP', 'min_tasmin': 12.3921813965}, {'gid': 'ES_48047', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Gizaburuaga', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48048', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ibarrangelu', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48049', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ispaster', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48050', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Izurtza', 'iso3': 'ESP', 'min_tasmin': 9.8542175293}, {'gid': 'ES_48051', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Lanestosa', 'iso3': 'ESP', 'min_tasmin': 8.9043884277}, {'gid': 'ES_48052', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Larrabetzu', 'iso3': 'ESP', 'min_tasmin': 11.7691345215}, {'gid': 'ES_48053', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Laukiz', 'iso3': 'ESP', 'min_tasmin': 12.9701538086}, {'gid': 'ES_48054', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Leioa', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48055', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Lemoa', 'iso3': 'ESP', 'min_tasmin': 10.5996398926}, {'gid': 'ES_48056', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Lemoiz', 'iso3': 'ESP', 'min_tasmin': 13.7549133301}, {'gid': 'ES_48057', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Lekeitio', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48058', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mallabia', 'iso3': 'ESP', 'min_tasmin': 10.7622680664}, {'gid': 'ES_48059', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mañaria', 'iso3': 'ESP', 'min_tasmin': 9.541015625}, {'gid': 'ES_48060', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Markina-Xemein', 'iso3': 'ESP', 'min_tasmin': 11.4638977051}, {'gid': 'ES_48061', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Maruri-Jatabe', 'iso3': 'ESP', 'min_tasmin': 13.6604614258}, {'gid': 'ES_48062', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mendata', 'iso3': 'ESP', 'min_tasmin': 11.9696655273}, {'gid': 'ES_48063', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mendexa', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48064', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Meñaka', 'iso3': 'ESP', 'min_tasmin': 13.3721008301}, {'gid': 'ES_48065', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ugao-Miraballes', 'iso3': 'ESP', 'min_tasmin': 10.4748535156}, {'gid': 'ES_48066', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Morga', 'iso3': 'ESP', 'min_tasmin': 12.3102722168}, {'gid': 'ES_48067', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Muxika', 'iso3': 'ESP', 'min_tasmin': 11.5940856934}, {'gid': 'ES_48068', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mundaka', 'iso3': 'ESP', 'min_tasmin': 13.8364562988}, {'gid': 'ES_48069', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Mungia', 'iso3': 'ESP', 'min_tasmin': 13.2484436035}, {'gid': 'ES_48070', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Aulesti', 'iso3': 'ESP', 'min_tasmin': 12.0341186523}, {'gid': 'ES_48071', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Muskiz', 'iso3': 'ESP', 'min_tasmin': 11.3614807129}, {'gid': 'ES_48072', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Otxandio', 'iso3': 'ESP', 'min_tasmin': 8.9516601562}, {'gid': 'ES_48073', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ondarroa', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48074', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Urduña / Orduña', 'iso3': 'ESP', 'min_tasmin': 8.5708007812}, {'gid': 'ES_48075', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Orozko', 'iso3': 'ESP', 'min_tasmin': 9.401763916}, {'gid': 'ES_48076', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Sukarrieta', 'iso3': 'ESP', 'min_tasmin': 13.682800293}, {'gid': 'ES_48077', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Plentzia', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48078', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Portugalete', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48079', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Errigoiti', 'iso3': 'ESP', 'min_tasmin': 12.7630310059}, {'gid': 'ES_48080', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Valle De Trápaga-Trapagaran', 'iso3': 'ESP', 'min_tasmin': 11.6796569824}, {'gid': 'ES_48081', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Lezama', 'iso3': 'ESP', 'min_tasmin': 11.935333252}, {'gid': 'ES_48082', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Santurtzi', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48083', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ortuella', 'iso3': 'ESP', 'min_tasmin': 11.5489196777}, {'gid': 'ES_48084', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Sestao', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48085', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Sopela', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48086', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Sopuerta', 'iso3': 'ESP', 'min_tasmin': 10.7435302734}, {'gid': 'ES_48087', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Trucios-Turtzioz', 'iso3': 'ESP', 'min_tasmin': 10.5492858887}, {'gid': 'ES_48088', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ubide', 'iso3': 'ESP', 'min_tasmin': 8.8516845703}, {'gid': 'ES_48089', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Urduliz', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48090', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Balmaseda', 'iso3': 'ESP', 'min_tasmin': 9.7370300293}, {'gid': 'ES_48091', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Atxondo', 'iso3': 'ESP', 'min_tasmin': 9.390625}, {'gid': 'ES_48092', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Bedia', 'iso3': 'ESP', 'min_tasmin': 10.6154174805}, {'gid': 'ES_48093', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Areatza', 'iso3': 'ESP', 'min_tasmin': 9.3503112793}, {'gid': 'ES_48094', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Igorre', 'iso3': 'ESP', 'min_tasmin': 10.2074890137}, {'gid': 'ES_48095', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zaldibar', 'iso3': 'ESP', 'min_tasmin': 10.2485046387}, {'gid': 'ES_48096', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zalla', 'iso3': 'ESP', 'min_tasmin': 10.1319274902}, {'gid': 'ES_48097', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zaratamo', 'iso3': 'ESP', 'min_tasmin': 10.7698669434}, {'gid': 'ES_48901', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Derio', 'iso3': 'ESP', 'min_tasmin': 12.3647460938}, {'gid': 'ES_48902', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Erandio', 'iso3': 'ESP', 'min_tasmin': 12.1626586914}, {'gid': 'ES_48903', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Loiu', 'iso3': 'ESP', 'min_tasmin': 12.4822692871}, {'gid': 'ES_48904', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Sondika', 'iso3': 'ESP', 'min_tasmin': 12.0803527832}, {'gid': 'ES_48905', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zamudio', 'iso3': 'ESP', 'min_tasmin': 12.1136474609}, {'gid': 'ES_48906', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Forua', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48907', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Kortezubi', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48908', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Murueta', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48909', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Nabarniz', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48910', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Iurreta', 'iso3': 'ESP', 'min_tasmin': 10.4243774414}, {'gid': 'ES_48911', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ajangiz', 'iso3': 'ESP', 'min_tasmin': 12.2933959961}, {'gid': 'ES_48912', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Alonsotegi', 'iso3': 'ESP', 'min_tasmin': 11.0559997559}, {'gid': 'ES_48913', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Zierbena', 'iso3': 'ESP', 'min_tasmin': -999.0}, {'gid': 'ES_48914', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Arratzu', 'iso3': 'ESP', 'min_tasmin': 12.3798217773}, {'gid': 'ES_48915', 'admin_level': 4.0, 'experiment': 'rcp85', 'geoname': 'Ziortza-Bolibar', 'iso3': 'ESP', 'min_tasmin': 11.3355102539}];
    var popUpKeys = {},
        heightPopUpKeys = {};

    // Create filter for layers from join data
    let layerFilter = ['in', 'gid']
    
    joinData.forEach(function(row, index) {
        popUpKeys[row['gid']] = row['min_tasmin'];
        
        

        layerFilter.push(row['gid']);
    });
    

  const layers = [
    {
      active: true,
      id: 'esp_nuts_01234',
      name: 'Nits stories',
      type: 'vector',
      source: {
        "type": "vector",
        "url": 'mapbox://copernicus-forests.esp_nuts_01234',        
      },
      render: {
        maxzoom: 3,
        minzoom: 2,
        layers: [
          {
            "type": "fill",
            "source-layer": "esp_nuts_01234",
            "paint": {
              "fill-color": "red",
              "fill-opacity": 0.1
            },
            // filter: layerFilter,
          },
          {
            'id': 'choropleth-line',
            'source': 'vector-data',
            'source-layer': 'esp_nuts_01234',
            'type': 'line',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                
                    'line-dasharray': [1, 0],
                
                'line-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false], 
                    'black', 
                    'rgb(128,0,38)'],
                'line-width': 0.5,
                'line-opacity': 0.2
            },
            'filter': layerFilter
          },         

        ]
      }
    },
    {
      "id": "layer-bioclimatic",
      "name": "Bioclimatic layer",
      "type": "vector",
      "active": true,
      "sqlParams": {
        "where": {
          "iso3": "SWE"
        },
        "where2": {
          "biovar": "biovar01",
          "scenario": "rcp85"
        }
      },
      "source": {
        "type": "vector",
        "provider": {
          "type": "carto",
          "account": "simbiotica",
          "layers": [
            {
              "options": {
                "sql": "WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval as year, b.biovar, b.scenario, b.wieghtedmean FROM swe_zonal_bv_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}"
              },
              "type": "cartodb"
            }
          ]
        }
      },
      "render": {
        "maxzoom": 3,
        "minzoom": 2,
        "layers": [
          {
            "filter": [
              "==",
              "year",
              2020
            ],
            "paint": {
              "fill-color": [
                "interpolate",
                [
                  "linear"
                ],
                [
                  "get",
                  "wieghtedmean"
                ],
                3.19,
                "#FEF6B5",
                5.141,
                "#FFA679",
                7.629,
                "#E15383"
              ],
              "fill-opacity": 0.6
            },
            "source-layer": "layer0",
            "type": "fill"
          }
        ]
      }
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentBox}>
          <Dropdown 
            options={OPTIONS_THEME}
            value={optionValue}
            onChange={hadleChange}
          />
          
          <div className={styles.description}>
            From 1981 to 2020 <span>88 alarms</span>, <span>142 alerts</span> and 392 warnings, and 73 extreme, 92 strong and 107 moderate heat stress events were observed in Bizkaia. The highest temperature of 36.59 ºC was observed in 1995-07-01.
          </div>

          <div className={styles.charts}>
            {/* {renderLineChart} */}
            <Chart widgetData />
          </div>
        </div>

      </div>
      <div className={styles.map}>
        {/* <Map scrollZoom={false} viewport={viewport} setViewport={setViewport} >
          {map => (
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {layers
                .filter(l => l.active)
                .map(layer => (
                  // TODO: fix all eslint-disables
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Layer key={layer.id} {...layer} />
                ))}
            </LayerManager>
          )}
        </Map> */}
        <div className={styles.navigationBar}>
          <div className={styles.targetBox}>
            <Target viewport={viewport} setViewport={setViewport} />
          </div>
          <div className={styles.zoomBox}>
            <Zoom viewport={viewport} setViewport={setViewport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
