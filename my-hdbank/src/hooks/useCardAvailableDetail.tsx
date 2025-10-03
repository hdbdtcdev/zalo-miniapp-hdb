import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { fetchCardAvailableDetailThunk, selectCard, selectError, selectStatus } from '@/presentation/pages/card-available-detail/redux';

export const useCardAvailableDetail = (productCode: string) => {
  const dispatch = useDispatch();
  
  const card = useSelector(selectCard);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const fetchCardAvailable = async (productCode: string) => {
    if (!card) {
      dispatch(
        fetchCardAvailableDetailThunk({
          productCode
        })
      );
    }
  };

  useEffect(() => {
    if (!card) {
      fetchCardAvailable(productCode);
    }
  }, []);

  return { card, status, error };
};