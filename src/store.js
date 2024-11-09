import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cart from "./Cart";
import { useState } from "react";

const productSlice = createSlice({
    name : 'products',
    initialState :{
        veg : [
            {name : 'Tomato', price : 200.5},
            {name : 'Potato', price : 400.3},
        ],
        nonveg :[
            {name : 'Chicken', price : 800.0},
            {name : 'Fish', price : 1000.5},

        ],
    },
        reducers :{}
})
 
const purchaseHistorySlice = createSlice({
    name : 'purchaseHistory',
    initialState : [],
    reducers :{
        addPurchase : (state,action) =>{
            state.push(action.payload);
        }
    }
})

 const cartSlice = createSlice({
    name : 'cart',
    initialState : [],
    reducers :{ //state means existing object and action  means input values
        addtocart : (state,action) =>{
            //here we check input value is already present in array or not
            const status = state.find(item => item.name === action.payload.name)
            //if already present then increament only quantity
            //else push that object into array
            if(status)
            {
                status.quantity += 1;
            }
            else
            { //using push function we push the object 
                //here we use spread operator and add the quantity field
                state.push({...action.payload, quantity: 1});
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                // Optional: Remove item if quantity is 0
                const index = state.indexOf(item);
                state.splice(index, 1);
            }
        },
        removeItem: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
          },
          clearCart : () => []
    }
 })
 //we have multiple functions like removeCart thats why we use the array destructuring concept
 //and export all that functions
export const {addtocart,decrementQuantity,incrementQuantity,removeItem,clearCart} = cartSlice.actions;
export const {addPurchase} =purchaseHistorySlice.actions
const store = configureStore({
    reducer : {
        products :productSlice.reducer,
        cart : cartSlice.reducer,
        purchaseHistory : purchaseHistorySlice.reducer,
    }
 })

 export default store;


 