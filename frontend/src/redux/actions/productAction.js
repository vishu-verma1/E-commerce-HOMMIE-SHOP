import axios from "axios"
import { PRODUCT_FETCH_FAIL, PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS } from "../../constants/productConstants";






export const fetchProduct = ({search="", price=[0, 25000], category="", sortField = "productname", sortBy = "ascending", page = 1})=> async (dispatch)=>{
   try{
   
    dispatch({type: PRODUCT_FETCH_REQUEST});
   
    const {data, status} = await axios.get(`${import.meta.env.VITE_API_URL}/products/fetch-product?searchTerm=${search}&category=${category}&minPrice=${price[0]}&maxPrice=${price[1]}&sortfield=${sortField}&sortby=${sortBy}&page=${page}`);
    // console.log(data.totalPages,"action result------")
    if (status === 200) {
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: {products: data.data, currentPage: data.currentPage, totalPages:data.totalPages, totalCount:data.totalCount } });
    }

   }
   catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({type: PRODUCT_FETCH_FAIL, payload: errorMessage})
  }
}