import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FormReducer from './FormReducer';
import PositionsReducer from './TeamsReducer';

const RootReducer = combineReducers({
auth: AuthReducer,
  form:FormReducer,
  position:PositionsReducer
});

export type AppState = ReturnType<typeof RootReducer>;

export default RootReducer;
