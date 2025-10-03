import {  useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { 
  fetchCvpCommonThunk, 
  selectData, 
  selectError, 
  selectStatus 
} from '@/presentation/cms/cvp_common';
import { CvpCommonCommand } from '@/application/cvp_common/cvp_common_command';

export const useCvpCommon = (cmd: CvpCommonCommand) => {
  const dispatch = useDispatch();
  const cvpCommonData = useSelector(selectData);
  const cvpCommmonStatus = useSelector(selectStatus);
  const cvpCommonError = useSelector(selectError);

  const fetchCvpCommon =  useCallback((cmd: CvpCommonCommand) => {
    if (!cvpCommonData) {
      dispatch(fetchCvpCommonThunk(cmd));
    }
  }, [dispatch, cvpCommonData]);

  useEffect(() => {
    fetchCvpCommon(cmd);
  }, []);


  return { cvpCommonData, cvpCommmonStatus, cvpCommonError };
};