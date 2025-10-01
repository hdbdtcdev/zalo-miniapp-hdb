import { createAsyncThunk } from '@reduxjs/toolkit';
import { TYPES } from '@/di/types/types';
import { container } from '@/di/inversify.config';
import { Command } from '@/domain/models';
import { CardAvailableDetailCommand } from '@/application/card_available_detail/card_available_detail_command';
import { CardAvailableDetailHandler } from '@/application/card_available_detail/card_available_detail_handler';

export const fetchCardAvailableDetailThunk = createAsyncThunk(
  'home/fetch_card_availableDetail',
  async (request: CardAvailableDetailCommand) => {
    const cardAvailableDetailHandler = container.get<CardAvailableDetailHandler>(
      TYPES.CardAvailableDetailHandler
    );
    const command = new Command({ command: request })

    return await cardAvailableDetailHandler.handle(command);
  });
