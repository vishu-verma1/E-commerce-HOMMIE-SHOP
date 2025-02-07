import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from "../../constants/productConstants";

const initalProductState = {
  // product:{},
  products:[],
  currentPage:null, 
  totalPages:null, 
  totalCount:null,
  error: null,
  loading: false,
};

export const productFetchReducer = (state = initalProductState, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case PRODUCT_FETCH_SUCCESS:
        return {
          ...state,
          loading: false,
          products : action.payload.products,
          currentPage:action.payload.currentPage,
          totalPages:action.payload.totalPages, 
          totalCount:action.payload.totalCount
        };
        case PRODUCT_FETCH_FAIL:
          return {
            ...state,
            error: action.payload,
          };
          
          default:
            return {
              state,
            };
          }
        };
       
