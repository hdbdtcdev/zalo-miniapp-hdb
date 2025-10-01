import { TYPES } from '@/di/types/types';
import { container } from '@/di/inversify.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CvpCommonHandler } from '@/application/cvp_common/cvp_common_handler';
import { CvpCommonCommand } from '@/application/cvp_common/cvp_common_command';
import { Command } from '@/domain/models';

export const fetchCvpCommonThunk = createAsyncThunk(
  'fetch/cvp_common',
  async (segment: CvpCommonCommand) => {
    const cmd = new Command<CvpCommonCommand>({ command: segment });
    const cvpCommon = container.get<CvpCommonHandler>(TYPES.CvpCommonHandler);

    return await cvpCommon.handle(cmd);
  }
);
