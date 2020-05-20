import qs from 'qs';
import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  return qs.parse(location.search, { ignoreQueryPrefix: true });
};

export const setQueryParams = (query, location, history) => {
  const paramsParsed = qs.stringify(query);
  const urlPath = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname; // strip last slash
  history.push(`${urlPath}?${paramsParsed}`);
};
