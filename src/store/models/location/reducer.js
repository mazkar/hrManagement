const initialState = {
  currentLatitude: 0,
  currentLongitude: 0,
  isLoading: "",
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sign in
    // case "SET_CURRENT_LOCATION":
    //   return {
    //     ...state,
    //     currentLatitude: action.payload.latitude,
    //     currentLongitude: action.payload.longitude,
    //   };

    default:
      return state;
  }
};

export default locationReducer;
