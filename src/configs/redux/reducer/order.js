const initialState = {
    dataOrder: {
        type: null,
        color: null,
        size: null,
        jumlah: null
    },
    loading: false,
    error: "",
  };

  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TYPE":
            console.log(state);
        return {
            ...state,
            dataOrder:{
                ...state.dataOrder,
                type: action.payload
            }
        };
        case "COLOR":
            // console.log(state)
        return {
            ...state,
            dataOrder:{
                ...state.dataOrder,
                color: action.payload
            }
        };
        case "SIZE":
            // console.log(state)
        return {
            ...state,
            dataOrder:{
                ...state.dataOrder,
                size: action.payload
            }
        };
        case "JUMLAH":
            console.log('masuk Payload Jumlah');
            return {
                ...state,
                dataOrder:{
                    ...state.dataOrder,
                    jumlah: action.payload
                }
        };
            default:
                return state;
            }
      };
      export default orderReducer;