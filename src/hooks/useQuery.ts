import qs from 'qs';

const useQuery = (name?: string) => {
  const params = qs.parse(window.location.search.substring(1)) || {};
  // TODO: remove wrapped array
  return name ? [params[name]] : params;
};

export default useQuery;
