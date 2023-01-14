import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        addItem: (state, action) => {
            const { item } = action.payload;
            if(state[item.id]){
                state[item.id].quantity += 1;
            }else{
                state[item.id] = {...item, quantity: 1};
            }
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            if(state[id]){
                if(state[id].quantity <= 1){
                    delete state[id];
                }else{
                    state[id].quantity -= 1;
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
    cart => itemId => cart[itemId]?.quantity || 0
);

export const selectTotalQuantity = createSelector(
    [selectCart],
    cart => Object.values(cart).reduce((acc, item) => acc + item.quantity, 0)
);

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
