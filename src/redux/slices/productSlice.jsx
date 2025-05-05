import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products : [],
    selectedProduct: {},
    loading: false
}

const BASE_URL = "https://fakestoreapi.com"

export const getAllProducts = createAsyncThunk("getAllProducts", async()=>{
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProduct : (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            // isteği attım bekleme süresi
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            // ürünleri başarılı bir şekilde aldığın zaman
            state.loading = false;
            state.products= action.payload // çekilen ürünleri buna setle
        })
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setSelectedProduct } = productSlice.actions
  
  export default productSlice.reducer