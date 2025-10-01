import {  useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { fetchCvpCommonThunk, selectData, selectStatus } from '@/presentation/cms/cvp_common';
import { CvpCommonCommand } from '@/application/cvp_common/cvp_common_command';

export const useCvpCommon = (command: CvpCommonCommand) => {
  const dispatch = useDispatch();
  const cvpCommonData = useSelector(selectData);
  const cvpCommonStatus = useSelector(selectStatus);

  const fetchCvpCommon = async (command: CvpCommonCommand) => {
    if (!cvpCommonData) {
      dispatch(
        fetchCvpCommonThunk(command)
      );
    }
  };

  useEffect(() => {
    if (!cvpCommonData) {
      fetchCvpCommon(command);
    }
  }, []);


  return { cvpCommonStatus };
};