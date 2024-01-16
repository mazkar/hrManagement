export const setToken = (payload) => {
  return {
    type: "SET_TOKEN",
    payload,
  };
};

export const setUser = (payload) => {
  return {
    type: "SET_USER",
    payload,
  };
};

export const setClockInStat = (payload) => {
  return {
    type: "SET_CLOCK_IN",
    payload,
  };
};

export const resetReducer = (payload) => {
  return {
    type: "RESET_REDUCER",
    payload,
  };
};
