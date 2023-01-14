import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        addItem: (state, action) => {
            if(state[action.payload]){
                state[action.payload] += 1;
            }else{
                state[action.payload] = 1;
            }
        },
        removeItem: (state, action) => {
            if(state[action.payload]){
                if(state[action.payload] <= 1){
                    delete state[action.payload];
                }else{
                    state[action.payload] -= 1;
                }
            }
        },
        clearCart: (state) => {
            state = {};
        }
    }
});


const selectCart = state => state.cart;

export const selectItemQuantity = createSelector(
    [selectCart],
    cart => id => cart[id] || 0
);

export const { addItem, removeItem, clearCart, selectById } = cartSlice.actions;

export default cartSlice.reducer;
