import { TYPES } from '@/di/types/types';
import { container } from '@/di/inversify.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CmsPayload } from '@/domain/entities/cms/cmsPayload';
import { CvpCommonHandler } from '@/application/cvp_common/cvp_common_handler';

export const fetchCvpCommonThunk = createAsyncThunk('fetch/cvp_common', async (segment: CmsPayload) => {
  const cvpCommon = container.get<CvpCommonHandler>(TYPES.CvpCommonHandler);
  return await cvpCommon.handle(segment);
});
