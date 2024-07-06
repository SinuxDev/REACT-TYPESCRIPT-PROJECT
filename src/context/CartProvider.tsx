import { createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

enum REDUCER_ACTION_TYPE {
  ADD = "ADD",
  REMOVE = "REMOVE",
  SUBMIT = "SUBMIT",
  QUANTITY = "QUANTITY",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  const { type, payload } = action;
  switch (type) {
    case REDUCER_ACTION_TYPE.ADD: {
      const item = state.cart.find((item) => item.id === payload?.id);

      if (item) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === payload?.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }

      return {
        cart: [...state.cart, payload as CartItemType],
      };
    }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!payload) {
        throw new Error("Payload is required for this action type");
      }

      if (!payload.id || !payload.qty) {
        throw new Error("Payload must have id and qty properties");
      }

      return {
        cart: state.cart.map((item) =>
          item.id === payload?.id ? { ...item, qty: payload.qty } : item
        ),
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!payload) {
        throw new Error("Payload is required for this action type");
      }

      return {
        cart: state.cart.filter((item) => item.id !== payload.id),
      };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      if (!payload) {
        throw new Error("Payload is required for this action type");
      }

      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const getTotalItems = state.cart.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

  const getTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );

  const getCartItems = state.cart.sort((a, b) => {
    return a.id - b.id;
  });

  return {
    dispatch,
    REDUCER_ACTIONS,
    getTotalItems,
    getTotalPrice,
    getCartItems,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  getTotalItems: 0,
  getTotalPrice: "",
  getCartItems: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: React.ReactElement | React.ReactElement[] };

export const CartProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const initState: CartStateType = { cart: [] };

  const cartContext = useCartContext(initState);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
