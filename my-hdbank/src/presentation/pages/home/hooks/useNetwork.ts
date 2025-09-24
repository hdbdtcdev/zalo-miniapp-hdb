import { NetworkType } from 'zmp-sdk';
import { useDispatch, useSelector } from '@/lib/redux';
import { selectIsConnectedNetWork, selectNetworkType } from '../redux/common/selector';
import { HomeAction } from '../redux/slice';

export const useNetwork = () => {
  const dispatch = useDispatch();
  const isConnectedNetWork = useSelector(selectIsConnectedNetWork);
  const networkType = useSelector(selectNetworkType);
  const setNetworkType = (value: NetworkType) =>
    dispatch(HomeAction.setNetworkType(value));

  const setIsConnectedNetWork = (value: boolean) =>
    dispatch(HomeAction.setIsConnectedNetWork(value));

  return {
    isConnectedNetWork,
    networkType,
    setNetworkType,
    setIsConnectedNetWork,
  };
};
