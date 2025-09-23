import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { useTranslation } from '@/services/i18n';
import { fetchCardAvailableListThunk, selectCardList, selectStatus } from '../redux';

export const useCardAvailable = () => {
  const { t } = useTranslation(['ns']);
  const dispatch = useDispatch();
  const cardListData = useSelector(selectCardList);
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