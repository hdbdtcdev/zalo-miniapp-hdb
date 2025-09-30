import {  useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { useTranslation } from '@/services/i18n';
import { selectCvp } from '@/presentation/cvp_common';

export const useCardAvailableList = () => {
  const { t } = useTranslation(['ns']);
  const dispatch = useDispatch();
  const cvpData = useSelector(selectCvp);
  const cardListStatus = useSelector(selectStatus);

  const fetchCardAvailable = async () => {

    if (!cardListData?.length) {
      dispatch(
        fetchCardAvailableListThunk({})
      );
    }
  };

  useEffect(() => {
    if (!cardListData?.length) {
      fetchCardAvailable();
    }
  }, []);

  return { cardListStatus };
};