import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { food_list } from "../assets/assets";

// Create context with proper default value
export const StoreContext = createContext({
  food_list: [],
  cartItems: {},
  cartItemCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  removeItemFromCart: () => {},
  updateCartItemQuantity: () => {},
  getTotalCartAmount: () => 0,
  getCartItemCount: () => 0,
  isItemInCart: () => false,
  getCartItemQuantity: () => 0,
  isLoading: false,
  error: null,
});

// Local storage keys
const CART_STORAGE_KEY = 'hungry_hippo_cart';
const MAX_QUANTITY_PER_ITEM = 99;

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : {};
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return {};
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Memoized cart calculations for better performance
  const cartCalculations = useMemo(() => {
    let totalAmount = 0;
    let itemCount = 0;
    const validItems = {};

    for (const [itemId, quantity] of Object.entries(cartItems)) {
      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
          itemCount += quantity;
          validItems[itemId] = quantity;
        }
      }
    }

    return {
      totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
      itemCount,
      validItems,
    };
  }, [cartItems]);

  // Add item to cart with validation
  const addToCart = useCallback((itemId, quantity = 1) => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate item exists
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (!itemInfo) {
        throw new Error('Item not found');
      }

      setCartItems((prev) => {
        const currentQuantity = prev[itemId] || 0;
        const newQuantity = Math.min(currentQuantity + quantity, MAX_QUANTITY_PER_ITEM);
        
        if (newQuantity === currentQuantity) {
          return prev; // No change needed
        }

        return {
          ...prev,
          [itemId]: newQuantity,
        };
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Remove one item from cart
  const removeFromCart = useCallback((itemId) => {
    setError(null);
    setIsLoading(true);

    try {
      setCartItems((prev) => {
        const currentQuantity = prev[itemId] || 0;
        if (currentQuantity <= 0) {
          return prev; // No change needed
        }

        const newQuantity = currentQuantity - 1;
        if (newQuantity === 0) {
          const { [itemId]: removed, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [itemId]: newQuantity,
        };
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Remove item completely from cart
  const removeItemFromCart = useCallback((itemId) => {
    setError(null);
    setIsLoading(true);

    try {
      setCartItems((prev) => {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update item quantity directly
  const updateCartItemQuantity = useCallback((itemId, quantity) => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate item exists
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (!itemInfo) {
        throw new Error('Item not found');
      }

      // Validate quantity
      if (quantity < 0 || quantity > MAX_QUANTITY_PER_ITEM) {
        throw new Error(`Quantity must be between 0 and ${MAX_QUANTITY_PER_ITEM}`);
      }

      setCartItems((prev) => {
        if (quantity === 0) {
          const { [itemId]: removed, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [itemId]: quantity,
        };
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setError(null);
    setIsLoading(true);

    try {
      setCartItems({});
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get total cart amount (memoized)
  const getTotalCartAmount = useCallback(() => {
    return cartCalculations.totalAmount;
  }, [cartCalculations.totalAmount]);

  // Get total item count (memoized)
  const getCartItemCount = useCallback(() => {
    return cartCalculations.itemCount;
  }, [cartCalculations.itemCount]);

  // Check if item is in cart
  const isItemInCart = useCallback((itemId) => {
    return (cartItems[itemId] || 0) > 0;
  }, [cartItems]);

  // Get item quantity in cart
  const getCartItemQuantity = useCallback((itemId) => {
    return cartItems[itemId] || 0;
  }, [cartItems]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    food_list,
    cartItems: cartCalculations.validItems,
    cartItemCount: cartCalculations.itemCount,
    cartTotal: cartCalculations.totalAmount,
    addToCart,
    removeFromCart,
    clearCart,
    removeItemFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
    getCartItemCount,
    isItemInCart,
    getCartItemQuantity,
    isLoading,
    error,
  }), [
    cartCalculations,
    addToCart,
    removeFromCart,
    clearCart,
    removeItemFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
    getCartItemCount,
    isItemInCart,
    getCartItemQuantity,
    isLoading,
    error,
  ]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;