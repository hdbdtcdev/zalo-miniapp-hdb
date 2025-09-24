import { createAsyncThunk } from '@reduxjs/toolkit';
import { TYPES } from '@/di/types/types';
import { container } from '@/di/inversify.config';
import { CardAvailableListHandler } from '@/application/card/card_available_list_handler';
import { CardAvailableListCommand } from '@/application/card/card_available_list_command';
import { Command } from '@/domain/models';

export const fetchCardAvailableListThunk = createAsyncThunk(
  'home/fetch_card_available_list',
  async (request: CardAvailableListCommand) => {
    const cardListAvailableHandler = container.get<CardAvailableListHandler>(
      TYPES.CardAvailableListHandler
    );
    const command = new Command({ command: request })
    
    return await cardListAvailableHandler.handle(command);
  });
