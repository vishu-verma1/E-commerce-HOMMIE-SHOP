import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  authReducer,
  loginReducer,
  passwordUpdateReducer,
  profilePictureUpdateReducer,
  profileReducer,
  signupReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducer";
import { productFetchReducer } from "./redux/reducers/productReducer";
import { cartReducer, getCartReducer, removeCartReducer } from "./redux/reducers/cartReducer";
import { orderItem, orderListReducer } from "./redux/reducers/orderReducer";
import { addAddressReducer, getAddressReducer, updateAddressReducer } from "./redux/reducers/addressReducer";
import { getWishlistReducer, removeWishListReducer, wishListReducer } from "./redux/reducers/wishListReducer";

const persistConfig = {
  key: "root",
  storage,
  whitlist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    auth: persistedReducer,
    update: userUpdateReducer,
    profilePicture: profilePictureUpdateReducer,
    productdata: productFetchReducer,
    cart: cartReducer,
    order: orderItem,
    addAddress:addAddressReducer,
    addWishList : wishListReducer,
    updatAddress:updateAddressReducer,
    passwordUpdate: passwordUpdateReducer,
    profile: profileReducer,
    orderData: orderListReducer,
    cartData: getCartReducer,
    addressData:getAddressReducer,
    getWishlistData: getWishlistReducer,
    removeWishlist: removeWishListReducer,
    removeCart : removeCartReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

// store.subscribe(() => console.log(store.getState()));
export default store;
export { persistor };
