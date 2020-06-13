import { useSelector } from 'react-redux';

const useUserInfo = () => {
  const userInfo = useSelector((state: any) => state.global);

  return userInfo;
};

export default useUserInfo;
