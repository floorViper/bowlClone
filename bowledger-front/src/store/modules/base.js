import { createAction, handleActions } from 'redux-actions';

import { pender } from 'redux-pender';
// import * as api from 'api/api';

const LOADING = 'base/LOADING';

export const loading = createAction(LOADING);

//initailState
const initialState = {
  isLoading: false
};

export default handleActions(
  {
    [LOADING]: (state, action) => {
      return {
        ...state,
        isLoading: !state.isLoading
      };
    }
  },
  initialState
);
