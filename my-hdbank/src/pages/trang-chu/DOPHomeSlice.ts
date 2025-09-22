import { createSlice } from '@reduxjs/toolkit';
import { fetchCardListAvailable } from '../../presentation/pages/card/thunk';
import { CardListAvailableDataRes } from '@/domain/entities/cardListAvailable';

export interface IState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    cardList: CardListAvailableDataRes[];
    cardActive: CardListAvailableDataRes;
    requestId?: string;
}

const initialState: IState = {
    status: 'loading',
    error: '',
    cardList: [],
    cardActive: {} as CardListAvailableDataRes,
    requestId: undefined,
};

const DOPHomeSlice = createSlice({
    name: 'dop_home',
    initialState,
    reducers: {
        setError: (state, { payload }) => {
            state.error = payload;
        },
        setStatus: (state, { payload }) => {
            state.status = payload;
        },
        setCardActive: (state, { payload }) => {
            // state.cardActive = payload;
            state.cardActive = { ...payload, productCode: payload?.productCode };
        },
        setRequestId: (state, { payload }) => {
            state.requestId = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // ----------------------------------------------------------------
            // fetchCardListAvailable
            // ----------------------------------------------------------------
            .addCase(fetchCardListAvailable.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(fetchCardListAvailable.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch fetchCardListAvailable';
            })
            .addCase(fetchCardListAvailable.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                if (!payload) {
                    state.error = 'Failed to fetch fetchCardListAvailable because of payload undefined';
                    return;
                }
                state.error = '';
                const { data, resultCode, resultMessage } = payload;
                if (resultCode === '00' && data) {
                    state.cardList = data;
                    // console.log('fetchCardListAvailable data', data);
                } else {
                    state.error = resultMessage;
                }
            });
    },
});

export const { setCardActive } = DOPHomeSlice.actions;
export default DOPHomeSlice;
