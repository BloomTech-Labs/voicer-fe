import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from '../actions';

const initialState = {
  signingUp: false,
  id: null,
  accents: null,
  error: null,
  talentAccents: null
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        signingUp: true
      };
    case REGISTER_SUCCESS:
      const [id] = action.payload;
      return {
        ...state,
        id: id,
        signingUp: false
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
