const initalState = {
  isLoading: false,
  isError: false,
  msg: "",
  data: [],
  pageInfo: {},
};

const promo = (state = initalState, action) => {
  switch (action.type) {
    case "GETALLPROMO_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GETALLPROMO_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "GETALLPROMO_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
        data: [],
        pageInfo: {},
      };
    }
    case "GETPROMOBYID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GETPROMOBYID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "GETPROMOBYID_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
        data: [],
        pageInfo: {},
      };
    }
    case "POSTPROMO_PENDING": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: "",
      };
    }
    case "POSTPROMO_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "POSTPROMO_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    case "UPDATEPROMO_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "UPDATEPROMO_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "UPDATEPROMO_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default promo;
