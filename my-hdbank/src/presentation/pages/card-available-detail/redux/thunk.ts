import { createAsyncThunk } from '@reduxjs/toolkit';
import { TYPES } from '@/di/types/types';
import { container } from '@/di/inversify.config';
import { Command } from '@/domain/models';
import { CardAvailableDetailCommand } from '@/application/card_available_detail/card_available_detail_command';
import { CardAvailableDetailHandler } from '@/application/card_available_detail/card_available_detail_handler';
import { CmsPayload } from '@/domain/entities/cms/cmsPayload';
import { CvpCommonHandler } from '@/application/cvp_common/cvp_common_handler';

export const fetchCardAvailableDetailThunk = createAsyncThunk(
  'home/fetch_card_availableDetail',
  async (request: CardAvailableDetailCommand) => {
    const cardAvailableDetailHandler = container.get<CardAvailableDetailHandler>(
      TYPES.CardAvailableDetailHandler
    );
    const command = new Command({ command: request })

    return await cardAvailableDetailHandler.handle(command);
  });


  export const fetchCvpCommon = createAsyncThunk('fetch/cvp_common', async (segment: CmsPayload) => {
    const cvpCommon = container.get<CvpCommonHandler>(TYPES.CvpCommonHandler);
    return await cvpCommon.handle(segment);
});
