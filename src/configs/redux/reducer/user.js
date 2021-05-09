const initialState = {
  user: {},
  loading: false,
  error: "",
  date:   null,
  month: null,
  year: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
      };
    case "SIGN_UP_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "RESET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "RESET_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FIND_USER":
      return {
        ...state,
        user: action.payload,
      };
      case "DATE":
      return {
        ...state,
        date: action.payload,
      };
      case "MONTH":
        return {
          ...state,
          month: action.payload,
        };
        case "YEAR":
          return {
            ...state,
            year: action.payload
          };
    default:
      return state;
  }
};

export default userReducer;
