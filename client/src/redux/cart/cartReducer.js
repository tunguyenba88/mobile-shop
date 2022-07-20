import { cartActionType } from './cartType';
import _ from 'lodash';

const defaultState = {
  cart: [],
  sl: 0,
  total: 0,
  isInit: true,
};

export const cartReducer = (state = defaultState, action) => {
  let cart = [];
  switch (action.type) {
    case cartActionType.CART_INIT:
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        return {
          ...state,
          sl: _.sumBy(cart, (item) => item.count),
          cart: cart,
          isInit: true,
          total: _.sumBy(cart, (item) => item.count * item.price),
        };
      }

      return defaultState;

    case cartActionType.ADD_TO_CART:
    case cartActionType.INCREASE_ITEM:
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      const existedItem = cart.find((item) => item._id === action.payload._id);
      if (existedItem) {
        cart[
          _.findIndex(cart, (item) => item._id === action.payload._id)
        ].count = existedItem.count + 1;

        localStorage.setItem('cart', JSON.stringify(cart));
        return {
          ...state,
          cart: cart,
          sl: _.sumBy(cart, (item) => item.count),
          isInit: false,
          total: _.sumBy(cart, (item) => item.count * item.price),
        };
      }
      cart.push({ ...action.payload, count: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart: cart,
        sl: _.sumBy(cart, (item) => item.count),
        isInit: false,
        total: _.sumBy(cart, (item) => item.count * item.price),
      };

    case cartActionType.REDUCE_ITEM:
      cart = state.cart;
      let selectedId = _.findIndex(
        cart,
        (item) => item._id === action.payload._id
      );
      if (cart[selectedId].count === 1) {
        const cartAfterRemove = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        localStorage.setItem('cart', JSON.stringify(cartAfterRemove));
        return {
          ...state,
          cart: cartAfterRemove,
          sl: _.sumBy(cartAfterRemove, (item) => item.count),
          isInit: false,
          total: _.sumBy(cartAfterRemove, (item) => item.count * item.price),
        };
      } else {
        cart[selectedId].count = cart[selectedId].count - 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        return {
          ...state,
          cart: cart,
          sl: _.sumBy(cart, (item) => item.count),
          isInit: false,
          total: _.sumBy(cart, (item) => item.count * item.price),
        };
      }

    case cartActionType.REMOVE_ITEM_FROM_CART:
      const cartAfterRemove = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cart', JSON.stringify(cartAfterRemove));
      return {
        ...state,
        cart: cartAfterRemove,
        sl: _.sumBy(cartAfterRemove, (item) => item.count),
        isInit: false,
        total: _.sumBy(cartAfterRemove, (item) => item.count * item.price),
      };

    case cartActionType.EMPTY_CART:
      localStorage.removeItem('cart');
      return defaultState;

    default:
      return state;
  }
};
