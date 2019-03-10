
import * as actionTypes from './actions';

const initialState = {

    accessToken : null
  
};



const reducer = ( state = initialState, action ) => {


  switch (action.type) {

    case actionTypes.GET_ACCESS_TOKEN:

      return {
        ...state
      };

    case actionTypes.SET_ACCESS_TOKEN:
      
      return {

        ...state,
        accessToken: action.accessToken

      };
      

    default:

      return state;

  };




};


export default reducer;