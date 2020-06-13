import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

const useDebounce = (initialFn: any, delay = 200) => {
  const fnRef = useRef(debounce(initialFn, delay, { leading: true }));
  useEffect(() => {
    fnRef.current = debounce(initialFn, delay, { leading: true });
    return fnRef.current.cancel;
  }, [delay, initialFn]);
  return fnRef.current;
};

export default useDebounce;
