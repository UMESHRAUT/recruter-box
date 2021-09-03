import Cookie from 'js-cookie';
import { ALL_POSITIONS } from '../constants/FormConstant';


interface PositionsReducerI {
  positions:any | null;
}

const DEFAULT_STATE :PositionsReducerI ={
  positions:null
};

const PositionsReducer = (
  state:PositionsReducerI = DEFAULT_STATE,
  action:any ): PositionsReducerI =>{
  switch (action.type) {
    case ALL_POSITIONS:
      return { positions:action.payload };
    default:
      return state;
  }
};

export default PositionsReducer;
