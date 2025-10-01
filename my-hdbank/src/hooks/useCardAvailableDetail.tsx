import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { useTranslation } from '@/services/i18n';
import { fetchCardAvailableDetailThunk, selectCard, selectStatus } from '@/presentation/pages/card-available-detail/redux';

export const useCardAvailableDetail = (productCode: string) => {
  const { t } = useTranslation(['ns']);
  const dispatch = useDispatch();
  const cardData = useSelector(selectCard);
  const status = useSelector(selectStatus);

  const fetchCardAvailable = async (productCode: string) => {
    if (!cardData) {
      dispatch(
        fetchCardAvailableDetailThunk({
          productCode
        })
      );
    }
  };

  useEffect(() => {
    if (!cardData) {
      fetchCardAvailable(productCode);
    }
  }, []);

  return { status };
};