import {combineReducers} from 'redux';
import defineTypes from './actions';
import initstate from './state';
const datas = initstate;

const a = (state ={count: datas['count']}, action) => {
   switch(action.type) {
    case defineTypes.CHANGE_USERNAME:
      return {
        ...state,
        count: ++state.count
      }
    default:
      return state
   }
}

const b = (state = {number: datas['number']}, action) => {
   switch(action.type) {
   	case defineTypes.SHISGIN:
   	  return {
        ...state,
         number: --state.number
      }
   	default:
   	  return state;
   }
}

const rootReducer = combineReducers({
  a,
  b
})
export default rootReducer;