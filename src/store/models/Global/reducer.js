const initialState = {
  userName: "",
  password: "",
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sign in
    case "SET_USER_PASSOWRD":
      return {
        ...state,
        userName: action.payload.userName,
        password: action.payload.password,
      };

    default:
      return state;
  }
};

export default globalReducer;
